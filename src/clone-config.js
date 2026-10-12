// Mermaid's getConfig merges into a fresh object at depth two. This specializes
// that case: no destination lookups, recursive merge, or per-property helper.
// Keep a fresh copy on every call because diagram initializers can mutate it.
function cloneArray(source) {
  const seen = new Set();
  const result = [];
  // Match includes-based deduplication while retaining the first value's -0.
  for (const value of source) if (!seen.has(value)) { seen.add(value); result.push(value); }
  return result;
}

export function cloneConfig(source, depth = 2) {
  const result = {};
  if (depth === 0) return Object.assign(result, source);
  for (const key of Object.keys(source)) {
    const value = source[key];
    if (value === null) continue;
    const copy = typeof value !== 'object' ? value
      : Array.isArray(value) ? cloneArray(value) : cloneConfig(value, depth - 1);
    if (key === '__proto__') Object.defineProperty(result, key, { value: copy, writable: true, enumerable: true, configurable: true });
    else result[key] = copy;
  }
  return result;
}

// Each public read remains an isolated, writable config copy, but most parser
// reads only inspect securityLevel or one diagram section. Copy those on access.
// Mermaid replaces currentConfig on updates; this captures that immutable revision.
export function lazyConfigCopy(source) {
  const target = {};
  const resolved = new Set();
  const removed = new Set();
  const materialize = key => {
    if (resolved.has(key)) return;
    resolved.add(key);
    if (typeof key !== 'string' || !Object.hasOwn(source, key) || source[key] === null) return;
    const value = source[key];
    const copy = typeof value !== 'object' ? value
      : Array.isArray(value) ? cloneArray(value) : cloneConfig(value, 1);
    Object.defineProperty(target, key, { value: copy, writable: true, enumerable: true, configurable: true });
  };
  return new Proxy(target, {
    get(target, key, receiver) { materialize(key); return Reflect.get(target, key, receiver); },
    set(target, key, value) { materialize(key); return Reflect.set(target, key, value); },
    has(target, key) { materialize(key); return Reflect.has(target, key); },
    deleteProperty(target, key) {
      materialize(key);
      const deleted = Reflect.deleteProperty(target, key);
      if (deleted) removed.add(key);
      return deleted;
    },
    defineProperty(target, key, descriptor) { materialize(key); return Reflect.defineProperty(target, key, descriptor); },
    getOwnPropertyDescriptor(target, key) { materialize(key); return Reflect.getOwnPropertyDescriptor(target, key); },
    ownKeys(target) {
      const original = Object.keys(source).filter(key => source[key] !== null && !removed.has(key));
      for (const key of original) materialize(key);
      const retained = original.filter(key => Object.hasOwn(target, key));
      const known = new Set(retained);
      const keys = [...retained, ...Reflect.ownKeys(target).filter(key => !known.has(key))];
      const isIndex = key => typeof key === 'string' && String(key >>> 0) === key && key !== '4294967295';
      return keys.sort((left, right) => isIndex(left) ? isIndex(right) ? Number(left) - Number(right) : -1 : isIndex(right) ? 1 : 0);
    },
    preventExtensions(target) { for (const key of Object.keys(source)) materialize(key); return Reflect.preventExtensions(target); }
  });
}
