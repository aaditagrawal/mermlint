import { chmod, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { build } from 'esbuild';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

const common = {
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node20',
  minify: true,
  sourcemap: false,
  legalComments: 'eof',
  logLevel: 'info'
};

await build({
  ...common,
  entryPoints: ['bin/mermlint.js'],
  outfile: 'dist/mermlint.js'
});

await build({
  ...common,
  entryPoints: ['src/worker.js'],
  outfile: 'dist/worker.js'
});

const cliPath = 'dist/mermlint.js';
const cli = await readFile(cliPath, 'utf8');
if (!cli.startsWith('#!/usr/bin/env node')) {
  await writeFile(cliPath, `#!/usr/bin/env node\n${cli}`);
}
await chmod(cliPath, 0o755);
