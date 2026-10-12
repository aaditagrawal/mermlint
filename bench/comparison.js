import { spawnSync } from 'node:child_process';
import { performance } from 'node:perf_hooks';
import { writeFileSync } from 'node:fs';
import { cpus, loadavg } from 'node:os';
import { resolve, join } from 'node:path';
import { generate, corpus } from './generate.js';

const bins = {
  baseline: process.env.MERMLINT_BASELINE_BIN,
  round1: process.env.MERMLINT_ROUND1_BIN,
  round2: process.env.MERMLINT_BENCH_BIN || 'dist/mermlint.js'
};
if (!bins.baseline || !bins.round1) throw new Error('Set MERMLINT_BASELINE_BIN and MERMLINT_ROUND1_BIN to their built CLIs, with package.json and dist/ intact.');
generate();
const rounds = Number(process.env.BENCH_ROUNDS || 5);
const output = Object.fromEntries(Object.keys(bins).map(name => [name, {
  mode: name, node: process.version, cpu: cpus()[0].model, rounds, files: 1001
}]));
const raw = [];
function run(name, path, args) {
  const started = performance.now();
  const processResult = spawnSync(process.execPath, [resolve(bins[name]), path, '--format', 'json', ...args], {
    encoding: 'utf8', maxBuffer: 32 * 1024 * 1024,
    env: { ...process.env, NODE_DISABLE_COMPILE_CACHE: '1', NODE_COMPILE_CACHE: '' }
  });
  if (![0, 1].includes(processResult.status)) throw new Error(processResult.stderr);
  return { wallMs: performance.now() - started, summary: JSON.parse(processResult.stdout).summary };
}
for (const scenario of ['cold', 'serial', 'corpus', 'cached']) {
  const names = Object.keys(bins).filter(name => scenario !== 'cached' || name !== 'baseline');
  const samples = Object.fromEntries(names.map(name => [name, []]));
  if (scenario === 'cached') for (const name of names) run(name, corpus, ['--cache-dir', resolve(`bench/.cache/${name}`)]);
  for (let round = 0; round < rounds; round++) {
    const order = round % 2 ? [...names].reverse() : names;
    for (const name of order) {
      const args = scenario === 'cached' ? ['--cache-dir', resolve(`bench/.cache/${name}`)] : name === 'baseline' ? [] : ['--no-cache'];
      if (scenario === 'serial') args.push('--workers', '1');
      const loadAverage = loadavg()[0];
      const result = run(name, scenario === 'cold' ? join(corpus, 'single.mmd') : corpus, args);
      samples[name].push(result.wallMs);
      output[name][scenario] = { snippets: result.summary.snippets, errors: result.summary.errors, workers: result.summary.workers };
      raw.push({ scenario, name, round, wallMs: Math.round(result.wallMs * 100) / 100, loadAverage });
    }
  }
  for (const name of names) output[name][scenario].medianMs = Math.round(samples[name].sort((a, b) => a - b)[Math.floor(rounds / 2)] * 100) / 100;
}
for (const [name, result] of Object.entries(output)) {
  result.serial.diagramsPerSecond = Math.round(result.serial.snippets * 1000 / result.serial.medianMs);
  writeFileSync(`bench/${name === 'round2' ? 'round2' : `${name}-rerun`}.json`, JSON.stringify(result, null, 2) + '\n');
}
writeFileSync('bench/comparison.json', JSON.stringify({ method: 'Five fresh processes per scenario and revision, alternating revision order each round. V8 compile cache disabled.', results: output, raw }, null, 2) + '\n');
console.log(JSON.stringify(output, null, 2));
