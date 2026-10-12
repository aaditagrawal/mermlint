import { chmod, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { resolve } from 'node:path';
let optimizedMergeCount = 0;
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await build({
  plugins: [{ name: 'parse-config-merge', setup(builder) {
    builder.onLoad({ filter: /mermaid[\/]dist[\/]chunks[\/]mermaid\.core[\/].*\.mjs$/ }, async ({ path }) => {
      let contents = await readFile(path, 'utf8');
      if (!contents.includes('// src/assignWithDepth.ts')) return;
      const start = contents.indexOf('var assignWithDepth =');
      const end = contents.indexOf('var assignWithDepth_default = assignWithDepth;', start);
      if (start < 0 || end < 0) throw new Error('Mermaid config merge changed; review the parse adapter.');
      contents = `import { fastAssignWithDepth } from ${JSON.stringify(resolve('src/fast-assign.js'))};\n` + contents.slice(0, start) + 'var assignWithDepth = fastAssignWithDepth;\n' + contents.slice(end);
      optimizedMergeCount++;
      return { contents, loader: 'js' };
    });
  }}],
  entryPoints: { mermlint: 'bin/mermlint.js', worker: 'src/worker.js' },
  outdir: 'dist', chunkNames: 'chunks/[name]-[hash]',
  bundle: true, splitting: true, platform: 'node', format: 'esm',
  alias: { dompurify: './src/parse-only-sanitizer.js' },
  define: { MERMLINT_PARSE_ONLY: 'true' },
  target: 'node22', minify: true, sourcemap: false, legalComments: 'eof', logLevel: 'warning'
});
if (optimizedMergeCount !== 1) throw new Error('Expected exactly one Mermaid config merge adapter.');
// Keep licenses of every dependency whose code ships in the bundles.
const lock = JSON.parse((await readFile('bun.lock', 'utf8')).replace(/,(\s*[}\]])/g, '$1'));
const notices = [];
for (const name of Object.keys(lock.packages).sort()) {
  if (name.startsWith('@esbuild/') || name === 'esbuild') continue;
  const parts = name.match(/@[^/]+\/[^/]+|[^/]+/g);
  const packagePath = 'node_modules/' + parts.join('/node_modules/');
  for (const file of ['LICENSE', 'LICENSE.md', 'LICENSE.txt', 'license', 'license.txt', 'LICENSE-MIT', 'LICENCE']) {
    try {
      notices.push(`## ${name}\n\n${await readFile(`${packagePath}/${file}`, 'utf8')}`);
      break;
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
}
await writeFile('dist/THIRD_PARTY_NOTICES.txt', notices.join('\n\n'));
await chmod('dist/mermlint.js', 0o755);
