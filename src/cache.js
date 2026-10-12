import { createHash, randomUUID } from 'node:crypto';
import { mkdirSync, readFileSync, renameSync, writeFileSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
// Bump on changes to extraction, parsing, or diagnostic semantics.
const SCHEMA = 'mermlint-0.2.0-mermaid-12.1.0-v2';
export function cacheKey(text) {
  return createHash('sha256').update(SCHEMA).update('\0').update(text).digest('hex');
}
export function readCache(dir, key) {
  try {
    const entry = JSON.parse(readFileSync(join(dir, `${key}.json`), 'utf8'));
    if (entry.schema !== SCHEMA || entry.key !== key || !Array.isArray(entry.results)) return null;
    if (!entry.results.every(r => typeof r.ok === 'boolean' && typeof r.source === 'string' && Number.isInteger(r.startLine) && (r.ok || (r.error && Number.isInteger(r.error.line))))) return null;
    return entry.results;
  } catch { return null; }
}
export function writeCache(dir, key, results) {
  let temporary;
  try {
    mkdirSync(dir, { recursive: true });
    temporary = join(dir, `${key}.${randomUUID()}.tmp`);
    writeFileSync(temporary, JSON.stringify({ schema: SCHEMA, key, results }), { mode: 0o600 });
    renameSync(temporary, join(dir, `${key}.json`));
  } catch { /* A read-only or unavailable cache must not prevent linting. */ }
  finally { if (temporary) { try { unlinkSync(temporary); } catch {} } }
}
