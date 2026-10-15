# Changelog

## 0.2.0 - Unreleased

- Simplify installation instructions and ship a short agent skill with the CLI.
- Separate CLI options, file discovery, snippet extraction, engine loading,
  parsing, scheduling, diagnostics, caching, and reporting into source modules.
- Reuse unchanged diagram outcomes after prose or partial edits, and regenerate
  diagnostics at their current source locations. Add `summary.cachedSnippets`.
- Skip disk caching for Markdown without Mermaid fences; replace each file's
  cache entry atomically and decode parser outcomes only when needed.
- Reuse directory-entry metadata, reduce source-map allocations, transfer only
  parser data between workers, and terminate sibling workers on worker failure.
- Remove linkedom and its dependency tree. Keep zero runtime dependencies and
  only Mermaid and esbuild as development dependencies.
- Add incremental-cache regressions and an alternating before/after benchmark.

- Upgrade Mermaid to 12.1.0, esbuild to 0.28.2, and linkedom to 0.18.13.
- Require Node 22.12+ and migrate package management to a pinned Bun lockfile.
- Split the bundled runtime into lazy diagram modules shared by CLI and workers.
- Add parsing-only adapters, a faster configuration merge, and V8 compile caching.
- Copy configuration sections on demand and reuse baseline config revisions when
  resetting between diagrams, with mutation isolation and site-update invalidation.
- Group worker batches by diagram family to reduce repeated grammar loading;
  split large families across workers, let idle workers take the next batch,
  and retain discovery-order diagnostics with one result transfer per worker.
- Remove SVG renderer references from the bundled parsing entry and diagrams.
- Skip content hashing with `--no-cache`; add main/worker CPU profiles, phase
  timings, and complete corpus diagnostic comparison commands.
- Cache success and failure reports by content hash; add `--no-cache` and `--cache-dir`.
- Preserve Markdown source lines through comments, frontmatter, directives, blank
  lines, CRLF, indented fences, and Obsidian callout blockquotes.
- Detect unclosed Mermaid fences and ignore diagrams inside larger example fences.
- Improve diagram-specific repair hints and modern parser coordinates.
- Add `install-skill` for Claude, Codex, project, and custom skill destinations.
- Include the skill and third-party license notices in the dependency-free package.
- Add all-type regression fixtures, reproducible benchmarks, package smoke tests,
  CI, MIT licensing, package metadata, and contributor guidance.

## 0.1.0

Initial CLI with raw Mermaid, Markdown, and Obsidian scanning, worker threads,
compact/JSON/NDJSON reports, agent repair hints, and committed runtime bundles.
