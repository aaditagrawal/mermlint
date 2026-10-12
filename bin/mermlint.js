#!/usr/bin/env node
import { enableCompileCache } from 'node:module';
// Enable before importing the large parser chunks. Node controls the cache location.
if (process.env.NODE_DISABLE_COMPILE_CACHE !== '1') enableCompileCache();
const { main } = await import('../src/cli.js');
main(process.argv.slice(2)).catch((error) => {
  console.error(`mermlint: ${error?.message || String(error)}`);
  process.exitCode = 2;
});
