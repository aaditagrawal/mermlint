---
name: mermaid-linter
description: Check and repair Mermaid syntax after creating or editing diagrams in Markdown, Obsidian notes, or .mmd/.mermaid files.
---

Run `mermlint <file> --format json`; in this checkout use `node ./dist/mermlint.js`.
For raw diagrams, pipe text with `--stdin --format json`.
Fix syntax without changing meaning using `error.line`, `error.column`, and
`error.agent.repairHints`, then rerun.
Exit `0` passes, `1` means invalid diagrams, `2` means a tool failure.
Require `summary.snippets > 0` before claiming diagrams passed.
Validates Mermaid 12.1 syntax; check rendering and host compatibility separately.
