import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { cloneConfig, lazyConfigCopy } from '../src/clone-config.js';
import { loadMermaid } from '../src/cli.js';
import { diagrams } from './diagrams.js';

const bin = new URL(process.env.MERMLINT_TEST_SOURCE ? '../bin/mermlint.js' : '../dist/mermlint.js', import.meta.url).pathname;
function run(text, workers = 1) {
  const result = spawnSync(process.execPath, [bin, '--stdin', '--no-cache', '--format', 'json', '--workers', String(workers)], {
    input: text, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024,
    env: { ...process.env, NODE_DISABLE_COMPILE_CACHE: '1' }
  });
  assert.ok([0, 1].includes(result.status), result.stderr);
  return JSON.parse(result.stdout);
}
const fence = text => `\`\`\`mermaid\n${text}\n\`\`\``;
const withoutTiming = result => { const { elapsedMs, ...rest } = result; return rest; };

test('lazy configuration reads match upstream merge values and copy depth', async () => {
  await loadMermaid();
  const dir = new URL('../node_modules/mermaid/dist/chunks/mermaid.core/', import.meta.url);
  const file = readdirSync(dir).find(file => file.endsWith('.mjs') && readFileSync(new URL(file, dir), 'utf8').includes('// src/assignWithDepth.ts'));
  const { assignWithDepth_default: upstream, getConfig } = await import(new URL(file, dir));
  const symbol = Symbol('omitted above depth zero');
  for (const source of [
    getConfig(),
    { scalar: 1, nil: null, array: [1, 1, -0, 0, NaN, NaN], section: { nil: null, deep: { nil: null, refs: { value: 1 }, array: [1, 1] } }, [symbol]: 2 },
    JSON.parse('{"__proto__":{"value":1},"constructor":2,"toString":3,"section":{"__proto__":{"deep":1}}}')
  ]) {
    const expected = upstream({}, source);
    const actual = lazyConfigCopy(source);
    // Read out of order before reflection to exercise property materialization.
    void actual.section;
    assert.deepEqual(actual, expected);
    assert.deepEqual(Reflect.ownKeys(actual), Reflect.ownKeys(expected));
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
    assert.deepEqual(cloneConfig(source), expected);
    if (source.section) {
      actual.section.extra = 1;
      assert.equal(source.section.extra, undefined);
      if (source.section.deep) {
        actual.section.deep.extra = 2;
        assert.equal(source.section.deep.extra, undefined);
        assert.equal(actual.section.deep.refs, source.section.deep.refs);
      }
    }
    assert.equal(Object.getPrototypeOf(actual), Object.prototype);
    assert.equal({}.value, undefined);
  }
});

test('lazy configuration supports writes, deletion, reflection, symbols, and freezing', () => {
  const source = { a: 1, b: { value: 2 }, c: 3, nil: null };
  const expected = cloneConfig(source);
  const actual = lazyConfigCopy(source);
  void actual.c;
  const symbol = Symbol('added');
  for (const copy of [expected, actual]) {
    delete copy.b;
    copy.newKey = 4;
    copy.b = { replacement: true };
    copy.nil = 5;
    copy[2] = 'second';
    copy[1] = 'first';
    copy[symbol] = 6;
    Object.defineProperty(copy, 'a', { value: 7, enumerable: false });
  }
  assert.deepEqual(Reflect.ownKeys(actual), Reflect.ownKeys(expected));
  assert.deepEqual(Object.getOwnPropertyDescriptors(actual), Object.getOwnPropertyDescriptors(expected));
  assert.equal('b' in actual, true);
  assert.equal('missing' in actual, false);
  assert.equal(source.a, 1);
  Object.freeze(actual);
  assert.ok(Object.isFrozen(actual));
  assert.throws(() => { actual.a = 8; }, TypeError);
  const untouched = Object.freeze(lazyConfigCopy(source));
  assert.deepEqual(untouched, cloneConfig(source));
});

test('configuration revisions reset after directives, failures, and site updates', async () => {
  const dir = new URL('../dist/chunks/', import.meta.url);
  const file = readdirSync(dir).find(file => file.startsWith('mermaid.core-'));
  const { default: engine } = await import(new URL(file, dir));
  const api = engine.mermaidAPI;
  engine.initialize({ startOnLoad: false, theme: 'default', fontFamily: 'monospace' });
  api.reset();
  const base = JSON.parse(JSON.stringify(api.getConfig()));
  const snapshot = api.getConfig();
  await engine.parse('---\nconfig:\n  theme: dark\n  flowchart:\n    defaultRenderer: elk\n---\nflowchart TD\nA-->B');
  api.reset();
  assert.deepEqual(JSON.parse(JSON.stringify(api.getConfig())), base);
  assert.deepEqual(JSON.parse(JSON.stringify(snapshot)), base);
  await assert.rejects(engine.parse('%%{init: {"theme":"dark"}}%%\nflowchart TD\nA-->'));
  api.reset();
  assert.deepEqual(JSON.parse(JSON.stringify(api.getConfig())), base);
  api.updateSiteConfig({ fontFamily: 'serif' });
  api.reset();
  assert.equal(api.getConfig().fontFamily, 'serif');
  engine.initialize({ startOnLoad: false, fontFamily: 'sans-serif' });
  api.reset();
  assert.equal(api.getConfig().fontFamily, 'sans-serif');
  api.globalReset();
  assert.equal(api.getConfig().fontFamily, api.defaultConfig.fontFamily);
  api.reset();
  assert.equal(api.getConfig().fontFamily, 'sans-serif');
  const read = api.getConfig();
  read.flowchart.defaultRenderer = 'elk';
  assert.notEqual(api.getConfig().flowchart.defaultRenderer, 'elk');
});

test('family batches preserve all fixture diagnostics and discovery order', () => {
  const text = diagrams.flatMap(([, valid, invalid]) => [fence(valid), fence(invalid)]).reverse().join('\n');
  const serial = run(text);
  const parallel = run(text, 4);
  assert.equal(parallel.summary.workers, 4);
  assert.deepEqual(parallel.results.map(withoutTiming), serial.results.map(withoutTiming));
});

test('a single large family uses the requested worker count', () => {
  const text = Array.from({ length: 9 }, (_, i) => fence(`flowchart TD\nA${i}-->${i % 2 ? '' : `B${i}`}`)).join('\n');
  const serial = run(text);
  const parallel = run(text, 4);
  assert.equal(parallel.summary.workers, 4);
  assert.deepEqual(parallel.results.map(withoutTiming), serial.results.map(withoutTiming));
});

test('profiling separates main and worker phases without changing JSON stdout', () => {
  const text = [fence('sequenceDiagram\nA->>B: hi'), fence('pie\n"A": 1')].join('\n');
  const result = spawnSync(process.execPath, [bin, '--stdin', '--no-cache', '--format', 'json', '--workers', '2'], {
    input: text, encoding: 'utf8', env: { ...process.env, MERMLINT_PROFILE: '1', NODE_DISABLE_COMPILE_CACHE: '1' }
  });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).summary.snippets, 2);
  const profiles = result.stderr.trim().split('\n').map(line => JSON.parse(line).mermlintProfile);
  assert.equal(profiles.length, 3);
  const main = profiles.find(profile => profile.threadId === 0);
  assert.ok(main.phases.discoveryAndRead >= 0);
  assert.ok(main.phases.report >= 0);
  const workers = profiles.filter(profile => profile.threadId !== 0);
  assert.equal(workers.reduce((sum, profile) => sum + profile.snippets, 0), 2);
  assert.ok(workers.every(profile => profile.phases.engineImportAndInitialize >= 0 && profile.phases.resultClone >= 0));
});
