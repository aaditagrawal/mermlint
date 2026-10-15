import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync, mkdirSync, readFileSync, readdirSync, symlinkSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { extractSnippets } from '../src/snippets.js';
import { parseArgs } from '../src/options.js';
import { loadMermaid } from '../src/engine.js';
import { fastAssignWithDepth } from '../src/fast-assign.js';
import { diagrams } from './diagrams.js';
const bin = new URL(process.env.MERMLINT_TEST_SOURCE ? '../bin/mermlint.js' : '../dist/mermlint.js', import.meta.url).pathname;
function temporary(fn) {
  const dir=mkdtempSync(join(tmpdir(),'mermlint-test-'));
  try { return fn(dir); } finally { rmSync(dir,{recursive:true,force:true}); }
}
function run(args=[], input, cwd) {
  return spawnSync(process.execPath,[bin,...args],{input,cwd,encoding:'utf8',maxBuffer:16*1024*1024,env:{...process.env,MERMLINT_WORKERS:'auto',NODE_DISABLE_COMPILE_CACHE:'1'}});
}
function report(input) {
  const r=run(['--stdin','--format','json'],input);
  assert.notEqual(r.status,2,r.stderr);
  return JSON.parse(r.stdout);
}
let allDiagrams;
function diagramReport() {
  return allDiagrams ||= report(diagrams.flatMap(([,valid,invalid])=>[valid,invalid]).map(text=>`\`\`\`mermaid\n${text}\n\`\`\``).join('\n'));
}
for (const [index,[type]] of diagrams.entries()) {
  test(`${type}: valid Mermaid 12 syntax`,()=>{
    const result=diagramReport().results[index*2];
    assert.equal(result.ok,true,result.error?.message);
    assert.equal(result.diagramType,type);
  });
  test(`${type}: invalid Mermaid 12 syntax`,()=>{
    const result=diagramReport().results[index*2+1];
    assert.equal(result.ok,false);
    assert.ok(result.error.hint);
    assert.ok(result.error.agent.target.line>=result.startLine);
  });
}
test('fixtures cover every registered Mermaid diagram except internal error/frontmatter sentinels',async()=>{
  const m=await loadMermaid();
  const ids=m.getRegisteredDiagramsMetadata().map(x=>x.id).filter(x=>!['error','---'].includes(x)).sort();
  assert.deepEqual(diagrams.map(([id])=>id).sort(),ids);
});
for (const [name,input,expected] of [
  ['leading blanks and EOF','Title\n```mermaid\n\n\nflowchart TD\nA-->\n```',6],
  ['comment removal','Title\n```mermaid\n%% intro\nflowchart TD\n%% comment\nA-->\n```',6],
  ['frontmatter','Title\n```mermaid\n---\ntitle: Demo\n---\nflowchart TD\nA-->\n```',7],
  ['init directive','Title\n```mermaid\n%%{init: {"theme": "dark"}}%%\nflowchart TD\nA-->\n```',5],
  ['CRLF','Title\r\n```mermaid\r\nflowchart TD\r\nA-->\r\n```',4],
  ['indented fence','Title\n  ```mermaid\n  flowchart TD\n  A-->\n  ```',4],
]) test(`source mapping: ${name}`,()=>{
  const result=report(input).results[0];
  assert.equal(result.ok,false);
  assert.equal(result.error.line,expected,result.error.message);
  assert.match(result.error.offendingLine,/A-->/);
});
test('modern parser reports a source column',()=>{
  const result=report('Title\n```mermaid\narchitecture-beta\nservice\n```').results[0];
  assert.equal(result.error.line,4);
  assert.ok(result.error.column>1);
});
test('unknown diagram keyword includes a repair hint',()=>{
  const result=report('unknownDiagram\nA-->B').results[0];
  assert.equal(result.ok,false);
  assert.match(result.error.hint,/supported Mermaid diagram keyword/);
});
test('does not interpret fences inside a larger example fence',()=>{
  const input='````markdown\n```mermaid\nflowchart TD\nA-->\n```\n````';
  assert.equal(report(input).summary.snippets,0);
});
test('tilde, uppercase language, mixed fences, and multiple diagram indices',()=>{
  const input='~~~MERMAID\nflowchart TD\nA-->B\n~~~\n```js\nnope\n```\n```mermaid\npie\n"A": 1\n```';
  const j=report(input);assert.equal(j.summary.errors,0);
  assert.deepEqual(j.results.map(x=>[x.index,x.startLine]),[[1,2],[2,9]]);
});
test('unclosed Mermaid fence is reported',()=>{
  const result=report('```mermaid\nflowchart TD\nA-->B').results[0];
  assert.equal(result.ok,false);assert.match(result.error.message,/Unclosed/);
});
test('empty Markdown Mermaid fence is skipped',()=>assert.equal(report('```mermaid\n\n```').summary.snippets,0));
test('raw stdin preserves blank lines, BOM, and line locations',()=>{
  const result=report('\ufeff\nflowchart TD\nA-->').results[0];assert.equal(result.error.line,3);
});
test('JSON exit codes distinguish syntax and usage errors',()=>{
  assert.equal(run(['--stdin'],'flowchart TD\nA-->B').status,0);
  assert.equal(run(['--stdin'],'flowchart TD\nA-->').status,1);
  assert.equal(run(['--format','xml']).status,2);
  assert.equal(run(['missing-file.mmd']).status,2);
});
test('NDJSON ends in one summary, including no snippets',()=>{
  const r=run(['--stdin','--format','ndjson'],'```mermaid\nflowchart TD\nA-->\n```');
  assert.equal(r.status,1);const lines=r.stdout.trim().split('\n').map(JSON.parse);
  assert.equal(lines.length,2);assert.equal(lines[1].summary.errors,1);assert.equal(lines[0].ok,false);
  const empty=run(['--stdin','--format','ndjson'],'```mermaid\n```');
  assert.equal(JSON.parse(empty.stdout).summary.snippets,0);
});
test('compact timing goes to stderr and help does not load the engine',()=>{
  const r=run(['--stdin','--timing'],'flowchart TD\nA-->B');
  assert.match(r.stdout,/^OK /);assert.match(r.stderr,/Checked 1 snippet/);
  assert.equal(run(['--help']).status,0);
});
for(const option of ['--workers','--workers=0','--workers=-1','--workers=1.5','--ext','--name','--format','--cache-dir','--unknown']) {
  test(`rejects invalid option ${option}`,()=>assert.equal(run([option]).status,2));
}
test('extensions and -- filenames parse correctly',()=>{
  assert.deepEqual([...parseArgs(['--ext','md,mmd']).extensions],['.md','.mmd']);
  assert.deepEqual(parseArgs(['--','-note.md']).paths,['-note.md']);
});
test('Obsidian vault ignores metadata, dependencies, and symlink cycles',()=>temporary(dir=>{
  for (const name of ['.obsidian','.git','node_modules']) {
    mkdirSync(join(dir,name));writeFileSync(join(dir,name,'bad.md'),'```mermaid\ninvalid\n```');
  }
  writeFileSync(join(dir,'note.md'),'---\ntags: [example]\n---\n# [[Link]]\n```mermaid\nflowchart TD\nA-->B\n```');
  symlinkSync(dir,join(dir,'cycle'),'dir');
  const r=run([dir,'--format','json','--no-cache']);assert.equal(r.status,0,r.stderr);
  const j=JSON.parse(r.stdout);assert.equal(j.summary.files,1);assert.equal(j.summary.snippets,1);
}));
test('overlapping inputs do not duplicate files',()=>temporary(dir=>{
  const file=join(dir,'file.mmd');writeFileSync(file,'flowchart TD\nA-->B');
  const j=JSON.parse(run([dir,file,'--format','json','--no-cache']).stdout);assert.equal(j.summary.files,1);
}));
test('workers parse valid/invalid diagrams and preserve discovery order',()=>temporary(dir=>{
  writeFileSync(join(dir,'a.mmd'),'sequenceDiagram\nA->>B: hi');
  writeFileSync(join(dir,'b.mmd'),'flowchart TD\nA-->');
  const r=run([dir,'--workers','2','--format','json','--no-cache']);assert.equal(r.status,1,r.stderr);
  const j=JSON.parse(r.stdout);assert.equal(j.summary.workers,2);
  assert.deepEqual(j.results.map(x=>x.ok),[true,false]);
  assert.match(j.results[0].source,/a\.mmd$/);
}));
test('cache reuses successes and failures; content changes invalidate it',()=>temporary(dir=>{
  const file=join(dir,'note.md'), cache=join(dir,'cache');
  writeFileSync(file,'Title\n```mermaid\nflowchart TD\nA-->\n```');
  const args=[file,'--cache-dir',cache,'--format','json'];
  const first=JSON.parse(run(args).stdout);assert.equal(first.summary.cachedFiles,0);
  const second=JSON.parse(run(args).stdout);assert.equal(second.summary.cachedFiles,1);assert.equal(second.summary.workers,0);
  assert.equal(second.results[0].cached,true);assert.deepEqual(second.results[0].error,first.results[0].error);
  writeFileSync(file,'Title\n```mermaid\nflowchart TD\nA-->B\n```');
  const changed=JSON.parse(run(args).stdout);assert.equal(changed.summary.cachedFiles,0);assert.equal(changed.summary.errors,0);
  assert.equal(JSON.parse(run(args).stdout).summary.cachedFiles,1);
  assert.equal(JSON.parse(run([...args,'--no-cache']).stdout).summary.cachedFiles,0);
}));
test('corrupt and incompatible caches are misses',()=>temporary(dir=>{
  const file=join(dir,'note.mmd'), cache=join(dir,'cache');writeFileSync(file,'pie\n"A": 1');
  const args=[file,'--cache-dir',cache,'--format','json'];run(args);
  const entry=join(cache,readdirSync(cache)[0]);
  writeFileSync(entry,'{corrupt');assert.equal(JSON.parse(run(args).stdout).summary.cachedFiles,0);
  const [header,diagrams]=readFileSync(entry,'utf8').split('\n');
  const data=JSON.parse(header);data.schema='old';writeFileSync(entry,JSON.stringify(data)+'\n'+diagrams);
  assert.equal(JSON.parse(run(args).stdout).summary.cachedFiles,0);
}));
test('cache is optional on read-only paths and --no-cache creates no cache',()=>temporary(dir=>{
  const file=join(dir,'note.mmd');writeFileSync(file,'flowchart TD\nA-->B');
  assert.equal(run([file,'--cache-dir',file]).status,0);
  assert.equal(run([file,'--no-cache'],undefined,dir).status,0);
  assert.deepEqual(readdirSync(dir),['note.mmd']);
}));
test('stdin never persists results',()=>temporary(dir=>{
  assert.equal(run(['--stdin','--cache-dir',dir],'flowchart TD\nA-->B').status,0);
  assert.deepEqual(readdirSync(dir),[]);
}));
test('install-skill copies frontmatter and metadata to a chosen directory',()=>temporary(dir=>{
  const r=run(['install-skill','--dir',dir]);assert.equal(r.status,0,r.stderr);
  assert.match(readFileSync(join(dir,'mermaid-linter','SKILL.md'),'utf8'),/^---\nname: mermaid-linter/);
  assert.ok(readFileSync(join(dir,'mermaid-linter','agents','openai.yaml'),'utf8'));
  assert.equal(run(['install-skill','--dir',dir]).status,2);
  assert.equal(run(['install-skill','--dir',dir,'--force']).status,0);
}));
test('install-skill defaults to project .claude/skills',()=>temporary(dir=>{
  assert.equal(run(['install-skill'],undefined,dir).status,0);
  assert.ok(readFileSync(join(dir,'.claude/skills/mermaid-linter/SKILL.md')));
}));
test('install-skill rejects conflicting and incomplete targets',()=>{
  assert.equal(run(['install-skill','--codex','--claude']).status,2);
  assert.equal(run(['install-skill','--dir']).status,2);
  assert.equal(run(['install-skill','--unknown']).status,2);
});
test('parse-only bundle never executes callbacks or HTML',()=>{
  const j=report('flowchart TD\nA["<script>throw new Error(1)</script>"] --> B\nclick A call missingCallback()');
  assert.equal(j.summary.errors,0);
});
test('diagram-specific configuration does not leak between parses',()=>{
  const j=report('```mermaid\n---\nconfig:\n  theme: dark\n---\nflowchart TD\nA-->B\n```\n```mermaid\nflowchart TD\nC-->D\n```');
  assert.equal(j.summary.errors,0);assert.equal(j.summary.snippets,2);
});
test('optimized config merge matches upstream, including prototype keys',async()=>{
  await loadMermaid();
  const dir=new URL('../node_modules/mermaid/dist/chunks/mermaid.core/',import.meta.url);
  const file=readdirSync(dir).find(file=>file.endsWith('.mjs') && readFileSync(new URL(file,dir),'utf8').includes('// src/assignWithDepth.ts'));
  const {assignWithDepth_default: upstream}=await import(new URL(file,dir));
  for(const depth of [0,1,2,3,5]) for(const [dst,src] of [
    [{}, {a:{b:{c:1}},array:[1,1,2],nil:null}],
    [{a:{b:1}}, {a:2}], [{a:2}, {a:{b:1}}],
    [[],[1,1,2]], [{},[{a:1},{b:2}]], [undefined,{a:1}],
    [{a:null},{a:1}], [{a:1},{a:null}],
    [{},JSON.parse('{"__proto__":{"polluted":true},"constructor":1,"toString":2}')]
  ]) {
    const a=structuredClone(dst),b=structuredClone(dst);
    assert.deepEqual(fastAssignWithDepth(a,src,{depth}),upstream(b,src,{depth}));
    assert.equal({}.polluted,undefined);
  }
});

test('Obsidian callout fences map back through blockquote prefixes',()=>{
  const j=report('> [!note]\n> ```mermaid\n> flowchart TD\n> A-->\n> ```');
  assert.equal(j.summary.snippets,1);
  assert.equal(j.results[0].error.line,4);
  assert.ok(j.results[0].error.column>=3);
  assert.match(j.results[0].error.offendingLine,/^> A-->/);
});
test('version prints package version',()=>assert.equal(run(['--version']).stdout.trim(),'0.2.0'));

test('fast parse path agrees with public Mermaid API for every fixture',async()=>{
  const engine=await loadMermaid();
  const actual=diagramReport().results;
  for (const [index,[id,valid,invalid]] of diagrams.entries()) {
    for (const [offset,text] of [valid,invalid].entries()) {
      let expected;
      try { expected=await engine.parse(text,{suppressErrors:false}); } catch { expected=false; }
      assert.equal(actual[index*2+offset].ok,Boolean(expected),id);
      if (expected) assert.equal(actual[index*2+offset].diagramType,expected.diagramType,id);
    }
  }
});

test('stdin and paths cannot silently override each other',()=>assert.equal(run(['note.md','--stdin'],'flowchart TD').status,2));

test('EOF with trailing blank lines points to the last statement',()=>{
  const result=report('flowchart TD\nA-->\n\n\n').results[0];
  assert.equal(result.error.line,2);assert.equal(result.error.column,5);
  assert.match(result.error.hint,/missing a target node/);
});
