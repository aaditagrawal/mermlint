/* A Hairline figure for mermlint. Build with the hairline-create skill's build.mjs.
 * Sheets, a sliding platen, guide posts, and a handwheel make one inspection
 * press. Resting sheet positions are also the pointer's immutable hit targets.
 */
const {
  Cam, facing, fit, proj, rings, prism, seg, solid, put, mk,
  tween, tset, tval, tdone, pointer, register, disposer,
} = HL;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.25);
  fit(C, [[-58, 0, 0], [184, 0, 0], [-58, 96, 0], [184, 96, 0], [70, 10, 100], [110, 84, 100]], 200, 166);
  const P = proj(C), front = facing(C);
  const scene = mk('g', {}, svg);
  let strength = value, active = -1;

  function block(parent, x0, y0, x1, y1, radius, bottom, top) {
    const [ring, inner] = rings(x0, y0, x1, y1, radius, 0.8);
    const shape = solid(parent);
    const draw = (lo, hi) => put(shape, prism(P, front, ring, inner, lo, hi));
    draw(bottom, top);
    return { shape, draw };
  }

  block(scene, -58, 0, 184, 96, 8, -5, 0);
  block(scene, -51, 18, 176, 78, 5, 0, 4);
  const parts = [];
  const add = (depth, build) => parts.push({ depth, build });
  const stages = [
    { name: 'source', x: -28, y: 48, z: 15, sheets: 3 },
    { name: 'extract', x: 27, y: 48, z: 29, sheets: 3 },
    { name: 'syntax', x: 90, y: 48, z: 35, sheets: 1 },
    { name: 'report', x: 150, y: 48, z: 16, sheets: 2 },
  ];
  const paper = (parent, x, y, z, lines) => {
    const body = block(parent, x - 21, y - 22, x + 21, y + 22, 2.8, z, z + 1.2);
    const rules = mk('path', { class: 'nf lo' }, parent);
    let drawn;
    return {
      shape: body.shape,
      draw(height) {
        if (height === drawn) return;
        drawn = height;
        body.draw(height, height + 1.2);
        rules.setAttribute('d', Array.from({ length: lines }, (_, i) => {
          const yy = y - 13 + i * 7;
          return seg(P(x - 13, yy, height + 1.3), P(x + (i % 2 ? 6 : 13), yy, height + 1.3));
        }).join(''));
      },
    };
  };

  stages.forEach((item, index) => {
    item.motion = tween(0);
    item.last = NaN;
    item.hit = P(item.x, item.y, item.z);
    add(item.x + item.y, () => {
      const group = mk('g', { 'data-stage': item.name }, scene);
      item.cards = [];
      for (let j = 0; j < item.sheets; j++) {
        const shift = j - (item.sheets - 1) / 2;
        const z = index === 1 ? 9 + j * 9 : 7 + j * 3;
        const sheet = paper(group, item.x + shift * 2, item.y + shift * 2, z, index === 3 ? 3 : 4);
        item.cards.push({ sheet, z, share: (j + 1) / item.sheets });
      }
      item.highlight = item.cards.at(-1).sheet.shape.sil;
      if (index === 2) {
        item.platen = block(group, 65, 22, 115, 74, 4, 31, 35);
        item.stem = block(group, 87, 45, 93, 51, 2, 35, 86);
        item.highlight = item.platen.shape.sil;
      }
    });
  });

  add(103, () => block(scene, 82, 8, 98, 19, 3.8, 4, 78));
  add(140, () => {
    block(scene, 66, 7, 114, 89, 5, 77, 85);
    block(scene, 81, 39, 99, 57, 9, 85, 91);
    block(scene, 86, 44, 94, 52, 4, 91, 94);
  });
  add(174, () => block(scene, 82, 77, 98, 89, 3.8, 4, 78));
  parts.sort((a, b) => a.depth - b.depth).forEach(part => part.build());

  function draw(item, lift) {
    if (item.last === lift) return;
    item.last = lift;
    for (const { sheet, z, share } of item.cards) sheet.draw(z + lift * share);
    if (item.platen) {
      item.platen.draw(31 + lift, 35 + lift);
      item.stem.draw(35 + lift, 86);
    }
  }
  stages.forEach(item => draw(item, 0));
  stages[2].highlight.classList.add('hi');
  read.textContent = 'rest';

  const loop = register(stage, (_dt, now) => {
    let moving = false;
    for (const item of stages) {
      draw(item, tval(item.motion, now));
      if (!tdone(item.motion, now)) moving = true;
    }
    return moving;
  });
  bag.add(loop.unregister);

  function choose(next) {
    if (next === active) return;
    const from = next < 0 ? active : next;
    const now = performance.now();
    active = next;
    stages.forEach((item, index) => {
      const distance = Math.abs(index - from);
      const lift = next < 0 ? 0 : index === next ? strength : strength * 0.16 / distance;
      tset(item.motion, lift, now, distance * 40);
      item.highlight.classList.toggle('hi', index === (next < 0 ? 2 : next));
    });
    read.textContent = next < 0 ? 'rest' : stages[next].name;
    loop.wake();
  }

  function hit(point) {
    let nearest = -1, distance = 36;
    stages.forEach((item, index) => {
      const d = Math.hypot(point[0] - item.hit[0], point[1] - item.hit[1]);
      if (d < distance) { nearest = index; distance = d; }
    });
    return nearest;
  }
  bag.add(pointer(stage, { move: point => choose(hit(point)), leave: () => choose(-1) }));
  bag.add(() => svg.replaceChildren());
  return {
    set(v) {
      strength = v;
      if (active >= 0) { const selected = active; active = -1; choose(selected); }
    },
    destroy: bag.dispose,
  };
}

hairline({
  name: 'inspection-press',
  means: 'Source sheets open beneath an inspection press, then leave as a report. Hover to follow a diagram through the linter.',
  rules: [1, 2, 4, 7, 9],
  range: [8, 16, 26],
  tour: [[120, 133], [224, 164], [277, 211], null],
  mount,
});
