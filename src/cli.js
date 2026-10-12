import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { availableParallelism } from 'node:os';
import { extname, join, resolve } from 'node:path';
import { performance } from 'node:perf_hooks';
import { stdin as input, stdout, stderr } from 'node:process';
import { Worker } from 'node:worker_threads';

const DEFAULT_EXTENSIONS = new Set(['.md', '.markdown', '.mmd', '.mermaid']);
const DIRECT_EXTENSIONS = new Set(['.mmd', '.mermaid']);
const MARKDOWN_EXTENSIONS = new Set(['.md', '.markdown']);

const usage = `Usage:
  mermlint [paths...] [--format compact|json|ndjson] [--workers auto|N] [--timing]
  mermlint --stdin [--name label] [--format compact|json|ndjson]

Examples:
  mermlint notes.md
  mermlint vault/ --format json
  mermlint vault/ --workers 4 --format json
  pbpaste | mermlint --stdin --name clipboard.mmd
`;

export async function main(argv) {
  const startedAt = performance.now();
  const options = parseArgs(argv);

  if (options.help) {
    stdout.write(usage);
    return;
  }

  const inputs = options.stdin
    ? [{ path: options.name, kind: 'stdin', text: await readStdin() }]
    : collectInputs(options.paths, options.extensions);

  const snippets = [];
  for (const item of inputs) {
    snippets.push(...extractSnippets(item));
  }

  const { results, workers } = await lintSnippets(snippets, options.workers);

  const errored = results.filter((result) => !result.ok);
  const summary = {
    ok: errored.length === 0,
    files: inputs.length,
    snippets: results.length,
    errors: errored.length,
    workers,
    elapsedMs: Math.round((performance.now() - startedAt) * 1000) / 1000
  };

  writeReport(options.format, results, summary);

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
    help: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--help' || arg === '-h') {
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
      options.name = argv[++index] || options.name;
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

  if (!options.stdin && options.paths.length === 0 && !options.help) {
    options.paths.push('.');
  }

  return options;
}

function parseExtensions(value) {
  if (!value) {
    throw new Error('--ext expects a comma-separated extension list.');
  }
  return new Set(value.split(',').map((extension) => {
    const trimmed = extension.trim();
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
  for (const path of paths) {
    const absolute = resolve(path);
    if (!existsSync(absolute)) {
      throw new Error(`Path does not exist: ${path}`);
    }
    collectPath(absolute, extensions, inputs);
  }
  return inputs;
}

function collectPath(path, extensions, inputs) {
  const stats = statSync(path);
  if (stats.isDirectory()) {
    const entries = readdirSync(path, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.obsidian') {
        continue;
      }
      collectPath(join(path, entry.name), extensions, inputs);
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
      text: stripBom(input.text).trim()
    }].filter((snippet) => snippet.text.length > 0);
  }

  if (MARKDOWN_EXTENSIONS.has(extname(input.path).toLowerCase()) || looksLikeMarkdown(input.text)) {
    return extractMarkdownMermaidFences(input.path, input.text);
  }

  return [];
}

function extractMarkdownMermaidFences(source, text) {
  if (!hasMermaidFence(text)) {
    return [];
  }

  const snippets = [];
  const lines = stripBom(text).split(/\r?\n/);
  let fence = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const open = line.match(/^(\s*)(`{3,}|~{3,})\s*([A-Za-z0-9_-]+)?[^\S\r\n]*.*$/);

    if (!fence && open) {
      const language = (open[3] || '').toLowerCase();
      if (language === 'mermaid') {
        fence = {
          marker: open[2][0],
          size: open[2].length,
          startLine: index + 2,
          lines: []
        };
      }
      continue;
    }

    if (fence) {
      const close = line.match(/^(\s*)(`{3,}|~{3,})\s*$/);
      if (close && close[2][0] === fence.marker && close[2].length >= fence.size) {
        const snippetText = fence.lines.join('\n').trim();
        if (snippetText.length > 0) {
          snippets.push({
            source,
            index: snippets.length + 1,
            startLine: fence.startLine,
            startColumn: 1,
            text: snippetText
          });
        }
        fence = null;
      } else {
        fence.lines.push(line);
      }
    }
  }

  return snippets;
}

export async function loadMermaid() {
  await installDomForMermaid();
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

  if (snippetCount < 256) {
    return 1;
  }

  const cores = typeof availableParallelism === 'function' ? availableParallelism() : 2;
  return Math.max(1, Math.min(6, cores, Math.ceil(snippetCount / 250)));
}

async function lintSnippetsInProcess(snippets) {
  const results = [];
  const okCache = new Map();
  const mermaid = await loadMermaid();

  for (const snippet of snippets) {
    const cached = okCache.get(snippet.text);
    if (cached) {
      results.push({
        ok: true,
        source: snippet.source,
        index: snippet.index,
        startLine: snippet.startLine,
        startColumn: snippet.startColumn,
        diagramType: cached.diagramType,
        elapsedMs: 0
      });
      continue;
    }

    const result = await lintSnippet(snippet, mermaid);
    if (result.ok) {
      okCache.set(snippet.text, { diagramType: result.diagramType });
    }
    results.push(result);
  }

  return results;
}

async function lintSnippetsWithWorkers(snippets, workerCount) {
  const shards = Array.from({ length: workerCount }, () => ({ weight: 0, items: [] }));
  const weighted = snippets
    .map((snippet, order) => ({ order, snippet, weight: estimateParseWeight(snippet) }))
    .sort((left, right) => right.weight - left.weight);

  for (const item of weighted) {
    let lightest = shards[0];
    for (let index = 1; index < shards.length; index += 1) {
      if (shards[index].weight < lightest.weight) {
        lightest = shards[index];
      }
    }
    lightest.items.push({ order: item.order, snippet: item.snippet });
    lightest.weight += item.weight;
  }

  const batches = await Promise.all(shards.map((shard) => shard.items).filter((shard) => shard.length > 0).map(runWorker));
  return batches
    .flat()
    .sort((left, right) => left.order - right.order)
    .map((item) => item.result);
}

function estimateParseWeight(snippet) {
  return snippet.text.length + snippet.text.split(/\r?\n/).length * 40;
}

function runWorker(shard) {
  return new Promise((resolveWorker, rejectWorker) => {
    const worker = new Worker(new URL('./worker.js', import.meta.url), {
      workerData: { shard }
    });

    worker.on('message', (message) => {
      if (message?.error) {
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
    const parsed = await mermaid.mermaidAPI.parse(snippet.text, { suppressErrors: false });
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
  const token = hash?.token || hash?.loc || {};
  const fallback = parseLocationFromMessage(error?.str || error?.message || '');
  const parserLine = Number(token.first_line ?? token.line ?? fallback.line ?? 0);
  const parserColumn = Number(token.first_column ?? token.column ?? fallback.column ?? 0);
  const expected = Array.isArray(hash?.expected) ? hash.expected : [];
  const expectedCompact = expected.map(cleanExpectedToken).filter(Boolean);
  const message = stripAnsi(error?.str || error?.message || String(error)).replace(/\s+$/g, '');
  const snippetLines = snippet.text.split(/\r?\n/);
  const relativeLine = clamp(parserLine || 1, 1, Math.max(1, snippetLines.length));
  const lineText = snippetLines[relativeLine - 1] || '';
  const relativeColumn = clamp(parserColumn > 0 ? parserColumn + 1 : 1, 1, Math.max(1, lineText.length + 1));
  const absoluteLine = snippet.startLine + relativeLine - 1;
  const absoluteColumn = relativeColumn;
  const frame = buildCodeFrame(snippet.text, relativeLine, absoluteLine, absoluteColumn);
  const found = normalizeFoundToken(token, message);
  const hint = buildRepairHint({
    message,
    found,
    expected: expectedCompact,
    lineText: frame.offendingLine,
    snippet
  });

  return {
    message,
    line: absoluteLine,
    column: absoluteColumn,
    relativeLine,
    relativeColumn: absoluteColumn,
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
        relativeColumn: absoluteColumn
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

function parseLocationFromMessage(message) {
  const lineMatch = message.match(/Parse error on line (\d+)/i);
  const caretLine = message.split(/\r?\n/).find((line) => line.includes('^'));
  const column = caretLine ? caretLine.indexOf('^') + 1 : 0;
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
  const firstLine = snippet.text.split(/\r?\n/, 1)[0]?.trim() || '';
  const lowerMessage = message.toLowerCase();
  const lowerLine = lineText.toLowerCase();

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
  return /(^|\n)(`{3,}|~{3,})\s*mermaid\b/i.test(text);
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
