# mermlint

Validate Mermaid diagrams in Markdown, Obsidian notes, `.mmd` / `.mermaid` files,
and stdin. Get source locations and repair hints for agents, or compact output
for a terminal. Uses Mermaid 12.1.0 and requires Node 22.12+.

The executable is `mermlint`; the package name is `mermlinter`. The complete
runtime lives in committed `dist/` files, with no runtime npm dependencies.

## Install the agent skill

From this checkout, this works now without downloading anything:

```sh
node ./dist/mermlint.js install-skill --codex
```

After the GitHub repository is published, install through the
[open skills installer](https://github.com/vercel-labs/skills):

```sh
bunx skills add aaditagrawal/mermlint --skill mermaid-linter
# Equivalent: npx skills add aaditagrawal/mermlint --skill mermaid-linter
```

After the npm package is published, the CLI can copy its bundled skill directly:

```sh
bunx mermlinter install-skill --codex
```

`--codex` installs into `~/.codex/skills`; `--claude` uses `~/.claude/skills`.
`--project`, the default, uses `./.claude/skills`. `--dir PATH` selects any skill
parent directory. The installer creates a `mermaid-linter` subdirectory and
refuses to overwrite an existing skill unless you pass `--force`. The skill is
included in the package at `agent-skills/mermaid-linter`.

## Use the CLI

The checked-in bundles work without installing build dependencies:

```sh
node ./dist/mermlint.js docs/architecture.md
node ./dist/mermlint.js notes/ --format json
node ./dist/mermlint.js notes/ --workers 4 --format ndjson
printf '%s\n' 'flowchart TD' 'A --> B' | node ./dist/mermlint.js --stdin --name generated.mmd --format json
```

Once the npm package is published:

```sh
bunx mermlinter docs/architecture.md --format json
```

With no paths, the CLI scans the current directory. It checks `.md`, `.markdown`,
`.mmd`, and `.mermaid`, skips `.git`, `.obsidian`, `node_modules`, its default
cache directory, and symlinks, and deduplicates overlapping inputs. Use
`--ext md,mmd,txt` to select other extensions, or `--` before paths beginning
with a dash. `--version` prints the package version; `--help` lists common options.

Markdown supports backtick and tilde fences, indented fences, and Mermaid fences
in Obsidian callout blockquotes. It preserves blank lines and CRLF coordinates,
ignores diagrams inside larger example fences, and reports unclosed Mermaid
fences. Empty fences are skipped. A successful report with zero snippets means
no diagrams were found.

Exit codes:

- `0`: every discovered diagram passed, or no diagrams were found.
- `1`: at least one diagram or Mermaid fence failed validation.
- `2`: an argument, input, installation, or runtime failure.

## Reports

`compact` prints one status line per diagram and a repair hint on failure. Use
`--timing` to add a timing summary on stderr. `json` prints one object containing
`summary` and `results`. `ndjson` prints one result per line, followed by a final
`{ "summary": ... }` record. Neither JSON format mixes timing text into stdout.

Failed results include:

- `source`, `index`, `startLine`, and `startColumn` to identify the diagram.
- `error.line` and `error.column`, one-based locations in the original file.
- `error.relativeLine` and `error.relativeColumn` inside the extracted snippet.
- `error.parserLine` and `error.parserColumn`, raw upstream coordinates. Columns
  are normalized to zero-based parser offsets here and one-based source offsets
  in `error.column`; an unknown raw coordinate is `null`.
- `error.frame`, `offendingLine`, `diagramType`, `hint`, and
  `error.agent.repairHints` to guide an edit and recheck.

The source map accounts for removed comments, YAML frontmatter, and init
directives. EOF errors point to the last nonblank statement. Columns are best
available parser positions; upstream parsers can report a token boundary rather
than the exact character that needs changing. Parsing validates grammar and
upstream diagram checks, not SVG layout, link destinations, or compatibility
with an older Mermaid engine embedded in an editor.

## Diagram support

Regression fixtures cover every one of Mermaid 12.1.0's 37 built-in diagram
registrations. A registration check fails if an engine update adds an untested
type. Supported families include flowchart and ELK flowchart, sequence, class,
state, ER, Git graph, Gantt, info, pie, quadrant, XY, requirement, journey, C4,
timeline, mindmap, kanban, Sankey, packet, block, architecture, radar, event
modeling, tree view, treemap, Venn, Ishikawa, Wardley, Cynefin, use case,
swimlane, agent flow, and railroad with EBNF, ABNF, PEG, and IR grammars. Mermaid's
own aliases, such as `graph`, `packet-beta`, and `sankey-beta`, remain available.

External plugins such as ZenUML are not bundled. Their keywords fail with a
diagram-detection diagnostic. Validate plugin diagrams in a host that loads that
plugin. See [Mermaid's syntax reference](https://mermaid.js.org/intro/) for the
engine's supported syntax.

## Cache and workers

The default content cache is `.mermlint-cache/` under the current working
directory. Both successes and diagnostics are keyed by file path, input kind,
contents, engine version, and diagnostic schema. Editing or moving a file
invalidates its entry; stdin is never persisted. Cached results have
`cached: true` and `elapsedMs: 0`; `summary.cachedFiles` counts reused files.
A fully cached run starts no parser or workers.

```sh
node ./dist/mermlint.js notes/ --no-cache
node ./dist/mermlint.js notes/ --cache-dir /tmp/mermlint-cache
```

An unavailable or corrupt cache falls back to parsing. Entries contain source
paths and may contain diagnostic excerpts. Ignore `.mermlint-cache/` in projects
where you use the CLI. Delete the directory to clear it; old content hashes do
not expire automatically. `--no-cache` disables file-result caching. Node's V8
compile cache is separate; disable it with `NODE_DISABLE_COMPILE_CACHE=1`.

Auto mode stays in process below 512 uncached diagrams, then uses up to four
workers, bounded by available cores and one worker per roughly 500 diagrams.
Each worker reuses its loaded parsers for its whole weighted shard. `--workers 1`
forces serial parsing; `--workers N` forces a count, bounded by diagram count.
`MERMLINT_WORKERS` sets the default. Output stays in discovery order.

## Performance

Five-process medians on Node 24.21.0, AMD Ryzen 5 5600G, Linux. The
baseline is the original Mermaid 11.15.0 bundle from commit `83f8d66`; the updated
engine is 12.1.0. Both runs checked 2,001 diagrams in 1,001 files and found the
same 400 errors. JSON records are in [bench/baseline.json](bench/baseline.json)
and [bench/after.json](bench/after.json).

| Measurement | Before | After | Change |
| --- | ---: | ---: | ---: |
| Cold process, one diagram | 182.53 ms | 102.14 ms | 1.79x faster |
| Serial corpus, uncached | 1555.27 ms | 1583.47 ms | 1.8% slower |
| Serial throughput, including startup | 1,287/s | 1,264/s | Approximately unchanged |
| Auto workers, uncached corpus | 844.40 ms | 795.66 ms | 1.06x faster |
| Repeated corpus, default file cache | 844.40 ms | 97.62 ms | 8.65x faster |

The largest gains are startup and repeated checks. Uncached serial throughput
is approximately unchanged after the major engine upgrade; this corpus does
not show a large uncached throughput gain. Auto mode used six workers before
and four after. Before had no persistent file cache.

The benchmark regenerates 400 Markdown notes with five distinct diagrams each,
600 Markdown files without diagrams, and one raw diagram. It mixes eight diagram
families and includes 400 deliberately invalid diagrams. Wall time includes a
fresh Node process, file reads, parsing, and complete JSON reporting. V8 compile
caching is disabled. Cached results come from a separate warmed file cache.
Results vary with CPU, system load, engine version, and diagram complexity.

The runtime uses esbuild splitting to load only needed diagram modules, rather
than evaluating a monolithic bundle in every process. A parsing-only sanitizer
adapter avoids building a DOM for labels. A pinned, tested configuration-merge
adapter reduces allocation and property-definition overhead. Ordinary diagrams
use Mermaid's parse-only constructor after resetting configuration; frontmatter
and directives use the public `mermaid.parse` pipeline. The parsers and diagram
DBs remain upstream Mermaid implementations. See [CONTRIBUTING.md](CONTRIBUTING.md)
for adapter maintenance and reproducible benchmark commands.

## Development

```sh
bun install --frozen-lockfile
bun run build
bun run test
bun run test:source
bun run test:package
bun run check:dist
BENCH_MODE=after bun run bench
```

CI runs installation, deterministic rebuild verification, bundled and source
tests, and a dependency-free tarball smoke test on Node 22.12.0 and Node 24.
`bun.lock` pins build inputs. `dist/THIRD_PARTY_NOTICES.txt` includes dependency
licenses alongside esbuild's preserved legal comments. Keep `dist/` committed
when changing the runtime. The package has no automatic publishing lifecycle.

Licensed under [MIT](LICENSE). Changes are recorded in [CHANGELOG.md](CHANGELOG.md).
