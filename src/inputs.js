import { existsSync, readdirSync, readFileSync, lstatSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { stdin } from 'node:process';

const DIRECT_EXTENSIONS = new Set(['.mmd', '.mermaid']);

export function collectInputs(paths, extensions) {
  const inputs = [];
  const seen = new Set();
  for (const path of paths) {
    const absolute = resolve(path);
    if (!existsSync(absolute)) {
      throw new Error(`Path does not exist: ${path}`);
    }
    collectPath(absolute, extensions, inputs, seen, lstatSync(absolute));
  }
  return inputs;
}

function collectPath(path, extensions, inputs, seen, entry) {
  if (seen.has(path)) return;
  seen.add(path);
  if (entry.isSymbolicLink()) return;
  if (entry.isDirectory()) {
    const entries = readdirSync(path, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.obsidian' || entry.name === '.mermlint-cache') {
        continue;
      }
      collectPath(join(path, entry.name), extensions, inputs, seen, entry);
    }
    return;
  }

  if (!entry.isFile()) {
    return;
  }

  const extension = extname(path).toLowerCase();
  if (!extensions.has(extension)) {
    return;
  }

  inputs.push({
    path,
    kind: DIRECT_EXTENSIONS.has(extension) ? 'direct' : 'markdown',
    text: readFileSync(path, 'utf8')
  });
}

export async function readStdin() {
  stdin.setEncoding('utf8');
  let data = '';
  for await (const chunk of stdin) data += chunk;
  return data;
}
