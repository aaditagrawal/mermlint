import { extname } from 'node:path';

const MARKDOWN_EXTENSIONS = new Set(['.md', '.markdown']);

export function extractSnippets(input) {
  if (input.kind === 'direct' || (input.kind === 'stdin' && !hasMermaidFence(input.text))) {
    const text = stripBom(input.text);
    if (!text.trim()) return [];
    return [{
      source: input.path,
      index: 1,
      startLine: 1,
      startColumn: 1,
      text
    }];
  }

  if (MARKDOWN_EXTENSIONS.has(extname(input.path).toLowerCase()) || hasMermaidFence(input.text)) {
    return extractMarkdownMermaidFences(input.path, input.text);
  }

  return [];
}

function extractMarkdownMermaidFences(source, text) {
  if (!hasMermaidFence(text)) return [];
  const snippets = [];
  const lines = stripBom(text).split(/\r?\n/);
  let fence = null;
  const finish = () => {
    const text = fence.mermaid ? fence.lines.join('\n') : '';
    if (text.trim()) {
      snippets.push({
        source,
        index: snippets.length + 1,
        startLine: fence.startLine,
        startColumn: fence.sourceColumns[0] || 1,
        sourceColumns: fence.sourceColumns,
        originalLines: fence.originalLines,
        text,
        unclosed: Boolean(fence.unclosed)
      });
    }
    fence = null;
  };
  for (let index = 0; index < lines.length; index++) {
    const rawLine = lines[index];
    const quotePrefix = rawLine.match(/^(?: {0,3}> ?)+/)?.[0] || '';
    const line = rawLine.slice(quotePrefix.length);
    if (fence) {
      const close = line.match(/^\s*(`{3,}|~{3,})\s*$/);
      if (close && close[1][0] === fence.marker && close[1].length >= fence.size) {
        finish();
      } else if (fence.mermaid) {
        fence.lines.push(line);
        fence.sourceColumns.push(quotePrefix.length + 1);
        fence.originalLines.push(rawLine);
      }
      continue;
    }
    const open = line.match(/^(\s*)(`{3,}|~{3,})\s*([A-Za-z0-9_-]+)?[^\S\r\n]*.*$/);
    if (open) {
      fence = {
        marker: open[2][0], size: open[2].length,
        mermaid: (open[3] || '').toLowerCase() === 'mermaid',
        startLine: index + 2, lines: [], sourceColumns: [], originalLines: []
      };
    }
  }
  if (fence) {
    fence.unclosed = true;
    finish();
  }
  return snippets;
}

export function hasMermaidFence(text) {
  return /(^|\n)[ \t]*(?:>[ \t]*)*(`{3,}|~{3,})\s*mermaid\b/i.test(text);
}

function stripBom(text) {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}
