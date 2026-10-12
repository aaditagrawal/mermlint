import packageInfo from '../package.json' with { type: 'json' };
import { cacheKey, readCache, writeCache } from './cache.js';
import { installSkill } from './install-skill.js';
import { profileMark, profileReport } from './profile.js';
import { existsSync, readdirSync, readFileSync, lstatSync } from 'node:fs';
import { availableParallelism } from 'node:os';
import { extname, join, resolve } from 'node:path';
import { performance } from 'node:perf_hooks';
import { stdin as input, stdout, stderr } from 'node:process';
import { Worker } from 'node:worker_threads';

const DEFAULT_EXTENSIONS = new Set(['.md', '.markdown', '.mmd', '.mermaid']);
const DIRECT_EXTENSIONS = new Set(['.mmd', '.mermaid']);
const MARKDOWN_EXTENSIONS = new Set(['.md', '.markdown']);

const usage = `Usage:
  mermlint [paths...] [--format compact|json|ndjson] [--workers auto|N] [--timing] [--no-cache] [--cache-dir PATH]
  mermlint install-skill [--claude|--codex|--project|--dir PATH] [--force]
  mermlint --stdin [--name label] [--format compact|json|ndjson]

Examples:
  mermlint notes.md
  mermlint vault/ --format json
  mermlint vault/ --workers 4 --format json
  pbpaste | mermlint --stdin --name clipboard.mmd
`;

export async function main(argv) {
  if (argv[0] === 'install-skill') {
    stdout.write(`Installed mermaid-linter at ${installSkill(argv.slice(1))}\n`);
    return;
  }
  const startedAt = performance.now();
  const options = parseArgs(argv);

  if (options.version) { stdout.write(`${packageInfo.version}\n`); return; }
  if (options.help) {
    stdout.write(usage);
    return;
  }

  const inputs = options.stdin
    ? [{ path: options.name, kind: 'stdin', text: await readStdin() }]
    : collectInputs(options.paths, options.extensions);
  profileMark('discoveryAndRead');

  const groups = inputs.map(item => {
    const key = options.cache ? cacheKey(JSON.stringify([item.path, item.kind, item.text])) : null;
    const cached = options.cache && item.kind !== 'stdin' ? readCache(options.cacheDir, key) : null;
    return { key, cached, item, snippets: cached ? [] : extractSnippets(item) };
  });
  const snippets = groups.flatMap(group => group.snippets);
  profileMark('extractionAndCacheRead');
  const batch = await lintSnippets(snippets, options.workers);
  profileMark('lint');
  const workers = batch.workers;
  const results = [];
  let offset = 0;
  for (const group of groups) {
    if (group.cached) {
      results.push(...group.cached.map(result => ({ ...result, elapsedMs: 0, cached: true })));
    } else {
      const parsed = batch.results.slice(offset, offset + group.snippets.length);
      offset += group.snippets.length;
      results.push(...parsed);
      if (options.cache && group.item.kind !== 'stdin') writeCache(options.cacheDir, group.key, parsed);
    }
  }

  const errored = results.filter((result) => !result.ok);
  const summary = {
    ok: errored.length === 0,
    files: inputs.length,
    snippets: results.length,
    errors: errored.length,
    workers,
    cachedFiles: groups.filter(group => group.cached).length,
    elapsedMs: Math.round((performance.now() - startedAt) * 1000) / 1000
  };
  profileMark('assemblyAndCacheWrite');

  writeReport(options.format, results, summary);
  profileMark('report');
  profileReport({ snippets: snippets.length, workers });

  if (options.timing && options.format === 'compact') {
    stderr.write(`Checked ${summary.snippets} snippet(s) in ${summary.elapsedMs}ms across ${summary.files} file(s).\n`);
  }

  process.exitCode = summary.ok ? 0 : 1;
}

export function parseArgs(argv) {
  const options = {
    paths: [],
    extensions: DEFAULT_EXTENSIONS,
    format: 'compact',
    workers: parseWorkers(process.env.MERMLINT_WORKERS || 'auto'),
    stdin: false,
    name: '<stdin>',
    timing: false,
    help: false,
    version: false,
    cache: true,
    cacheDir: resolve('.mermlint-cache')
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--') {
      options.paths.push(...argv.slice(index + 1));
      break;
    } else if (arg === '--no-cache') {
      options.cache = false;
    } else if (arg === '--cache-dir') {
      const value = argv[++index];
      if (!value || value.startsWith('--')) throw new Error('--cache-dir expects a path.');
      options.cacheDir = resolve(value);
    } else if (arg === '--version' || arg === '-v') {
      options.version = true;
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--stdin') {
      options.stdin = true;
    } else if (arg === '--timing') {
      options.timing = true;
    } else if (arg === '--workers') {
      options.workers = parseWorkers(argv[++index]);
    } else if (arg.startsWith('--workers=')) {
      options.workers = parseWorkers(arg.slice('--workers='.length));
    } else if (arg === '--format') {
      const value = argv[++index];
      if (!['compact', 'json', 'ndjson'].includes(value)) {
        throw new Error(`Unsupported --format "${value}". Expected compact, json, or ndjson.`);
      }
      options.format = value;
    } else if (arg.startsWith('--format=')) {
      const value = arg.slice('--format='.length);
      if (!['compact', 'json', 'ndjson'].includes(value)) {
        throw new Error(`Unsupported --format "${value}". Expected compact, json, or ndjson.`);
      }
      options.format = value;
    } else if (arg === '--name') {
      const value = argv[++index];
      if (!value || value.startsWith('--')) throw new Error('--name expects a label.');
      options.name = value;
    } else if (arg.startsWith('--name=')) {
      options.name = arg.slice('--name='.length) || options.name;
    } else if (arg === '--ext') {
      options.extensions = parseExtensions(argv[++index]);
    } else if (arg.startsWith('--ext=')) {
      options.extensions = parseExtensions(arg.slice('--ext='.length));
    } else if (arg.startsWith('-')) {
      throw new Error(`Unknown option "${arg}".\n\n${usage}`);
    } else {
      options.paths.push(arg);
    }
  }

  if (options.stdin && options.paths.length) throw new Error('Use either --stdin or file paths.');
  if (!options.stdin && options.paths.length === 0 && !options.help && !options.version) {
    options.paths.push('.');
  }

  return options;
}

function parseExtensions(value) {
  if (!value || value.startsWith('--') || value.split(',').some(part => !part.trim())) {
    throw new Error('--ext expects a comma-separated extension list.');
  }
  return new Set(value.split(',').map((extension) => {
    const trimmed = extension.trim().toLowerCase();
    return trimmed.startsWith('.') ? trimmed : `.${trimmed}`;
  }));
}

function parseWorkers(value) {
  if (value === 'auto') {
    return 'auto';
  }
  if (!value) {
    throw new Error('--workers expects "auto" or a positive integer.');
  }
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error('--workers expects "auto" or a positive integer.');
  }
  return parsed;
}

function collectInputs(paths, extensions) {
  const inputs = [];
  const seen = new Set();
  for (const path of paths) {
    const absolute = resolve(path);
    if (!existsSync(absolute)) {
      throw new Error(`Path does not exist: ${path}`);
    }
    collectPath(absolute, extensions, inputs, seen);
  }
  return inputs;
}

function collectPath(path, extensions, inputs, seen) {
  if (seen.has(path)) return;
  seen.add(path);
  const stats = lstatSync(path);
  if (stats.isSymbolicLink()) return;
  if (stats.isDirectory()) {
    const entries = readdirSync(path, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.obsidian' || entry.name === '.mermlint-cache') {
        continue;
      }
      collectPath(join(path, entry.name), extensions, inputs, seen);
    }
    return;
  }

  if (!stats.isFile()) {
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

export function extractSnippets(input) {
  if (input.kind === 'direct' || input.kind === 'stdin' && !looksLikeMarkdown(input.text)) {
    return [{
      source: input.path,
      index: 1,
      startLine: 1,
      startColumn: 1,
      text: stripBom(input.text)
    }].filter((snippet) => snippet.text.trim().length > 0);
  }

  if (MARKDOWN_EXTENSIONS.has(extname(input.path).toLowerCase()) || looksLikeMarkdown(input.text)) {
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
    if (fence.mermaid && fence.lines.join('\n').trim()) {
      snippets.push({ source, index: snippets.length + 1, startLine: fence.startLine,
        startColumn: fence.sourceColumns[0] || 1, sourceColumns: fence.sourceColumns, originalLines: fence.originalLines, text: fence.lines.join('\n'), unclosed: fence.unclosed || false });
    }
    fence = null;
  };
  for (let index=0; index<lines.length; index++) {
    const rawLine=lines[index];
    const quotePrefix=rawLine.match(/^(?: {0,3}> ?)+/)?.[0] || '';
    const line=rawLine.slice(quotePrefix.length);
    if (fence) {
      const close=line.match(/^\s*(`{3,}|~{3,})\s*$/);
      if (close && close[1][0]===fence.marker && close[1].length>=fence.size) finish();
      else { fence.lines.push(line); fence.sourceColumns.push(quotePrefix.length+1); fence.originalLines.push(rawLine); }
      continue;
    }
    const open=line.match(/^(\s*)(`{3,}|~{3,})\s*([A-Za-z0-9_-]+)?[^\S\r\n]*.*$/);
    if (open) fence={ marker:open[2][0], size:open[2].length,
      mermaid:(open[3]||'').toLowerCase()==='mermaid', startLine:index+2, lines:[], sourceColumns:[], originalLines:[] };
  }
  if (fence) { fence.unclosed=true; finish(); }
  return snippets;
}

let mermaidPromise;
export function loadMermaid() {
  return mermaidPromise ||= initializeMermaid();
}

async function initializeMermaid() {
  if (typeof MERMLINT_PARSE_ONLY === 'undefined' || !MERMLINT_PARSE_ONLY) await installDomForMermaid();
  const module = await import('mermaid');
  const mermaid = module.default;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    deterministicIds: true,
    fontFamily: 'monospace'
  });
  return mermaid;
}

async function installDomForMermaid() {
  if (globalThis.window?.document && globalThis.document) {
    return;
  }

  const { parseHTML } = await import('linkedom');
  const { window } = parseHTML('<!doctype html><html><body></body></html>');
  globalThis.window = window;
  globalThis.document = window.document;
  globalThis.Node = window.Node;
  globalThis.Element = window.Element;
  globalThis.HTMLElement = window.HTMLElement;
  globalThis.SVGElement = window.SVGElement;
  Object.defineProperty(globalThis, 'navigator', {
    value: window.navigator,
    configurable: true,
    writable: true
  });
}

async function lintSnippets(snippets, workerSetting) {
  if (snippets.length === 0) {
    return { results: [], workers: 0 };
  }

  const workerCount = resolveWorkerCount(workerSetting, snippets.length);
  if (workerCount <= 1) {
    return {
      results: await lintSnippetsInProcess(snippets),
      workers: 1
    };
  }

  return {
    results: await lintSnippetsWithWorkers(snippets, workerCount),
    workers: workerCount
  };
}

function resolveWorkerCount(workerSetting, snippetCount) {
  if (workerSetting !== 'auto') {
    return Math.min(workerSetting, snippetCount);
  }

  if (snippetCount < 512) {
    return 1;
  }

  const cores = typeof availableParallelism === 'function' ? availableParallelism() : 2;
  return Math.max(1, Math.min(4, cores, Math.ceil(snippetCount / 500)));
}

async function lintSnippetsInProcess(snippets) {
  const results = [];
  const mermaid = await loadMermaid();
  for (const snippet of snippets) results.push(await lintSnippet(snippet, mermaid));

  return results;
}

async function lintSnippetsWithWorkers(snippets, workerCount) {
  const families = new Map();
  const maxBatch = Math.max(1, Math.floor(snippets.length / workerCount));
  for (const [order, snippet] of snippets.entries()) {
    const family = snippet.text.match(/^\s*(?:%%[^\n]*\n\s*)*([A-Za-z][\w-]*)/)?.[1] || '';
    let batches = families.get(family);
    if (!batches) families.set(family, batches = []);
    let group = batches.at(-1);
    // Keep small families together; a large family can fill several workers.
    if (!group || group.items.length === maxBatch) batches.push(group = { weight: 0, items: [] });
    group.items.push({ order, snippet });
    group.weight += estimateParseWeight(snippet);
  }
  const weighted = [...families.values()].flat().sort((left, right) => right.weight - left.weight);
  let next = 0;
  const takeBatch = () => weighted[next++]?.items || null;
  const batches = await Promise.all(Array.from({ length: workerCount }, () => runWorker(takeBatch)));
  return batches
    .flat()
    .sort((left, right) => left.order - right.order)
    .map((item) => item.result);
}

function estimateParseWeight(snippet) {
  return snippet.text.length + snippet.text.split(/\r?\n/).length * 40;
}

function runWorker(takeBatch) {
  return new Promise((resolveWorker, rejectWorker) => {
    const worker = new Worker((existsSync(new URL('./worker.js', import.meta.url)) ? new URL('./worker.js', import.meta.url) : new URL('../worker.js', import.meta.url)), {
      workerData: {}
    });

    worker.on('message', (message) => {
      if (message?.ready || message?.batchFinished) {
        worker.postMessage(takeBatch());
      } else if (message?.error) {
        rejectWorker(new Error(message.error));
      } else {
        resolveWorker(message.results || []);
      }
    });
    worker.on('error', rejectWorker);
    worker.on('exit', (code) => {
      if (code !== 0) {
        rejectWorker(new Error(`Mermaid worker exited with code ${code}`));
      }
    });
  });
}

export async function lintSnippet(snippet, mermaidInstance) {
  const mermaid = mermaidInstance || await loadMermaid();
  const startedAt = performance.now();
  try {
    if (snippet.unclosed) throw new Error('Unclosed Mermaid code fence. Add a matching closing fence.');
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
      source: snippet.source,
      index: snippet.index,
      startLine: snippet.startLine,
      startColumn: snippet.startColumn,
      diagramType: parsed?.diagramType || null,
      elapsedMs: elapsedSince(startedAt)
    };
  } catch (error) {
    return {
      ok: false,
      source: snippet.source,
      index: snippet.index,
      startLine: snippet.startLine,
      startColumn: snippet.startColumn,
      error: normalizeMermaidError(error, snippet),
      elapsedMs: elapsedSince(startedAt)
    };
  }
}

function normalizeMermaidError(error, snippet) {
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
  const snippetLines = snippet.text.split(/\r?\n/);
  const diagramType = detectDiagramKeyword(snippet.text);
  const sourceLines = parserSourceLines(snippet.text, diagramType);
  const parserIndex = clamp(parserLine || 1, 1, Math.max(1, sourceLines.length)) - 1;
  const eof = hash?.token === 'EOF' || hash?.token === 1 || parserLine > sourceLines.length;
  const mapped = (eof ? sourceLines.findLast(item => snippetLines[item.line-1]?.trim()) : sourceLines[parserIndex]) || { line: 1, columnOffset: 0 };
  const relativeLine = mapped.line;
  const lineText = snippetLines[relativeLine - 1] || '';
  const relativeColumn = clamp(eof ? lineText.length + 1 : parserColumn + 1 + mapped.columnOffset, 1, Math.max(1, lineText.length + 1));
  const absoluteLine = snippet.startLine + relativeLine - 1;
  const absoluteColumn = relativeColumn + (snippet.sourceColumns?.[relativeLine-1] || 1) - 1;
  const frame = buildCodeFrame(snippet.originalLines?.join('\n') || snippet.text, relativeLine, absoluteLine, absoluteColumn);
  const found = hash?.token || modern?.image || normalizeFoundToken(token, message);
  const hint = buildRepairHint({
    message,
    found,
    expected: expectedCompact,
    lineText: frame.offendingLine,
    snippet
  });

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
      repairHints: buildRepairHints({
        message,
        found,
        expected: expectedCompact,
        lineText: frame.offendingLine,
        snippet
      }),
      nextActions: [
        `Edit the Mermaid code fence starting at ${snippet.source}:${snippet.startLine}.`,
        `Inspect line ${absoluteLine}, especially near column ${absoluteColumn}.`,
        'Run mermlint again on the same file after patching.'
      ]
    }
  };
}

function strippedParserSource(text, preserveComments = false) {
  let indexed = text.replace(/\r\n?/g, '\n').split('').map((char, index) => ({ char, index }));
  const remove = regex => {
    const value = indexed.map(item => item.char).join('');
    const ranges = [...value.matchAll(regex)].map(match => [match.index, match.index + match[0].length]);
    let range = 0;
    indexed = indexed.filter((_, index) => {
      while (range < ranges.length && index >= ranges[range][1]) range++;
      return range >= ranges.length || index < ranges[range][0];
    });
  };
  remove(/^\s*---\r?\n[\s\S]*?\r?\n\s*---(?:\r?\n|$)/g);
  remove(/%%\{[\s\S]*?\}%%/g);
  if (!preserveComments) {
    remove(/^\s*%%(?!\{)[^\n]+\n?/gm);
    remove(/^\s+/g);
  }
  return indexed;
}
function detectDiagramKeyword(text) {
  return strippedParserSource(text).map(item => item.char).join('').trimStart().match(/^[A-Za-z][A-Za-z0-9-]*/)?.[0] || null;
}
function parserSourceLines(text, diagramType) {
  // Event modeling preserves comments; its positions already include frontmatter offsets.
  const indexed = strippedParserSource(text, diagramType === 'eventmodeling');
  const original = text.replace(/\r\n?/g, '\n');
  const positions = [0];
  for (let i=0; i<original.length; i++) if (original[i]==='\n') positions.push(i+1);
  let line = 0;
  const map = [];
  let newLine = true;
  for (const item of indexed) {
    while (line+1 < positions.length && positions[line+1] <= item.index) line++;
    if (newLine) { map.push({ line: line+1, columnOffset: item.index-positions[line] }); newLine=false; }
    if (item.char === '\n') newLine=true;
  }
  return map;
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

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
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

function buildRepairHint(context) {
  return buildRepairHints(context)[0] || 'Mermaid parser rejected this syntax; inspect the code frame and simplify the statement near the caret.';
}

function buildRepairHints({ message, found, expected, lineText, snippet }) {
  const hints = [];
  const firstLine = detectDiagramKeyword(snippet.text) || snippet.text.trimStart().split(/\r?\n/, 1)[0] || '';
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

function writeReport(format, results, summary) {
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

function looksLikeMarkdown(text) {
  return hasMermaidFence(text);
}

function hasMermaidFence(text) {
  return /(^|\n)[ \t]*(?:>[ \t]*)*(`{3,}|~{3,})\s*mermaid\b/i.test(text);
}

function readStdin() {
  input.setEncoding('utf8');
  let data = '';
  return new Promise((resolveInput, rejectInput) => {
    input.on('data', (chunk) => {
      data += chunk;
    });
    input.on('end', () => resolveInput(data));
    input.on('error', rejectInput);
  });
}

function stripBom(text) {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

function stripAnsi(text) {
  return text.replace(/\u001b\[[0-9;]*m/g, '');
}

function firstLine(text) {
  return text.split(/\r?\n/)[0];
}

function elapsedSince(startedAt) {
  return Math.round((performance.now() - startedAt) * 1000) / 1000;
}
