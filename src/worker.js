import { parentPort, workerData } from 'node:worker_threads';
import { lintSnippet, loadMermaid } from './cli.js';

try {
  const mermaid = await loadMermaid();
  const results = [];
  for (const item of workerData.shard) {
    results.push({
      order: item.order,
      result: await lintSnippet(item.snippet, mermaid)
    });
  }
  parentPort.postMessage({ results });
} catch (error) {
  parentPort.postMessage({
    error: error?.stack || error?.message || String(error)
  });
}
