# Changelog

## 0.2.0 - Unreleased

- Upgrade Mermaid to 12.1.0, esbuild to 0.28.2, and linkedom to 0.18.13.
- Require Node 22.12+ and migrate package management to a pinned Bun lockfile.
- Split the bundled runtime into lazy diagram modules shared by CLI and workers.
- Add parsing-only adapters, a faster configuration merge, and V8 compile caching.
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
