# Contributing

Use Node 22.12+ and Bun 1.4.3. Install the pinned build inputs with:

```sh
bun install --frozen-lockfile
bun run build
bun run test
bun run test:source
bun run test:package
bun run check:dist
```

Keep `dist/` committed. The npm package contains the complete runtime and the
agent skill, with no runtime dependencies. `check:dist` hashes every artifact
before rebuilding and detects changed, added, removed, or differently executable
files. `test:package` packs with Bun and runs the unpacked CLI, worker path, and
skill installer in a temporary directory without `node_modules`.

For a bug report, include the smallest failing diagram, the CLI version, Node
version, exit status, and JSON diagnostic. Remove private note content and paths.
A syntax regression should get a fixture or CLI regression test. Use conventional
commit messages and describe the behavior that changed.

## Parser maintenance

Mermaid is pinned because the build includes parsing adapters. The DOMPurify
alias preserves labels without HTML sanitization because the CLI never renders
HTML/SVG or attaches callbacks. Never reuse that alias for a renderer. The config
merge adapter avoids repeated `Object.entries` allocations and property
definitions while preserving upstream merge semantics. Its build guard fails if
the expected module changes; its tests compare against the installed upstream
implementation, including prototype keys.

The config reader copies sections on access instead of eagerly copying the whole
config on every read. Copies preserve upstream's depth, array deduplication,
property order, writable descriptors, and prototype-key behavior. This relies on
Mermaid replacing `currentConfig` on updates. A reset reuses the baseline revision;
site initialization and site updates invalidate it. Review every assignment to
`currentConfig` and `siteConfig` when upgrading. Tests cover directives, failed
parses, site updates, global resets, mutation isolation, reflection, and freezing.

The bundled entry exposes only parsing APIs and removes renderer references from
35 diagram definitions covering 37 registrations. The build guards fail when
expected definitions change. The upstream parsers, DB constructors, DB clearing,
initializers, preprocessing, and type detection remain intact. Keep source tests
as an independent check against the unmodified Mermaid package.

Ordinary diagrams reset the Mermaid configuration and use the pinned engine's
`mermaidAPI.getDiagramFromText`. Config-bearing frontmatter and directives use
`mermaid.parse`. The test suite compares both paths against the public parser for
every built-in diagram type. Keep parse calls sequential within each worker;
Mermaid's parsers and configuration have mutable state.

When updating Mermaid, review these adapters and the preprocessing source map,
update `test/diagrams.js`, and run both source and bundled tests. The registration
coverage test fails if Mermaid adds a type without a fixture. Bump the cache
schema in `src/cache.js` when extraction, parsing, engine versions, or diagnostic
behavior changes. Verify third-party notices after dependency changes.

## Benchmarks

`bun run bench` regenerates 1,001 files in `bench/corpus/` and writes
`bench/round2.json` with uncached and warmed file-cache runs. Each scenario runs
five fresh processes and reports the median. `BENCH_ROUNDS` changes that count;
`MERMLINT_BENCH_BIN` points at another built CLI. Keep its worker and chunks next
to it. V8 compile caching is disabled for comparable process startup numbers.
`BENCH_RESULT` chooses an output JSON path without overwriting historical results.
Use `BENCH_MODE=baseline` only for the original CLI, which has no `--no-cache` flag.
For a comparison on a busy host, `bun run bench:comparison` alternates revision
order each round and records system load with every sample. Set
`MERMLINT_BASELINE_BIN` and `MERMLINT_ROUND1_BIN` to the earlier built CLIs.
Keep each revision's `package.json` beside `dist/`; otherwise Node's ESM syntax
detection adds avoidable startup cost to the original monolithic bundle.

Run comparisons sequentially on an otherwise idle machine. Commit the result
JSON and state the host, engine versions, corpus sizes, cache state, and whether
wall time includes startup and reporting. Do not turn machine timings into CI
thresholds.

For CPU profiles and phase timings, run:

```sh
MERMLINT_PROFILE_BUILD=1 bun run build
bun run profile
PROFILE_WORKERS=1 PROFILE_RESULT=bench/profile-serial.json bun run profile
bun run build
```

The profile command launches Node with `--cpu-prof`; Node profiles the main
process and every worker. Raw profiles stay in the reported temporary directory.
`MERMLINT_PROFILE=1` adds JSON phase records on stderr. Use an unminified build to
retain function names. Profiler overhead and unminified code make these unsuitable
for README wall-time measurements. Restore the normal build before testing or
committing `dist/`. See [bench/NOTES.md](bench/NOTES.md) for the breakdown and trials.

Compare complete corpus diagnostics with a previous Mermaid 12 build:

```sh
MERMLINT_COMPARE_BIN=/path/to/previous/dist/mermlint.js bun run bench:compare
```

This checks all 2,001 results against the old serial run using serial, two-worker,
four-worker, and auto runs. Only `elapsedMs` is excluded. Every message, location,
frame, hint, and output position must match.

## Release checklist

Update the version and changelog, then run the checks above. Review `bun pm pack`
in a temporary location and check package metadata, the skill, licenses, and
`dist/`. The repository URL is centralized in `package.json` and currently assumes
`https://github.com/aaditagrawal/mermlint`. Publishing and pushing are separate
maintainer actions; no lifecycle script publishes automatically.
