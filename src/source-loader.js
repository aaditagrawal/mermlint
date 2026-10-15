// Keep source execution on the unmodified upstream engine without introducing
// a DOM implementation. This hook is never registered by the bundled runtime.
const sanitizerUrl = new URL('./parse-only-sanitizer.js', import.meta.url).href;

export function resolve(specifier, context, nextResolve) {
  if (specifier === 'dompurify' && context.parentURL?.includes('/mermaid/dist/')) {
    return { url: sanitizerUrl, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}
