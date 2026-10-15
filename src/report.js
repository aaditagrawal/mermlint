import { stdout } from 'node:process';

export function writeReport(format, results, summary) {
  if (format === 'json') {
    stdout.write(`${JSON.stringify({ summary, results }, null, 2)}\n`);
    return;
  }

  if (format === 'ndjson') {
    for (const result of results) {
      stdout.write(`${JSON.stringify(result)}\n`);
    }
    stdout.write(`${JSON.stringify({ summary })}\n`);
    return;
  }

  if (results.length === 0) {
    stdout.write('OK no Mermaid snippets found\n');
    return;
  }

  for (const result of results) {
    if (result.ok) {
      stdout.write(`OK ${result.source}:${result.startLine} #${result.index} ${result.diagramType || 'unknown'} ${result.elapsedMs}ms\n`);
    } else {
      stdout.write(`ERR ${result.source}:${result.error.line}:${result.error.column} #${result.index} ${firstLine(result.error.message)}\n`);
      stdout.write(`    ${result.error.hint}\n`);
    }
  }
}

function firstLine(text) {
  return text.split(/\r?\n/)[0];
}
