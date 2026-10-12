import { spawnSync } from 'node:child_process';
import { performance } from 'node:perf_hooks';
import { mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';

// Run an unminified build to retain adapter and upstream function names.
const bin = resolve(process.env.MERMLINT_BENCH_BIN || 'dist/mermlint.js');
const directory = mkdtempSync(join(tmpdir(), 'mermlint-profile-'));
const start = performance.now();
const run = spawnSync(process.execPath, ['--cpu-prof', `--cpu-prof-dir=${directory}`, bin,
  resolve('bench/corpus'), '--no-cache', '--format', 'json', '--workers', process.env.PROFILE_WORKERS || 'auto'], {
  encoding: 'utf8', maxBuffer: 32 * 1024 * 1024,
  env: { ...process.env, NODE_DISABLE_COMPILE_CACHE: '1', MERMLINT_PROFILE: '1' }
});
if (run.status !== 1 && run.status !== 0) throw new Error(run.stderr);
const wallMs = performance.now() - start;
const report = JSON.parse(run.stdout);
const phases = run.stderr.split('\n').filter(line => line.startsWith('{"mermlintProfile":')).map(line => JSON.parse(line).mermlintProfile).sort((a, b) => a.threadId - b.threadId);
function summarize(file) {
  const profile = JSON.parse(readFileSync(join(directory, file)));
  const nodes = new Map(profile.nodes.map(node => [node.id, node]));
  const parents = new Map();
  for (const node of profile.nodes) for (const child of node.children || []) parents.set(child, node.id);
  const categories = {};
  const self = new Map();
  for (const [index, id] of profile.samples.entries()) {
    const frames = [];
    let ancestor = id;
    while (ancestor) { frames.push(nodes.get(ancestor).callFrame); ancestor = parents.get(ancestor); }
    const frame = frames[0];
    const names = frames.map(frame => frame.functionName);
    let category;
    if (frame.functionName === '(idle)') category = 'idle';
    else if (frame.functionName === '(garbage collector)') category = 'gc';
    else if (names.some(name => /compileSourceTextModule|compileForInternalLoader/.test(name))) category = 'compilation';
    else if (names.includes('evaluate')) category = 'moduleEvaluation';
    else if (names.some(name => /^(fastAssignWithDepth|put|assignWithDepth|getConfig|getConfig2|lazyConfigCopy|cloneConfig|materialize|updateCurrentConfig|reset|setConfig)$/.test(name))) category = 'configuration';
    else if (names.some(name => /^(normalizeMermaidError|strippedParserSource|buildCodeFrame|buildRepairHints|parserSourceLines)$/.test(name))) category = 'diagnostics';
    else if (names.some(name => /^(fromText|parse|parse2|lintSnippet)$/.test(name))) category = 'parsing';
    else if (frames.some(frame => /node:fs|node:internal\/fs/.test(frame.url)) || /^(read|readFileUtf8|lstat|writeBuffer)$/.test(frame.functionName)) category = 'io';
    else category = 'other';
    const delta = profile.timeDeltas[index] / 1000;
    categories[category] = (categories[category] || 0) + delta;
    const name = frame.functionName || '<anonymous>';
    self.set(name, (self.get(name) || 0) + delta);
  }
  return {
    threadId: Number(file.match(/\.(\d+)\.\d+\.cpuprofile$/)?.[1]),
    durationMs: Math.round((profile.endTime - profile.startTime) / 1000),
    samplesMs: Object.fromEntries(Object.entries(categories).map(([name, value]) => [name, Math.round(value)])),
    topSelfMs: [...self].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([name, value]) => [name, Math.round(value)])
  };
}
const result = {
  node: process.version, wallMs: Math.round(wallMs), snippets: report.summary.snippets,
  errors: report.summary.errors, workers: report.summary.workers, phases,
  profiles: readdirSync(directory).filter(file => file.endsWith('.cpuprofile')).map(summarize).sort((a, b) => a.threadId - b.threadId)
};
writeFileSync(process.env.PROFILE_RESULT || 'bench/profile.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
console.error(`Raw main/worker profiles: ${directory}`);
