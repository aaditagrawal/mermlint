import { createHash, randomUUID } from 'node:crypto';
import { mkdirSync, readFileSync, renameSync, writeFileSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

// Bump on changes to extraction, parsing, or diagnostic semantics.
const SCHEMA = 'mermlint-0.2.0-mermaid-12.1.0-v4';

export function cacheKey(...parts) {
  const hash = createHash('sha256').update(SCHEMA);
  for (const part of parts) hash.update('\0').update(part);
  return hash.digest('hex');
}

function validParsed(parsed) {
  if (parsed?.ok === true) return parsed.diagramType === null || typeof parsed.diagramType === 'string';
  const failure = parsed?.failure;
  return parsed?.ok === false && failure && typeof failure.message === 'string'
    && Number.isFinite(failure.parserLine) && Number.isFinite(failure.parserColumn)
    && typeof failure.eof === 'boolean' && Array.isArray(failure.expected)
    && failure.expected.every(token => typeof token === 'string')
    && (failure.found === null || typeof failure.found === 'string' || typeof failure.found === 'number');
}

function validResult(result) {
  return result && typeof result.ok === 'boolean' && typeof result.source === 'string'
    && Number.isInteger(result.index) && Number.isInteger(result.startLine)
    && Number.isInteger(result.startColumn)
    && (result.ok || (Number.isInteger(result.error?.line)
      && Number.isInteger(result.error.column) && typeof result.error.message === 'string'
      && typeof result.error.hint === 'string' && Array.isArray(result.error.frame)
      && Array.isArray(result.error.agent?.repairHints)));
}

// Each entry has two JSON lines: a report and reusable parser outcomes. The
// second line is decoded only after an edit, keeping fully cached scans cheap.
// Edits replace one stable entry atomically instead of accumulating hashes.
export function createCache(directory) {
  let ready = false;
  return {
    read(key) {
      try {
        const text = readFileSync(join(directory, `${key}.json`), 'utf8');
        const separator = text.indexOf('\n');
        if (separator === -1) return null;
        const header = text.slice(0, separator);
        const entry = JSON.parse(header);
        if (entry.schema !== SCHEMA || entry.key !== key || typeof entry.contentKey !== 'string'
          || !Array.isArray(entry.results) || !entry.results.every(validResult)) return null;
        entry.readDiagrams = () => {
          try {
            const diagrams = JSON.parse(text.slice(separator + 1));
            return Array.isArray(diagrams) && diagrams.length === entry.results.length
              && diagrams.every(diagram => typeof diagram?.text === 'string'
                && typeof diagram.unclosed === 'boolean' && validParsed(diagram.parsed)) ? diagrams : [];
          } catch {
            return [];
          }
        };
        return entry;
      } catch {
        return null;
      }
    },

    write(key, data) {
      let temporary;
      try {
        if (!ready) {
          mkdirSync(directory, { recursive: true });
          ready = true;
        }
        temporary = join(directory, `${key}.${randomUUID()}.tmp`);
        const { diagrams, ...report } = data;
        const text = `${JSON.stringify({ schema: SCHEMA, key, ...report })}\n${JSON.stringify(diagrams)}`;
        writeFileSync(temporary, text, { mode: 0o600 });
        renameSync(temporary, join(directory, `${key}.json`));
      } catch {
        // An unavailable cache must not prevent linting.
      } finally {
        if (temporary) {
          try { unlinkSync(temporary); } catch { /* Renamed or already removed. */ }
        }
      }
    }
  };
}
