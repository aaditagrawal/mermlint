import { performance } from 'node:perf_hooks';
import { threadId } from 'node:worker_threads';

// Opt-in wall-time marks complement --cpu-prof, whose samples include workers.
const phases = process.env.MERMLINT_PROFILE === '1' ? {} : null;
let previous = performance.now();
export function profileMark(name) {
  if (!phases) return;
  const now = performance.now();
  phases[name] = Math.round((now - previous) * 1000) / 1000;
  previous = now;
}
export function profileReport(extra = {}) {
  if (phases) process.stderr.write(JSON.stringify({ mermlintProfile: { threadId, phases, ...extra } }) + '\n');
}
