import { mkdtempSync, rmSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
const dir = mkdtempSync(join(tmpdir(), 'mermlint-package-'));
try {
  const archive = join(dir, 'package.tgz');
  const pack = spawnSync('bun', ['pm', 'pack', '--filename', archive], { encoding: 'utf8' });
  assert.equal(pack.status, 0, pack.stderr);
  const unpack = spawnSync('tar', ['-xzf', archive, '-C', dir], { encoding: 'utf8' });
  assert.equal(unpack.status, 0, unpack.stderr);
  const root = join(dir, 'package');
  assert.equal(existsSync(join(root, 'node_modules')), false);
  const pkg = JSON.parse(readFileSync(join(root, 'package.json')));
  assert.equal(pkg.dependencies, undefined);
  assert.equal(existsSync(join(root, 'src')), false);
  const bin = join(root, 'dist/mermlint.js');
  const run = spawnSync(process.execPath, [bin, '--stdin', '--workers', '2', '--format', 'json'], {
    cwd: dir, input: '```mermaid\nsequenceDiagram\nA->>B: hi\n```\n```mermaid\nflowchart TD\nA-->\n```', encoding: 'utf8'
  });
  assert.equal(run.status, 1, run.stderr);
  const report = JSON.parse(run.stdout);
  assert.equal(report.summary.workers, 2);
  assert.deepEqual(report.results.map(x=>x.ok), [true, false]);
  const install = spawnSync(process.execPath, [bin, 'install-skill', '--dir', join(dir, 'skills')], { encoding: 'utf8' });
  assert.equal(install.status, 0, install.stderr);
  assert.ok(readFileSync(join(dir, 'skills/mermaid-linter/SKILL.md')));
  console.log('Packed CLI, workers, and skill installer work without node_modules.');
} finally { rmSync(dir, { recursive: true, force: true }); }
