import { cacheKey, createCache } from './cache.js';
import { extractSnippets, hasMermaidFence } from './snippets.js';
import { parseSnippets } from './lint.js';
import { formatResult } from './diagnostics.js';
import { profileMark } from './profile.js';

function diagramKey(snippet) {
  return `${snippet.unclosed ? '1' : '0'}${snippet.text}`;
}

export async function lintInputs(inputs, options) {
  const cache = options.cache ? createCache(options.cacheDir) : null;
  const known = new Map();
  const pending = [];
  const groups = inputs.map(input => {
    // A fence scan is cheaper than hashing, reading, and writing empty cache
    // entries for the prose-only files common in documentation and vaults.
    if (cache && input.kind === 'markdown' && !hasMermaidFence(input.text)) {
      return { input, empty: true, snippets: [], entries: [] };
    }
    const persistent = cache && input.kind !== 'stdin';
    const key = persistent ? cacheKey(input.path, input.kind) : null;
    const contentKey = persistent ? cacheKey(input.text) : null;
    const previous = persistent ? cache.read(key) : null;
    return { input, key, contentKey, previous, hit: previous?.contentKey === contentKey };
  });

  // A fully cached run needs neither extraction nor a diagram lookup table.
  if (groups.some(group => !group.hit && !group.empty)) {
    for (const group of groups) {
      for (const diagram of group.previous?.readDiagrams() || []) {
        known.set(diagramKey(diagram), { parsed: diagram.parsed, cached: true });
      }
    }
  }

  for (const group of groups) {
    if (group.hit || group.empty) continue;
    group.snippets = extractSnippets(group.input);
    group.entries = group.snippets.map(snippet => {
      const key = options.cache ? diagramKey(snippet) : null;
      let entry = options.cache ? known.get(key) : null;
      if (!entry) {
        entry = { order: pending.length, cached: false };
        // Workers only need parser input, not source paths or Markdown frames.
        pending.push({ text: snippet.text, unclosed: Boolean(snippet.unclosed) });
        if (options.cache) known.set(key, entry);
      }
      return entry;
    });
  }
  profileMark('extractionAndCacheRead');
  const batch = await parseSnippets(pending, options.workers);
  profileMark('lint');

  const results = [];
  let cachedFiles = 0;
  let cachedSnippets = 0;
  for (const group of groups) {
    if (group.hit) {
      cachedFiles++;
      cachedSnippets += group.previous.results.length;
      for (const result of group.previous.results) results.push({ ...result, elapsedMs: 0, cached: true });
      continue;
    }
    const diagrams = [];
    const fileResults = group.snippets.map((snippet, index) => {
      const entry = group.entries[index];
      const parsed = entry.parsed || batch.results[entry.order];
      if (entry.cached) cachedSnippets++;
      if (cache && group.key) {
        diagrams.push({ text: snippet.text, unclosed: Boolean(snippet.unclosed), parsed });
      }
      return formatResult(snippet, parsed, entry.cached);
    });
    for (const result of fileResults) results.push(result);
    if (cache && group.key) cache.write(group.key, { contentKey: group.contentKey, results: fileResults, diagrams });
  }
  return { results, workers: batch.workers, cachedFiles, cachedSnippets, parsedSnippets: pending.length };
}
