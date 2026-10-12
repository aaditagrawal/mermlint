import { readdirSync, readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
function snapshot(dir = 'dist') {
  const files = [];
  for (const item of readdirSync(dir, { withFileTypes: true }).sort((a,b)=>a.name.localeCompare(b.name))) {
    const path = join(dir, item.name);
    if (item.isDirectory()) files.push(...snapshot(path));
    else files.push([path, statSync(path).mode & 0o111, createHash('sha256').update(readFileSync(path)).digest('hex')]);
  }
  return files;
}
const before = JSON.stringify(snapshot());
const build = spawnSync(process.execPath, ['scripts/build.js'], { stdio: 'inherit' });
if (build.status !== 0) process.exit(build.status || 2);
if (before !== JSON.stringify(snapshot())) {
  console.error('dist/ was stale. Review and commit the rebuilt artifacts.');
  process.exitCode = 1;
} else console.log('dist/ matches a clean rebuild.');
