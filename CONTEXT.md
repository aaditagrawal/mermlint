# Project terms

- An **input** is a file or stdin buffer. Discovery preserves sorted file order,
  deduplicates overlapping paths, and skips symlinks and ignored directories.
- A **snippet** is one Mermaid diagram, with its source path, diagram index,
  fence closure state, and Markdown line/column metadata.
- A **parser outcome** is source-independent success or failure data returned by
  Mermaid. Exact diagram text and fence closure state identify reusable outcomes
  within an engine/schema revision. Parsing is sequential inside each worker
  because Mermaid configuration and diagram databases are mutable.
- A **diagnostic** adds current source locations, a code frame, and repair hints
  to a failed parser outcome. Cached outcomes must produce fresh diagnostics
  after source edits or diagram moves.
- A **file report** is the ordered result list for one input. An unchanged input
  can reuse its report; a changed input can reuse individual parser outcomes.
- A **family batch** groups similar diagram keywords to reuse loaded grammars.
  Idle workers take queued batches, and the main process restores discovery order.

The CLI validates parsing and upstream diagram checks. It never renders HTML or
SVG. Both execution paths use a parse-only sanitizer and require no browser DOM.
The distributed bundle has zero runtime package dependencies.
