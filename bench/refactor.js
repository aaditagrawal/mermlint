import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { cpus, loadavg, tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { performance } from 'node:perf_hooks';
import { corpus, generate } from './generate.js';

const before = process.env.MERMLINT_COMPARE_BIN;
if (!before) throw new Error('Set MERMLINT_COMPARE_BIN to the previous build.');
const rounds = Number(process.env.BENCH_ROUNDS || 5);
assert.ok(Number.isInteger(rounds) && rounds > 0, 'BENCH_ROUNDS must be a positive integer.');
generate();
const temporary = mkdtempSync(join(tmpdir(), 'mermlint-refactor-'));
const note = join(corpus, 'note-0000.md');
const original = readFileSync(note, 'utf8');
const targets = [
  { name: 'before', bin: resolve(before), cache: join(temporary, 'before') },
  { name: 'after', bin: resolve(process.env.MERMLINT_BENCH_BIN || 'dist/mermlint.js'), cache: join(temporary, 'after') }
];

function run(target, path, args = []) {
  const start = performance.now();
  const processResult = spawnSync(process.execPath, [target.bin, path, '--format', 'json', '--cache-dir', target.cache, ...args], {
    encoding: 'utf8', maxBuffer: 32 * 1024 * 1024,
    env: { ...process.env, MERMLINT_WORKERS: 'auto', NODE_DISABLE_COMPILE_CACHE: '1' }
  });
  const elapsedMs = performance.now() - start;
  assert.ok([0, 1].includes(processResult.status), processResult.stderr);
  return { elapsedMs, report: JSON.parse(processResult.stdout) };
}

const scenarios = [
  { name: 'cold', path: join(corpus, 'single.mmd'), args: ['--no-cache'] },
  { name: 'serial', path: corpus, args: ['--no-cache', '--workers', '1'] },
  { name: 'workers', path: corpus, args: ['--no-cache'] },
  { name: 'cached', path: corpus, prepare: target => run(target, corpus) },
  { name: 'proseEdit', path: note, prepare(target, round) {
    run(target, note);
    writeFileSync(note, `# Prose edit ${round}\n\n${original}`);
  } },
  { name: 'diagramEdit', path: note, prepare(target, round) {
    run(target, note);
    writeFileSync(note, original.replace('A0[Start]', `A0[Changed ${round}]`));
  } }
];

try {
  const measurements = {};
  for (const scenario of scenarios) {
    const samples = { before: [], after: [] };
    for (let round = 0; round < rounds; round++) {
      let expected;
      for (const target of round % 2 ? [...targets].reverse() : targets) {
        writeFileSync(note, original);
        scenario.prepare?.(target, round);
        const load = loadavg()[0];
        const { elapsedMs, report } = run(target, scenario.path, scenario.args);
        const diagnostics = report.results.map(({ elapsedMs, cached, ...result }) => result);
        if (expected) assert.deepEqual(diagnostics, expected);
        else expected = diagnostics;
        samples[target.name].push({
          elapsedMs: Math.round(elapsedMs * 100) / 100, load,
          workers: report.summary.workers, cachedSnippets: report.summary.cachedSnippets || 0
        });
      }
    }
    const median = values => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
    const beforeMs = median(samples.before.map(sample => sample.elapsedMs));
    const afterMs = median(samples.after.map(sample => sample.elapsedMs));
    measurements[scenario.name] = { beforeMs, afterMs, speedup: Math.round(beforeMs / afterMs * 100) / 100, samples };
    console.log(`${scenario.name}: ${beforeMs}ms -> ${afterMs}ms`);
  }
  const result = { node: process.version, cpu: cpus()[0].model, rounds, files: 1001, diagrams: 2001, measurements };
  writeFileSync(process.env.BENCH_RESULT || 'bench/refactor.json', JSON.stringify(result, null, 2) + '\n');
} finally {
  writeFileSync(note, original);
  rmSync(temporary, { recursive: true, force: true });
}
