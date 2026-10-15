// Track UTF-16 offsets only when preprocessing removes text. Most diagrams need
// no mapping array, and errors never allocate an object for every character.
function stripSource(original, preserveComments) {
  let text = original;
  let offsets;

  const remove = pattern => {
    const matches = [...text.matchAll(pattern)];
    if (matches.length === 0) return;
    const removed = matches.reduce((sum, match) => sum + match[0].length, 0);
    const nextOffsets = new Uint32Array(text.length - removed);
    const parts = [];
    let read = 0;
    let written = 0;

    const keep = end => {
      parts.push(text.slice(read, end));
      if (offsets) nextOffsets.set(offsets.subarray(read, end), written);
      else for (let index = read; index < end; index++) nextOffsets[written + index - read] = index;
      written += end - read;
    };
    for (const match of matches) {
      keep(match.index);
      read = match.index + match[0].length;
    }
    keep(text.length);
    text = parts.join('');
    offsets = nextOffsets;
  };

  remove(/^\s*---\n[\s\S]*?\n\s*---(?:\n|$)/g);
  remove(/%%\{[\s\S]*?\}%%/g);
  if (!preserveComments) {
    remove(/^\s*%%(?!\{)[^\n]+\n?/gm);
    remove(/^\s+/g);
  }
  return { text, offsets };
}

export function analyzeSource(source) {
  const original = source.replace(/\r\n?/g, '\n');
  let stripped = stripSource(original, false);
  const diagramType = stripped.text.trimStart().match(/^[A-Za-z][A-Za-z0-9-]*/)?.[0] || null;
  // Event modeling preserves comments and includes frontmatter offsets.
  if (diagramType === 'eventmodeling') stripped = stripSource(original, true);

  const positions = [0];
  for (let index = original.indexOf('\n'); index !== -1; index = original.indexOf('\n', index + 1)) {
    positions.push(index + 1);
  }
  const lines = [];
  let line = 0;
  let start = 0;
  while (start < stripped.text.length) {
    const offset = stripped.offsets ? stripped.offsets[start] : start;
    while (line + 1 < positions.length && positions[line + 1] <= offset) line++;
    lines.push({ line: line + 1, columnOffset: offset - positions[line] });
    const end = stripped.text.indexOf('\n', start);
    if (end === -1) break;
    start = end + 1;
  }
  return { diagramType, lines };
}
