# CLI reference

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

The default cache is `.mermlint-cache/` under the current working directory.
Each file has one entry containing its latest report and parser outcomes, keyed
by path, input kind, engine version, and diagnostic schema. Unchanged files reuse
their reports. After edits, unchanged diagrams reuse their parser outcomes and
rebuild source locations, frames, and repair hints against the current file.
Prose edits and moving a diagram into an Obsidian callout need no parser startup.
Unclosed fences have separate cache identities from closed fences.

Cached results have `cached: true` and `elapsedMs: 0`.
`summary.cachedFiles` counts unchanged files reused from disk;
`summary.cachedSnippets` also includes diagrams reused after edits. Markdown
files without Mermaid fences bypass the disk cache. Exact duplicate diagrams
share parsing within a cache-enabled run, and outcomes from cached input files
can be reused by other files in that run. Stdin is never persisted. A fully
cached run starts no parser or workers.

```sh
mermlint notes/ --no-cache
mermlint notes/ --cache-dir /tmp/mermlint-cache
```

An unavailable or corrupt cache falls back to parsing. Entries contain source
paths, diagram text, and diagnostic excerpts. Ignore `.mermlint-cache/` in projects
where you use the CLI. Delete the directory to clear it. Entries for deleted files
and older cache schemas are not pruned automatically. `--no-cache` disables both
persistent caching and duplicate reuse. Node's V8
compile cache is separate; disable it with `NODE_DISABLE_COMPILE_CACHE=1`.

Auto mode stays in process below 512 uncached diagrams, then uses up to four
workers, bounded by available cores and one worker per roughly 500 diagrams.
Idle workers take the next diagram-family batch from a shared queue. Large
families split across workers; each worker reuses its loaded parsers. `--workers 1`
forces serial parsing; `--workers N` forces a count, bounded by diagram count.
`MERMLINT_WORKERS` sets the default. Output stays in discovery order.


See [benchmark notes](../bench/NOTES.md) for performance measurements and
[contributing](../CONTRIBUTING.md) for development and parser maintenance.
