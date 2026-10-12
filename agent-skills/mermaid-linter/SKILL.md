---
name: mermaid-linter
description: Use this skill when validating MermaidJS diagrams, Mermaid code fences in Markdown or Obsidian notes, or raw .mmd/.mermaid snippets with the mermlint CLI.
---

# Mermaid Linter

Use `mermlint` before trusting or publishing Mermaid diagrams. It validates Mermaid syntax using Mermaid's parser and supports raw snippets, `.mmd`/`.mermaid` files, Markdown fences, and Obsidian notes.

## Workflow

1. Prefer checking the narrowest file or directory that contains the diagram.
2. Use agent-readable output for automation:

```bash
mermlint path/to/note.md --format json
```

3. For clipboard or generated snippets, pipe the raw diagram:

```bash
printf '%s\n' 'graph TD
A-->B' | mermlint --stdin --name generated.mmd --format json
```

4. Treat exit codes as authoritative:

- `0`: all discovered Mermaid snippets parsed successfully.
- `1`: at least one Mermaid snippet failed.
- `2`: CLI usage or runtime failure.

## Output

Use `--format compact` for human scanning, `--format json` for structured reports, and `--format ndjson` when streaming results into another tool.

Each failed result includes `source`, `index`, `startLine`, and an `error` object. For Markdown, locations point back to the original note file.

When fixing a failure, use `error.agent.summary` first, then patch around `error.line` / `error.column`. If Mermaid reports coordinates past the end of a snippet, the linter clamps `error.line` to the nearest real Mermaid line and preserves the raw parser values as `error.parserLine` / `error.parserColumn`. Use `error.frame`, `error.offendingLine`, and `error.agent.repairHints` to make the smallest plausible edit, then rerun the exact file with `--format json`.

## Performance

Run directory checks directly; the CLI recursively scans only `.md`, `.markdown`, `.mmd`, and `.mermaid` files by default and skips `.git`, `.obsidian`, and `node_modules`.

`--workers auto` is the default. Use it for directory or vault checks. For a single generated snippet, no extra option is needed because the CLI stays in-process. Auto mode uses weighted worker sharding for larger batches. Use `--workers 1` only when reproducing timing or debugging worker-specific behavior.
