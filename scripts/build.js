import { chmod, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { resolve } from 'node:path';
let optimizedMergeCount = 0;
let optimizedCloneCount = 0;
let strippedRenderers = 0;
let strippedEntryCount = 0;
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await build({
  plugins: [{ name: 'parse-config-merge', setup(builder) {
    builder.onLoad({ filter: /mermaid[\/]dist[\/]mermaid\.core\.mjs$/ }, async ({ path }) => {
      let contents = await readFile(path, 'utf8');
      const entryStart = contents.indexOf('var mermaid = {');
      const entryEnd = contents.indexOf('var mermaid_default = mermaid;', entryStart);
      const browserHook = 'if (typeof document !== "undefined") {\n  window.addEventListener("load", contentLoaded, false);\n}';
      if (entryStart < 0 || entryEnd < 0 || !contents.includes(browserHook) || !contents.includes('  render,\n  parse,')) throw new Error('Mermaid entry changed; review the parse-only build.');
      contents = contents.slice(0, entryStart) + 'var mermaid = { mermaidAPI, parse: parse2, initialize: initialize2, getRegisteredDiagramsMetadata };\n' + contents.slice(entryEnd);
      contents = contents.replace(browserHook, '').replace('  render,\n  parse,', '  parse,');
      strippedEntryCount++;
      return { contents, loader: 'js' };
    });
    builder.onLoad({ filter: /mermaid[\/]dist[\/]chunks[\/]mermaid\.core[\/].*\.mjs$/ }, async ({ path }) => {
      let contents = await readFile(path, 'utf8');
      // A linter never draws SVG. Removing the diagram's renderer reference lets
      // esbuild discard its drawing functions and their dependency graph.
      const definitionStart = contents.lastIndexOf('// src/diagrams/');
      const exportStart = contents.lastIndexOf('\nexport {');
      if (definitionStart >= 0 && exportStart > definitionStart) contents = contents.slice(0, definitionStart) + contents.slice(definitionStart, exportStart).replace(/^  renderer(?:: [A-Za-z_$][\w$]*)?(,?)$/gm, (_, comma) => {
          strippedRenderers++;
          return `  renderer: {}${comma}`;
        }) + contents.slice(exportStart);
      if (!contents.includes('// src/assignWithDepth.ts')) return { contents, loader: 'js' };
      const start = contents.indexOf('var assignWithDepth =');
      const end = contents.indexOf('var assignWithDepth_default = assignWithDepth;', start);
      if (start < 0 || end < 0) throw new Error('Mermaid config merge changed; review the parse adapter.');
      contents = `import { fastAssignWithDepth } from ${JSON.stringify(resolve('src/fast-assign.js'))};\n` + contents.slice(0, start) + 'var assignWithDepth = fastAssignWithDepth;\n' + contents.slice(end);
      const getConfig = 'return assignWithDepth_default({}, currentConfig);';
      if (contents.split(getConfig).length !== 2) throw new Error('Mermaid getConfig changed; review the clone adapter.');
      contents = `import { lazyConfigCopy } from ${JSON.stringify(resolve('src/clone-config.js'))};\n` + contents.replace(getConfig, 'return lazyConfigCopy(currentConfig);');
      const resetCall = '  updateCurrentConfig(config2, directives);\n}, "reset");';
      if (!contents.includes(resetCall) || !contents.includes('  siteConfig = assignWithDepth_default({}, defaultConfig);') || !contents.includes('  siteConfig = assignWithDepth_default(siteConfig, conf);')) throw new Error('Mermaid reset changed; review the config revision adapter.');
      contents = 'let baseConfigRevision;\n' + contents.replace(resetCall, '  if (config2 === siteConfig && baseConfigRevision) currentConfig = baseConfigRevision;\n  else { updateCurrentConfig(config2, directives); if (config2 === siteConfig) baseConfigRevision = currentConfig; }\n}, "reset");');
      contents = contents.replaceAll('  siteConfig = assignWithDepth_default', '  baseConfigRevision = undefined;\n  siteConfig = assignWithDepth_default');
      optimizedCloneCount++;
      optimizedMergeCount++;
      return { contents, loader: 'js' };
    });
  }}],
  entryPoints: { mermlint: 'bin/mermlint.js', worker: 'src/worker.js' },
  outdir: 'dist', chunkNames: 'chunks/[name]-[hash]',
  bundle: true, splitting: true, platform: 'node', format: 'esm',
  alias: { dompurify: './src/parse-only-sanitizer.js' },
  define: { MERMLINT_PARSE_ONLY: 'true' },
  target: 'node22', minify: process.env.MERMLINT_PROFILE_BUILD !== '1', sourcemap: false, legalComments: 'eof', logLevel: 'warning'
});
if (optimizedMergeCount !== 1) throw new Error('Expected exactly one Mermaid config merge adapter.');
if (optimizedCloneCount !== 1) throw new Error('Expected exactly one Mermaid config clone adapter.');
if (strippedEntryCount !== 1) throw new Error('Expected exactly one Mermaid parse-only entry.');
if (strippedRenderers !== 35) throw new Error('Mermaid diagram definitions changed; review the 35 parse-only renderers.');
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
