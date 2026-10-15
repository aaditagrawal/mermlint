# Uncached performance, round two

The first-round bottleneck was repeated configuration copying. In an unminified
serial CPU profile, config functions accounted for 963 of 1,481 sampled ms,
about 65%. In four workers, they averaged 295 sampled ms per worker. Every
`getConfig()` eagerly copied all diagram sections and theme variables, even when
the caller only needed `securityLevel` or a single section. Ordinary diagrams
also rebuilt the same baseline config on every reset.

The final build copies config sections when read and reuses the baseline config
revision on reset. Site initialization and updates invalidate that revision.
Each config read still has isolated writable properties and upstream copy depth.
The bundle removes rendering APIs and renderer references, keeping DB creation,
DB clearing, initializers, preprocessing, detection, and grammar parsing intact.
Worker batches group similar diagram keywords and come from a shared queue.
Workers take another batch when idle and send their accumulated results once.
`--no-cache` also skips unused content hashes.

## Five-process comparison

Node 24.21.0, AMD Ryzen 5 5600G, Linux, Mermaid 11.15.0 in `83f8d66` and Mermaid
12.1.0 in `3770510` and the final build. Each corpus run reads 1,001 files, checks
2,001 diagrams, and reports 400 errors. Wall time includes process startup,
reads, parsing, serialization, writes, and exit. File caching is disabled for
uncached runs, and V8 compile caching is disabled for every measurement.

The host was busy with unrelated CPU-heavy jobs. The final driver alternates
revision order each round and records every raw timing and system load in
[comparison.json](comparison.json). Load averages ranged from 11.79 to 14.14;
contention varied across scenarios, so serial/worker ratios are not a clean
measure of scaling. Earlier exploratory runs were less contended. Keep their
numbers separate from this matched comparison.

| Measurement | `83f8d66`, rerun | `3770510`, rerun | Round two | Faster than original / round one |
| --- | ---: | ---: | ---: | ---: |
| Cold, one diagram | 341.34 ms | 215.71 ms | 231.19 ms | 1.48x / 0.93x |
| Serial, uncached | 2504.51 ms | 2127.00 ms | 963.51 ms | 2.60x / 2.21x |
| Auto workers, uncached | 945.61 ms | 737.91 ms | 362.11 ms | 2.61x / 2.04x |
| Warm file cache | Unavailable | 121.70 ms | 114.12 ms | Unavailable / 1.07x |

Auto uses six workers in the original and four in both Mermaid 12 builds. This
round meets the 2x uncached auto-worker target in the matched comparison.
Single-diagram startup did not improve over round one. Original historical
numbers remain in [baseline.json](baseline.json) and [after.json](after.json);
the README retains the original baseline column.

Reproduce the comparison while preserving package context for ESM loading:

```sh
bench_checkout=$(mktemp -d)
mkdir "$bench_checkout/original" "$bench_checkout/round1"
git archive 83f8d66 dist package.json | tar -x -C "$bench_checkout/original"
git archive 3770510 dist package.json | tar -x -C "$bench_checkout/round1"
MERMLINT_BASELINE_BIN="$bench_checkout/original/dist/mermlint.js" \
MERMLINT_ROUND1_BIN="$bench_checkout/round1/dist/mermlint.js" \
  bun run bench:comparison
```

Omitting `package.json` makes Node detect ESM syntax in the old monolithic
bundle, adding startup cost. An initial rerun made that mistake; its numbers
were discarded and all three revisions rerun with package context intact.

## Main and worker profiles

Profiles use `node --cpu-prof` on fresh uncached processes. Node writes one
`.cpuprofile` for the main process and one for each worker. Unminified builds
retain function names. `bench/profile.js` classifies each sample once by its
stack into compilation, module evaluation, configuration, parsing, diagnostics,
I/O, GC, idle, or other. These are wall-weighted samples, not exact CPU accounting;
host contention and profiler overhead affect them. They are separate from the
minified wall-time medians above. Raw profiles stay in temporary directories;
committed summaries omit absolute source paths.

The round-one profiles used its unchanged runtime with the same phase marks
added at discovery, extraction, lint, assembly, reporting, engine initialization,
and result transfer. The final profiles use the checked-in profiling hooks.

| Sample category | Round-one serial | Final serial | Round-one mean worker | Final mean worker |
| --- | ---: | ---: | ---: | ---: |
| Config reads, merges, resets | 963 ms | 75 ms | 295 ms | 22 ms |
| Compilation, including Node internals | 73 ms | 71 ms | 105 ms | 61 ms |
| Module evaluation | 42 ms | 44 ms | 62 ms | 40 ms |
| Grammar and other parse work | 254 ms | 267 ms | 129 ms | 83 ms |
| Diagnostics | 29 ms | 31 ms | 10 ms | 9 ms |
| GC | 28 ms | 21 ms | 27 ms | 16 ms |

Grammar work in serial is approximately unchanged. The config cost falls by
about 13x. Workers also compile and evaluate fewer repeated grammar dependencies
because families stay together. The worker columns are averages of four thread
profiles, not sums that can be added to main-process wall time.

| Wall-time phase, auto run | Round one | Final |
| --- | ---: | ---: |
| Main discovery and reads, including argument setup | 25.65 ms | 66.92 ms |
| Main extraction and cache lookup/hash work | 11.97 ms | 6.09 ms |
| Main scheduling and waiting for workers | 725.38 ms | 330.78 ms |
| Main assembly | 0.51 ms | 0.44 ms |
| JSON serialization and stdout enqueue | 9.16 ms | 7.23 ms |
| Worker engine import and initialization | 72.21 to 88.93 ms | 59.38 to 63.01 ms |
| Worker parsing, lazy imports, and batch waits | 520.74 to 564.01 ms | 107.69 to 199.06 ms |
| Worker final structured clone/enqueue | 0.76 to 0.86 ms | 0.46 to 2.16 ms |

The final trace ran under greater I/O/CPU contention. Reads and reporting were
small parts of the original bottleneck, while the main process mostly waited
for workers. A byte fence pre-scan or parallel reads was therefore not pursued.
Result cloning also was small. It stays one transfer per worker, even with the
shared batch queue. Report marks measure serialization/enqueue; subprocess wall
time also includes stream draining and shutdown.

Full summaries are in `profile-before-auto.json`, `profile-before-serial.json`,
`profile-after-auto.json`, and `profile-after-serial.json`. The intermediate static
family-shard trace is `profile-affinity-auto.json`. Its shortest/longest worker
parse phases were 64/181 ms, which motivated the shared queue.

```sh
MERMLINT_PROFILE_BUILD=1 bun run build
PROFILE_RESULT=bench/profile-after-auto.json bun run profile
PROFILE_WORKERS=1 PROFILE_RESULT=bench/profile-after-serial.json bun run profile
bun run build
```

## Trials and rejected approaches

[experiments.json](experiments.json) retains exploratory three-process medians.
Changes were cumulative; they are useful for direction, not final claims.

- A specialized eager config copy reached 1,351 ms serial and 694 ms auto.
  A cached copy plan with object spreads and child-copy closures regressed to
  1,944 ms serial and 873 ms auto. Both were replaced by lazy section copies.
- Lazy copies alone reached 852 ms serial and 515 ms auto. Renderer removal,
  the parsing entry, and reset revision reuse reached 550/445 ms. Static family
  grouping reached 544/354 ms before host contention increased.
- A static worker-count sweep found medians of 533, 376, 424, 355, and 343 ms
  for 1, 2, 3, 4, and 6 workers. Six gave only a small gain over four, with more
  startup and memory cost. Auto remains capped at four.
- Five interleaved static/queue/round-one runs under heavier contention gave
  medians of 874/804/1484 ms. The queue improved on static family shards by 8.7%.
  Raw samples are in [queue-comparison.json](queue-comparison.json). A separate
  three-run queue trial was contended even for cold and cached runs; it is marked
  as incomparable to earlier trials in `experiments.json`.
- Marking internal Mermaid imports as side-effect free did not reduce bundle
  size or establish an isolated improvement. That build change was discarded.
- A minimal startup-snapshot script that dynamically imports the bundled ESM
  engine failed on Node 24.21.0 with `Error: Not supported` from `mksnapshot`.
  No snapshot-dependent runtime or fallback path was shipped. The existing V8
  compile-cache feature remains optional; every comparison here disables it.
- Parallel discovery, byte pre-scanning, and overlapping worker startup with
  discovery were not implemented after the phase breakdown showed that config
  copies and repeated grammar loading dominated. Parser/DB object reuse was
  deliberately left to upstream, preserving its clearing and initialization.

## Correctness and checks

`MERMLINT_COMPARE_BIN` points at `3770510` for `bun run bench:compare`. Every one
of the 2,001 results matches its serial report in serial, two-worker, four-worker,
and auto modes. Only `elapsedMs` is excluded. The 400 errors have identical
messages, absolute/relative/parser locations, frames, hints, and repair actions.

Both bundled and source suites pass all 130 tests. New tests cover lazy-copy
values and depth against upstream, prototype keys, mutation isolation, property
order, symbols, deletion/reinsertion, reflection, freezing, config reset after
directives and errors, site-update invalidation, global reset, every fixture's
serial/worker diagnostics, single-family splitting, and profiling stderr.
The dependency-free package smoke test and deterministic rebuild check pass.
No timing threshold is added to CI.

## Component refactor and incremental caching

The next refactor separates discovery, extraction, parser outcomes, scheduling,
diagnostics, cache reuse, and reporting. Workers import only parsing code and
transfer source-independent outcomes. Source mapping uses numeric offsets when
text is removed and computes diagram detection and repair hints once per error.
Discovery reuses directory-entry metadata instead of repeating `lstat` calls.

The cache keeps one stable entry per input file, with the report and parser
outcomes on separate JSON lines. Unchanged files decode only their reports.
Changed files reuse outcomes for exact diagram text and fence closure state,
then rebuild diagnostics against current source metadata. Markdown without
Mermaid fences skips disk cache operations entirely. Initial experiments that
eagerly decoded all cached outcomes regressed warm scans; that approach was
discarded. A partial-file reader added complexity without a measured gain and
was also discarded.

Five alternating fresh-process runs against the saved `51c9b82` build on Node
24.21.0 and AMD Ryzen 5 5600G produced these medians:

- Cold single diagram: 98.03 ms before, 97.61 ms after.
- Uncached serial corpus: 559.58 ms before, 529.73 ms after.
- Uncached auto-worker corpus: 369.40 ms before, 345.99 ms after.
- Warm cached corpus: 100.36 ms before, 97.75 ms after.
- Prose-only edit in a five-diagram note: 123.00 ms before, 40.25 ms after.
- Editing one diagram in that note: 124.76 ms before, 98.25 ms after.

Corpus runs use the same 1,001 files, 2,001 diagrams, and 400 errors as the earlier
comparisons. Edit scenarios warm the original note outside the timed interval,
then prepend prose or change one node label. Wall time includes startup and JSON
reporting, and V8 compile caching is disabled. Other host workloads were active;
raw samples and system loads are in `refactor.json`. These small uncached gains
should not be interpreted as hardware-independent guarantees. The prose-only
case reuses all five parser outcomes and starts no engine or workers.

Every measured pair has identical diagnostics apart from timing and cache
indicators. The complete corpus also matches the saved build in serial,
two-worker, four-worker, and auto modes. Another 648 preprocessing combinations
match the previous source-map implementation. Both bundled and source suites
pass 138 tests; package smoke tests and deterministic rebuild verification pass.

Removing linkedom eliminates 22 lockfile entries. The source engine aliases only
DOMPurify through Node's module loader and otherwise uses upstream parsers and
configuration. The package still has zero runtime dependencies, with Mermaid and
esbuild as its two development dependencies. Total `dist/` bytes fall from
5,531,399 to 5,235,900, including license notices.

Reproduce with a preserved previous `dist/` and its `package.json`:

```sh
MERMLINT_COMPARE_BIN=/path/to/previous/dist/mermlint.js bun run bench:refactor
```
