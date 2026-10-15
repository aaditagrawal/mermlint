import { existsSync } from 'node:fs';
import { availableParallelism } from 'node:os';
import { Worker } from 'node:worker_threads';
import { loadMermaid } from './engine.js';
import { parseSnippet } from './parser.js';
import { formatResult } from './diagnostics.js';

export async function parseSnippets(snippets, workerSetting) {
  if (snippets.length === 0) {
    return { results: [], workers: 0 };
  }

  const workerCount = resolveWorkerCount(workerSetting, snippets.length);
  if (workerCount <= 1) {
    return {
      results: await lintSnippetsInProcess(snippets),
      workers: 1
    };
  }

  return {
    results: await lintSnippetsWithWorkers(snippets, workerCount),
    workers: workerCount
  };
}

function resolveWorkerCount(workerSetting, snippetCount) {
  if (workerSetting !== 'auto') {
    return Math.min(workerSetting, snippetCount);
  }

  if (snippetCount < 512) {
    return 1;
  }

  const cores = typeof availableParallelism === 'function' ? availableParallelism() : 2;
  return Math.max(1, Math.min(4, cores, Math.ceil(snippetCount / 500)));
}

async function lintSnippetsInProcess(snippets) {
  const results = [];
  const mermaid = await loadMermaid();
  for (const snippet of snippets) results.push(await parseSnippet(snippet, mermaid));

  return results;
}

async function lintSnippetsWithWorkers(snippets, workerCount) {
  const families = new Map();
  const maxBatch = Math.max(1, Math.floor(snippets.length / workerCount));
  for (const [order, snippet] of snippets.entries()) {
    const family = snippet.text.match(/^\s*(?:%%[^\n]*\n\s*)*([A-Za-z][\w-]*)/)?.[1] || '';
    let batches = families.get(family);
    if (!batches) families.set(family, batches = []);
    let group = batches.at(-1);
    // Keep small families together; a large family can fill several workers.
    if (!group || group.items.length === maxBatch) batches.push(group = { weight: 0, items: [] });
    group.items.push({ order, snippet });
    group.weight += estimateParseWeight(snippet);
  }
  const weighted = [...families.values()].flat().sort((left, right) => right.weight - left.weight);
  let next = 0;
  const takeBatch = () => weighted[next++]?.items || null;
  const active = new Set();
  try {
    const batches = await Promise.all(Array.from({ length: workerCount }, () => runWorker(takeBatch, active)));
    const results = new Array(snippets.length);
    for (const batch of batches) for (const { order, result } of batch) results[order] = result;
    return results;
  } catch (error) {
    await Promise.allSettled([...active].map(worker => worker.terminate()));
    throw error;
  }
}

function estimateParseWeight(snippet) {
  let lines = 1;
  for (let index = snippet.text.indexOf('\n'); index !== -1; index = snippet.text.indexOf('\n', index + 1)) lines++;
  return snippet.text.length + lines * 40;
}

function runWorker(takeBatch, active) {
  return new Promise((resolveWorker, rejectWorker) => {
    const localUrl = new URL('./worker.js', import.meta.url);
    const workerUrl = existsSync(localUrl) ? localUrl : new URL('../worker.js', import.meta.url);
    const worker = new Worker(workerUrl);

    active.add(worker);
    let completed = false;

    worker.on('message', (message) => {
      if (message?.ready || message?.batchFinished) {
        worker.postMessage(takeBatch());
      } else if (message?.error) {
        rejectWorker(new Error(message.error));
      } else {
        if (!Array.isArray(message?.results)) {
          rejectWorker(new Error('Mermaid worker returned an invalid response.'));
          return;
        }
        completed = true;
        resolveWorker(message.results);
      }
    });
    worker.on('error', rejectWorker);
    worker.on('exit', (code) => {
      active.delete(worker);
      if (!completed || code !== 0) {
        rejectWorker(new Error(`Mermaid worker exited with code ${code}`));
      }
    });
  });
}

export async function lintSnippet(snippet, mermaidInstance) {
  return formatResult(snippet, await parseSnippet(snippet, mermaidInstance));
}
