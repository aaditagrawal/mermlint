import { spawnSync } from 'node:child_process';
import { performance } from 'node:perf_hooks';
import { readFileSync, writeFileSync } from 'node:fs';
import { generate, corpus } from './generate.js';
import { join, resolve } from 'node:path';
import { cpus } from 'node:os';
generate();
const bin = resolve(process.env.MERMLINT_BENCH_BIN || 'dist/mermlint.js');
const rounds = Number(process.env.BENCH_ROUNDS || 5);
const mode = process.env.BENCH_MODE || 'baseline';
const cacheDir = resolve('bench/.cache');
function measure(path, args=[]) {
  const values=[]; let report;
  for(let i=0;i<rounds;i++) {
    const start=performance.now();
    const run=spawnSync(process.execPath,[bin,path,'--format','json',...args],{encoding:'utf8',maxBuffer:32*1024*1024,env:{...process.env,NODE_COMPILE_CACHE:''}});
    if (![0,1].includes(run.status)) throw new Error(run.stderr);
    values.push(performance.now()-start); report=JSON.parse(run.stdout);
  }
  values.sort((a,b)=>a-b);
  return { medianMs: Math.round(values[Math.floor(values.length/2)]*100)/100, snippets:report.summary.snippets, errors:report.summary.errors, workers:report.summary.workers };
}
const noCache=mode==='baseline'?[]:['--no-cache'];
const result={mode,node:process.version,cpu:cpus()[0].model,rounds,files:1001,
  cold:measure(join(corpus,'single.mmd'),noCache),
  serial:measure(corpus,['--workers','1',...noCache]),
  corpus:measure(corpus,noCache)
};
result.serial.diagramsPerSecond=Math.round(result.serial.snippets*1000/result.serial.medianMs);
if(mode!=='baseline') {
  spawnSync(process.execPath,[bin,corpus,'--cache-dir',cacheDir],{stdio:'ignore'});
  result.cached=measure(corpus,['--cache-dir',cacheDir]);
}
writeFileSync(`bench/${mode}.json`,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
