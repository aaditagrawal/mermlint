import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { corpus, generate } from './generate.js';

generate();
const before = process.env.MERMLINT_COMPARE_BIN;
if (!before) throw new Error('Set MERMLINT_COMPARE_BIN to the previous revision\'s dist/mermlint.js.');
function results(bin, workers) {
  const run = spawnSync(process.execPath, [resolve(bin), corpus, '--no-cache', '--format', 'json', '--workers', String(workers)], {
    encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, env: { ...process.env, NODE_DISABLE_COMPILE_CACHE: '1' }
  });
  assert.equal(run.status, 1, run.stderr);
  const report = JSON.parse(run.stdout);
  assert.equal(report.summary.snippets, 2001);
  assert.equal(report.summary.errors, 400);
  return report.results.map(({ elapsedMs, ...diagnostic }) => diagnostic);
}
const expected = results(before, 1);
for (const workers of [1, 2, 4, 'auto']) {
  assert.deepEqual(results(process.env.MERMLINT_BENCH_BIN || 'dist/mermlint.js', workers), expected);
  console.log(`${workers}: all 2,001 results match, including 400 complete diagnostics.`);
}
