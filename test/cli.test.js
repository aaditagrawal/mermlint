import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { extractSnippets, parseArgs } from '../src/cli.js';

const bin = new URL('../dist/mermlint.js', import.meta.url);

test('extracts Mermaid fences from Markdown with line numbers', () => {
  const snippets = extractSnippets({
    path: 'note.md',
    kind: 'markdown',
    text: '# Note\n\n```mermaid\ngraph TD\nA-->B\n```\n'
  });

  assert.equal(snippets.length, 1);
  assert.equal(snippets[0].startLine, 4);
  assert.equal(snippets[0].text, 'graph TD\nA-->B');
});

test('parses compact flags', () => {
  const args = parseArgs(['notes', '--format=ndjson', '--workers=3', '--timing']);
  assert.deepEqual(args.paths, ['notes']);
  assert.equal(args.format, 'ndjson');
  assert.equal(args.workers, 3);
  assert.equal(args.timing, true);
});

test('CLI exits 0 for valid Markdown snippets', () => {
  const dir = mkdtempSync(join(tmpdir(), 'mermlint-'));
  try {
    writeFileSync(join(dir, 'valid.md'), '```mermaid\nsequenceDiagram\nA->>B: hello\n```\n');
    const result = spawnSync(process.execPath, [bin.pathname, dir, '--format', 'json'], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.equal(report.summary.snippets, 1);
    assert.equal(report.summary.errors, 0);
    assert.equal(report.results[0].diagramType, 'sequence');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('CLI exits 1 for invalid snippets and reports source location', () => {
  const dir = mkdtempSync(join(tmpdir(), 'mermlint-'));
  try {
    writeFileSync(join(dir, 'invalid.md'), 'title\n```mermaid\ngraph TD\nA-->\n```\n');
    const result = spawnSync(process.execPath, [bin.pathname, dir, '--format', 'json'], { encoding: 'utf8' });
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.summary.errors, 1);
    assert.equal(report.results[0].ok, false);
    assert.equal(report.results[0].error.line, 4);
    assert.equal(report.results[0].error.relativeLine, 2);
    assert.equal(report.results[0].error.parserLine, 3);
    assert.ok(report.results[0].error.frame.some((line) => line.display.includes('A-->')));
    assert.ok(report.results[0].error.agent.repairHints.some((hint) => hint.includes('missing a target node')));
    assert.ok(report.results[0].error.agent.nextActions.some((action) => action.includes('Run mermlint again')));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('compact output includes a repair hint', () => {
  const dir = mkdtempSync(join(tmpdir(), 'mermlint-'));
  try {
    writeFileSync(join(dir, 'invalid.md'), '```mermaid\ngraph TD\nA-->\n```\n');
    const result = spawnSync(process.execPath, [bin.pathname, dir, '--format', 'compact'], { encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.match(result.stdout, /ERR /);
    assert.match(result.stdout, /missing a target node|Parser expected one of/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
