import packageInfo from '../package.json' with { type: 'json' };
import { performance } from 'node:perf_hooks';
import { stdout, stderr } from 'node:process';
import { installSkill } from './install-skill.js';
import { profileMark, profileReport } from './profile.js';
import { parseArgs, usage } from './options.js';
import { collectInputs, readStdin } from './inputs.js';
import { lintInputs } from './project.js';
import { writeReport } from './report.js';

// Preserve the source module's existing entry points for programmatic callers.
export { parseArgs } from './options.js';
export { extractSnippets } from './snippets.js';
export { loadMermaid } from './engine.js';
export { lintSnippet } from './lint.js';

export async function main(argv) {
  if (argv[0] === 'install-skill') {
    stdout.write(`Installed mermaid-linter at ${installSkill(argv.slice(1))}\n`);
    return;
  }
  const startedAt = performance.now();
  const options = parseArgs(argv);

  if (options.version) {
    stdout.write(`${packageInfo.version}\n`);
    return;
  }
  if (options.help) {
    stdout.write(usage);
    return;
  }

  const inputs = options.stdin
    ? [{ path: options.name, kind: 'stdin', text: await readStdin() }]
    : collectInputs(options.paths, options.extensions);
  profileMark('discoveryAndRead');

  const { results, workers, cachedFiles, cachedSnippets, parsedSnippets } = await lintInputs(inputs, options);

  const errors = results.reduce((count, result) => count + Number(!result.ok), 0);
  const summary = {
    ok: errors === 0,
    files: inputs.length,
    snippets: results.length,
    errors,
    workers,
    cachedFiles,
    cachedSnippets,
    elapsedMs: Math.round((performance.now() - startedAt) * 1000) / 1000
  };
  profileMark('assemblyAndCacheWrite');

  writeReport(options.format, results, summary);
  profileMark('report');
  profileReport({ snippets: parsedSnippets, workers });

  if (options.timing && options.format === 'compact') {
    stderr.write(`Checked ${summary.snippets} snippet(s) in ${summary.elapsedMs}ms across ${summary.files} file(s).\n`);
  }

  process.exitCode = summary.ok ? 0 : 1;
}
