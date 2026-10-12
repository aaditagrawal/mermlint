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

Mermaid is pinned because the build includes two parsing adapters. The DOMPurify
alias preserves labels without HTML sanitization because the CLI never renders
HTML/SVG or attaches callbacks. Never reuse that alias for a renderer. The config
merge adapter avoids repeated `Object.entries` allocations and property
definitions while preserving upstream merge semantics. Its build guard fails if
the expected module changes; its tests compare against the installed upstream
implementation, including prototype keys.

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

`bun run bench` regenerates 1,001 files in `bench/corpus/`. Set `BENCH_MODE=after`
for an updated build with uncached and warmed file-cache runs. Each scenario runs
five fresh processes and reports the median. `BENCH_ROUNDS` changes that count;
`MERMLINT_BENCH_BIN` points at another built CLI. Keep its worker and chunks next
to it. V8 compile caching is disabled for comparable process startup numbers.

Run comparisons sequentially on an otherwise idle machine. Commit the result
JSON and state the host, engine versions, corpus sizes, cache state, and whether
wall time includes startup and reporting. Do not turn machine timings into CI
thresholds.

## Release checklist

Update the version and changelog, then run the checks above. Review `bun pm pack`
in a temporary location and check package metadata, the skill, licenses, and
`dist/`. The repository URL is centralized in `package.json` and currently assumes
`https://github.com/aaditagrawal/mermlint`. Publishing and pushing are separate
maintainer actions; no lifecycle script publishes automatically.
