import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { parseArgs } from '../src/options.js';

const bin = new URL(process.env.MERMLINT_TEST_SOURCE ? '../bin/mermlint.js' : '../dist/mermlint.js', import.meta.url).pathname;
const fence = text => `\`\`\`mermaid\n${text}\n\`\`\``;
const valid = 'flowchart TD\nA-->B';
const invalid = 'flowchart TD\nA-->';

function temporary(fn) {
  const directory = mkdtempSync(join(tmpdir(), 'mermlint-incremental-'));
  try { fn(directory); } finally { rmSync(directory, { recursive: true, force: true }); }
}

function run(directory, paths, extra = []) {
  const result = spawnSync(process.execPath, [bin, ...paths, '--cache-dir', join(directory, 'cache'), '--format', 'json', ...extra], {
    encoding: 'utf8', env: { ...process.env, NODE_DISABLE_COMPILE_CACHE: '1', MERMLINT_WORKERS: 'auto' }
  });
  assert.ok([0, 1].includes(result.status), result.stderr);
  return JSON.parse(result.stdout);
}

function diagnostics(report) {
  return report.results.map(({ elapsedMs, cached, ...result }) => result);
}

test('prose edits and callout moves reuse parsing with fresh source diagnostics', () => temporary(directory => {
  const file = join(directory, 'note.md');
  writeFileSync(file, [fence(valid), fence(invalid)].join('\n'));
  run(directory, [file]);
  writeFileSync(file, '# New title\n\n' + [fence(invalid), fence(valid)].join('\n').split('\n').map(line => `> ${line}`).join('\n'));
  const reused = run(directory, [file]);
  const fresh = run(directory, [file], ['--no-cache']);
  assert.equal(reused.summary.cachedFiles, 0);
  assert.equal(reused.summary.cachedSnippets, 2);
  assert.equal(reused.summary.workers, 0);
  assert.deepEqual(diagnostics(reused), diagnostics(fresh));
  assert.ok(reused.results.every(result => result.cached && result.elapsedMs === 0));
  assert.equal(reused.results[0].error.line, 5);
  assert.equal(readdirSync(join(directory, 'cache')).length, 1);
}));

test('editing one diagram reparses only that diagram', () => temporary(directory => {
  const file = join(directory, 'note.md');
  writeFileSync(file, [fence(valid), fence(invalid)].join('\n'));
  run(directory, [file]);
  writeFileSync(file, [fence('sequenceDiagram\nA->>B: hello'), fence(invalid)].join('\n'));
  const report = run(directory, [file]);
  assert.equal(report.summary.cachedSnippets, 1);
  assert.equal(report.summary.workers, 1);
  assert.equal(report.results[0].cached, undefined);
  assert.equal(report.results[1].cached, true);
  assert.deepEqual(diagnostics(report), diagnostics(run(directory, [file], ['--no-cache'])));
}));

test('cached parser outcomes are reusable across input files without stale paths', () => temporary(directory => {
  const a = join(directory, 'a.md');
  const b = join(directory, 'b.md');
  writeFileSync(a, fence(invalid));
  run(directory, [a]);
  writeFileSync(b, '# Another file\n' + fence(invalid));
  const report = run(directory, [b, a]);
  assert.equal(report.summary.workers, 0);
  assert.equal(report.summary.cachedFiles, 1);
  assert.equal(report.summary.cachedSnippets, 2);
  assert.equal(report.results[0].source, b);
  assert.match(report.results[0].error.agent.summary, /b\.md:4:/);
  assert.deepEqual(diagnostics(report), diagnostics(run(directory, [b, a], ['--no-cache'])));
}));

test('closing a fence invalidates its cached unclosed-fence failure', () => temporary(directory => {
  const file = join(directory, 'note.md');
  writeFileSync(file, '```mermaid\n' + valid);
  assert.equal(run(directory, [file]).summary.errors, 1);
  writeFileSync(file, fence(valid));
  const report = run(directory, [file]);
  assert.equal(report.summary.errors, 0);
  assert.equal(report.summary.cachedSnippets, 0);
}));

test('malformed cached parser outcomes fall back to validation', () => temporary(directory => {
  const file = join(directory, 'note.md');
  writeFileSync(file, fence(invalid));
  run(directory, [file]);
  const cache = join(directory, 'cache', readdirSync(join(directory, 'cache'))[0]);
  const [header, payload] = readFileSync(cache, 'utf8').split('\n');
  const diagrams = JSON.parse(payload);
  diagrams[0].parsed.failure.expected = null;
  writeFileSync(cache, header + '\n' + JSON.stringify(diagrams));
  writeFileSync(file, '# Edited prose\n' + fence(invalid));
  const report = run(directory, [file]);
  assert.equal(report.summary.cachedFiles, 0);
  assert.equal(report.summary.cachedSnippets, 0);
  assert.equal(report.summary.errors, 1);
}));

test('parsing arguments never shares a mutable extension set between calls', () => {
  parseArgs([]).extensions.clear();
  assert.ok(parseArgs([]).extensions.has('.md'));
});

test('prose-only Markdown bypasses persistent cache entries', () => temporary(directory => {
  const file = join(directory, 'note.md');
  writeFileSync(file, '# Notes\nNo diagrams here.');
  const report = run(directory, [file]);
  assert.equal(report.summary.snippets, 0);
  assert.equal(report.summary.workers, 0);
  assert.deepEqual(readdirSync(directory), ['note.md']);
}));

test('identical diagrams share parsing but retain separate source diagnostics', () => temporary(directory => {
  const file = join(directory, 'note.md');
  writeFileSync(file, [fence(invalid), '# Another diagram', fence(invalid)].join('\n'));
  const report = run(directory, [file], ['--workers', '2']);
  assert.equal(report.summary.workers, 1);
  assert.equal(report.summary.errors, 2);
  assert.notEqual(report.results[0].error.line, report.results[1].error.line);
  assert.deepEqual(diagnostics(report), diagnostics(run(directory, [file], ['--no-cache', '--workers', '2'])));
}));
