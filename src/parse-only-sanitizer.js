// Mermaid sanitizes labels for SVG/HTML output even in parse(). This CLI never
// renders or attaches event handlers. Keep label text intact while checking the
// upstream grammar and diagram DB, without constructing a DOM for every label.
// This module is a build-only alias for dompurify; never use it for rendering.
const sanitizer = {
  sanitize: value => String(value),
  addHook() {},
  removeHook() {},
  removeAllHooks() {},
  isSupported: true
};
export default sanitizer;
