# mermlint

Fast, agent-friendly MermaidJS linter for raw snippets, `.mmd` files, Markdown fences, and Obsidian notes.

## Usage

```bash
npm install
node ./dist/mermlint.js path/to/note.md
node ./dist/mermlint.js path/to/vault --format json
node ./dist/mermlint.js path/to/vault --workers 4 --format json
printf 'graph TD\nA-->B\n' | node ./dist/mermlint.js --stdin --name generated.mmd --format ndjson
```

After publishing, linking globally, or using `npx`:

```bash
npx mermlinter notes.md --format compact
```

Exit codes:

- `0`: all Mermaid snippets parsed.
- `1`: at least one snippet failed.
- `2`: CLI usage/runtime failure.

## Agent Skill

The companion skill lives at `agent-skills/mermaid-linter`. It is intentionally outside the npm package payload, so `npx mermlinter` only installs the CLI runtime. Install or copy that folder into an agent skill directory when you want agents to discover and call `mermlint`.

## Supply Chain Posture

The published package runs from checked-in `dist/` bundles and has no runtime npm dependencies. `mermaid`, `linkedom`, and `esbuild` are pinned dev-only build inputs. CI can run `node --test` against the committed bundle without installing or executing runtime dependency code.

## Formats

- `compact`: one line per snippet, good for humans.
- `json`: single structured report with `summary` and `results`.
- `ndjson`: one JSON record per snippet plus a final summary record.

Failed JSON results include agent-oriented diagnostics:

- `error.line` / `error.column`: best patch target in the source file.
- `error.relativeLine` / `error.relativeColumn`: target inside the Mermaid snippet.
- `error.parserLine` / `error.parserColumn`: raw Mermaid parser coordinates when they differ.
- `error.frame`: nearby Mermaid lines with a caret marker.
- `error.hint` and `error.agent.repairHints`: short repair guidance.
- `error.agent.nextActions`: concrete loop steps for an agent.

## Performance

`--workers auto` is the default. Small runs stay in-process to keep cold start low; larger runs shard parsing across up to 6 worker threads with weighted load balancing. Use `--workers 1` for deterministic single-thread profiling or `--workers N` to force a worker count.
