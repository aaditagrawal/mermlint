import { parentPort } from 'node:worker_threads';
import { on } from 'node:events';
import { parseSnippet } from './parser.js';
import { loadMermaid } from './engine.js';
import { profileMark, profileReport } from './profile.js';

try {
  const messages = on(parentPort, 'message');
  const mermaid = await loadMermaid();
  profileMark('engineImportAndInitialize');
  const results = [];
  parentPort.postMessage({ ready: true });
  for await (const [shard] of messages) {
    if (shard === null) break;
    for (const item of shard) {
      results.push({
        order: item.order,
        result: await parseSnippet(item.snippet, mermaid)
      });
    }
    parentPort.postMessage({ batchFinished: true });
  }
  profileMark('parseAndLazyImports');
  parentPort.postMessage({ results });
  profileMark('resultClone');
  profileReport({ snippets: results.length });
  parentPort.close();
} catch (error) {
  parentPort.postMessage({
    error: error?.stack || error?.message || String(error)
  });
  parentPort.close();
}
