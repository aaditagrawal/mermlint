import { analyzeSource } from './source-map.js';

export function formatDiagnostic(failure, snippet) {
  const { message, parserLine, parserColumn, expected: expectedCompact, found } = failure;
  const snippetLines = snippet.text.split(/\r?\n/);
  const { diagramType, lines: sourceLines } = analyzeSource(snippet.text);
  const parserIndex = clamp(parserLine || 1, 1, Math.max(1, sourceLines.length)) - 1;
  const eof = failure.eof || parserLine > sourceLines.length;
  const mapped = (eof ? sourceLines.findLast(item => snippetLines[item.line-1]?.trim()) : sourceLines[parserIndex]) || { line: 1, columnOffset: 0 };
  const relativeLine = mapped.line;
  const lineText = snippetLines[relativeLine - 1] || '';
  const relativeColumn = clamp(eof ? lineText.length + 1 : parserColumn + 1 + mapped.columnOffset, 1, Math.max(1, lineText.length + 1));
  const absoluteLine = snippet.startLine + relativeLine - 1;
  const absoluteColumn = relativeColumn + (snippet.sourceColumns?.[relativeLine-1] || 1) - 1;
  const frame = buildCodeFrame(snippet.originalLines?.join('\n') || snippet.text, relativeLine, absoluteLine, absoluteColumn);
  const repairHints = buildRepairHints({
    message,
    found,
    expected: expectedCompact,
    lineText: frame.offendingLine,
    snippet,
    diagramType
  });
  const hint = repairHints[0] || 'Mermaid parser rejected this syntax; inspect the code frame and simplify the statement near the caret.';

  return {
    message,
    diagramType,
    line: absoluteLine,
    column: absoluteColumn,
    relativeLine,
    relativeColumn,
    parserLine: parserLine || null,
    parserColumn: parserColumn || null,
    found,
    expected: expectedCompact.slice(0, 12),
    frame: frame.lines,
    offendingLine: frame.offendingLine,
    hint,
    agent: {
      summary: `${snippet.source}:${absoluteLine}:${absoluteColumn} ${hint}`,
      target: {
        source: snippet.source,
        snippetIndex: snippet.index,
        line: absoluteLine,
        column: absoluteColumn,
        relativeLine,
        relativeColumn
      },
      repairHints,
      nextActions: [
        `Edit the Mermaid code fence starting at ${snippet.source}:${snippet.startLine}.`,
        `Inspect line ${absoluteLine}, especially near column ${absoluteColumn}.`,
        'Run mermlint again on the same file after patching.'
      ]
    }
  };
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

function buildCodeFrame(text, relativeLine, absoluteLine, absoluteColumn) {
  const lines = text.split(/\r?\n/);
  const lineIndex = Math.max(0, Math.min(lines.length - 1, relativeLine - 1));
  const start = Math.max(0, lineIndex - 2);
  const end = Math.min(lines.length - 1, lineIndex + 2);
  const width = String(absoluteLine + (end - lineIndex)).length;
  const frame = [];

  for (let index = start; index <= end; index += 1) {
    const lineNumber = absoluteLine + (index - lineIndex);
    const line = lines[index] ?? '';
    frame.push({
      line: lineNumber,
      relativeLine: index + 1,
      text: line,
      marker: index === lineIndex ? `${' '.repeat(Math.max(0, absoluteColumn - 1))}^` : '',
      display: `${String(lineNumber).padStart(width, ' ')} | ${line}`
    });
    if (index === lineIndex) {
      frame.push({
        line: lineNumber,
        relativeLine: index + 1,
        text: '',
        marker: `${' '.repeat(Math.max(0, absoluteColumn - 1))}^`,
        display: `${' '.repeat(width)} | ${' '.repeat(Math.max(0, absoluteColumn - 1))}^`
      });
    }
  }

  return {
    lines: frame,
    offendingLine: lines[lineIndex] ?? ''
  };
}

function buildRepairHints({ message, found, expected, lineText, snippet, diagramType }) {
  const hints = [];
  const firstLine = diagramType || snippet.text.trimStart().split(/\r?\n/, 1)[0] || '';
  const lowerMessage = message.toLowerCase();
  const lowerLine = lineText.toLowerCase();

  if (/unclosed Mermaid code fence/i.test(message)) hints.push('Add a closing fence with the same marker and at least the opening fence length.');

  if (/no diagram type detected/i.test(message)) {
    hints.push(`Start the snippet with a supported Mermaid diagram keyword; current first line is "${firstLine || '<empty>'}".`);
  }

  if (found === 'INVALID' || /got 'INVALID'/i.test(message)) {
    hints.push('Mermaid marked the token near the caret as invalid; quote labels containing punctuation, colons, brackets, or markdown.');
  }

  if (lowerLine.includes(':') && /flowchart|graph/.test(firstLine)) {
    hints.push('In flowcharts, put labels with colons inside quotes or brackets, for example A["Command: value"].');
  }

  if (/(graph|flowchart)/.test(firstLine) && /-->\s*$/.test(lineText.trim())) {
    hints.push('This edge is missing a target node after the arrow.');
  }

  if (lowerMessage.includes('there can be only one root')) {
    hints.push('This looks like non-Mermaid Markdown or an Obsidian admonition inside the Mermaid fence; move it outside the fence.');
  }

  if (expected.includes('NL') || expected.includes('NEWLINE')) {
    hints.push('Check whether this statement needs to end before the next Mermaid statement starts.');
  }

  const typeHints = {
    sequenceDiagram: 'Use participant->>participant: message; pair loop, alt, opt, and par blocks with end.',
    classDiagram: 'Check class names, relationship arrows, and balanced member braces.',
    'stateDiagram-v2': 'Check state transitions and close composite states with a matching brace.',
    stateDiagram: 'Check state transitions and close composite states with a matching brace.',
    erDiagram: 'Use ENTITY ||--o{ ENTITY : label and valid attribute declarations.',
    gantt: 'Check dateFormat, task dates, durations, and colon-separated task fields.',
    architecture: 'Check service/group declarations, referenced IDs, and edge ports such as db:L -- R:api.',
    'architecture-beta': 'Check service/group declarations, referenced IDs, and edge ports such as db:L -- R:api.',
    mindmap: 'Use one root and indent each child more than its parent.',
    sankey: 'Use source,target,numeric-value rows after the sankey header.',
    'sankey-beta': 'Use source,target,numeric-value rows after the sankey header.',
    'packet-beta': 'Use numeric bit ranges followed by a colon and a quoted label.',
    packet: 'Use numeric bit ranges followed by a colon and a quoted label.'
  };
  if (typeHints[firstLine]) hints.push(typeHints[firstLine]);
  else if (firstLine && !/flowchart|graph/.test(firstLine)) hints.push(`Check ${firstLine} statement syntax, delimiters, and indentation against Mermaid 12 documentation.`);

  if (expected.length > 0) {
    hints.push(`Parser expected one of: ${expected.slice(0, 6).join(', ')}.`);
  }

  hints.push(`Smallest useful recheck: mermlint "${snippet.source}" --format json.`);
  return [...new Set(hints)].slice(0, 6);
}

export function formatResult(snippet, parsed, cached = false) {
  const result = {
    ok: parsed.ok,
    source: snippet.source,
    index: snippet.index,
    startLine: snippet.startLine,
    startColumn: snippet.startColumn,
    ...(parsed.ok ? { diagramType: parsed.diagramType } : { error: formatDiagnostic(parsed.failure, snippet) }),
    elapsedMs: cached ? 0 : parsed.elapsedMs
  };
  if (cached) result.cached = true;
  return result;
}
