// Same merge semantics as Mermaid 12.1.0's assignWithDepth, with fewer allocations
// and ordinary assignments for keys that cannot invoke inherited setters.
// Mermaid's MIT license is included in dist/THIRD_PARTY_NOTICES.txt.
export function fastAssignWithDepth(dst, src, { depth = 2 } = {}) {
  if (Array.isArray(src)) {
    if (Array.isArray(dst)) {
      for (const value of src) if (!dst.includes(value)) dst.push(value);
    } else {
      for (const value of src) fastAssignWithDepth(dst, value, { depth });
    }
    return dst;
  }
  if (dst == null || depth <= 0) {
    return dst != null && typeof dst === 'object' && typeof src === 'object' ? Object.assign(dst, src) : src;
  }
  if (src == null || typeof dst !== 'object' || typeof src !== 'object') return dst;
  for (const key of Object.keys(src)) {
    const value = src[key];
    if (typeof value === 'object') {
      if (value === null) continue;
      if (key in dst && !Object.hasOwn(dst, key)) Object.defineProperty(dst, key, { value: undefined, writable: true, enumerable: true, configurable: true });
      if (dst[key] === undefined) dst[key] = Array.isArray(value) ? [] : {};
      if (typeof dst[key] === 'object') dst[key] = fastAssignWithDepth(dst[key], value, { depth: depth - 1 });
    } else if (typeof dst[key] !== 'object') {
      put(dst, key, value);
    }
  }
  return dst;
}
function put(dst, key, value) {
  if (key in dst && !Object.hasOwn(dst, key)) {
    Object.defineProperty(dst, key, { value, writable: true, enumerable: true, configurable: true });
  } else dst[key] = value;
}
