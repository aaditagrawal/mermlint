import { performance } from 'node:perf_hooks';
import { loadMermaid } from './engine.js';

/**
 * Parse one diagram into cloneable, source-independent data. The caller must
 * serialize calls using the same engine because Mermaid holds mutable state.
 */
export async function parseSnippet(snippet, mermaidInstance) {
  const startedAt = performance.now();
  try {
    if (snippet.unclosed) throw new Error('Unclosed Mermaid code fence. Add a matching closing fence.');
    const mermaid = mermaidInstance || await loadMermaid();
    let parsed;
    if (/^\s*---(?:\r?\n|$)/.test(snippet.text) || snippet.text.includes('%%{')) {
      // Config-bearing snippets need the public API's full configuration pipeline.
      parsed = await mermaid.parse(snippet.text, { suppressErrors: false });
    } else {
      // Reset configuration between diagrams, then call the pinned engine's
      // parse-only Diagram constructor. It clears each DB and lazily loads its
      // grammar without the render appearance scope and directive merge passes.
      mermaid.mermaidAPI.reset();
      const diagram = await mermaid.mermaidAPI.getDiagramFromText(snippet.text);
      parsed = { diagramType: diagram.getType() };
    }
    return {
      ok: true,
      diagramType: parsed?.diagramType || null,
      elapsedMs: elapsedSince(startedAt)
    };
  } catch (error) {
    return {
      ok: false,
      failure: describeError(error),
      elapsedMs: elapsedSince(startedAt)
    };
  }
}

function elapsedSince(startedAt) {
  return Math.round((performance.now() - startedAt) * 1000) / 1000;
}

export function describeError(error) {
  const hash = error?.hash;
  const token = hash?.loc || {};
  const modern = error?.result?.parserErrors?.[0]?.token;
  const lexical = error?.result?.lexerErrors?.[0];
  const fallback = parseLocationFromMessage(error?.str || error?.message || '');
  const parserLine = Number(modern?.startLine ?? lexical?.line ?? fallback.line ?? token.first_line ?? 0);
  const parserColumn = Number(modern?.startColumn ? modern.startColumn - 1 : lexical?.column ? lexical.column - 1 : token.first_column ?? fallback.column ?? 0);
  const expected = Array.isArray(hash?.expected) ? hash.expected : [];
  const expectedCompact = expected.map(cleanExpectedToken).filter(Boolean);
  const message = stripAnsi(error?.str || error?.message || String(error)).replace(/\s+$/g, '');
  return {
    message, parserLine, parserColumn, expected: expectedCompact,
    found: hash?.token || modern?.image || normalizeFoundToken(token, message),
    eof: hash?.token === 'EOF' || hash?.token === 1
  };
}

function parseLocationFromMessage(message) {
  const lineMatch = message.match(/Parse error on line (\d+)/i);
  const columnMatch = message.match(/column (\d+)/i);
  const column = columnMatch ? Number(columnMatch[1]) - 1 : 0;
  return {
    line: lineMatch ? Number(lineMatch[1]) : 0,
    column
  };
}

function normalizeFoundToken(token, message) {
  const tokenText = token?.text || token?.value || token?.token || token?.type;
  if (typeof tokenText === 'string' && tokenText.trim()) {
    return tokenText.trim();
  }

  const gotMatch = message.match(/\bgot\s+'([^']+)'/i);
  if (gotMatch) {
    return gotMatch[1];
  }

  return null;
}

function cleanExpectedToken(token) {
  if (typeof token !== 'string') {
    return '';
  }
  return token
    .replace(/^"(.+)"$/, '$1')
    .replace(/^'(.+)'$/, '$1')
    .trim();
}

function stripAnsi(text) {
  return text.replace(/\u001b\[[0-9;]*m/g, '');
}
