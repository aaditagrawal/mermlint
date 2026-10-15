import { resolve } from 'node:path';

const DEFAULT_EXTENSIONS = ['.md', '.markdown', '.mmd', '.mermaid'];

export const usage = `Usage:
  mermlint [paths...] [--format compact|json|ndjson] [--workers auto|N] [--timing] [--no-cache] [--cache-dir PATH]
  mermlint install-skill [--claude|--codex|--project|--dir PATH] [--force]
  mermlint --stdin [--name label] [--format compact|json|ndjson]

Examples:
  mermlint notes.md
  mermlint vault/ --format json
  mermlint vault/ --workers 4 --format json
  pbpaste | mermlint --stdin --name clipboard.mmd
`;

export function parseArgs(argv) {
  const options = {
    paths: [],
    extensions: new Set(DEFAULT_EXTENSIONS),
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
