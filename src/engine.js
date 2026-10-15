let mermaidPromise;
export function loadMermaid() {
  return mermaidPromise ||= initializeMermaid();
}

async function initializeMermaid() {
  if (typeof MERMLINT_PARSE_ONLY === 'undefined' || !MERMLINT_PARSE_ONLY) {
    // Source execution uses upstream parsers/configuration with the same
    // parse-only sanitizer as the bundle. No browser DOM is needed.
    const { register } = await import('node:module');
    register('./source-loader.js', import.meta.url);
  }
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
