// 01 · Foundations — colour (dark + light, with contrast), primitives, group and service accents, type, space, radius,
// effects, grid and the Icon component set. Every swatch is bound to its variable.
SW.ROLES = ['bg', 'surface', 'surface-2', 'border', 'border-subtle', 'border-control', 'fg', 'fg-muted', 'fg-subtle', 'accent', 'accent-fg', 'accent-text',
  'accent-2', 'accent-2-fg', 'accent-2-text', 'success', 'warning', 'danger', 'info', 'ring'];
// contrast pair of each role (WCAG: text 4.5:1, UI parts 3:1)
SW.PAIR = { fg: 'bg', 'fg-muted': 'bg', 'fg-subtle': 'bg', accent: 'bg', 'accent-fg': 'accent', 'accent-text': 'bg', 'accent-2': 'bg', 'accent-2-fg': 'accent-2',
  'accent-2-text': 'bg', success: 'bg', warning: 'bg', danger: 'bg', info: 'bg', ring: 'bg', 'border-control': 'bg' };
SW.FAMILIES = ['zinc', 'graphite', 'indigo', 'violet', 'emerald', 'amber', 'red', 'blue', 'pink', 'teal'];

SW.swatch = async (m, role) => { const v = SW.r(m, role), hx = SW.hex[v] || '';
  const cell = SW.col(10, { w: 176, name: v });
  const sw = SW.rect(176, 88, v, null, 'sm'); sw.name = 'swatch'; SW.s(sw, SW.r(m, 'border'));
  const ref = (((SW.tok.collections.theme[v] || {}).value) || '').replace(/[{}]/g, '');
  SW.add(cell, sw, await SW.t(role, 'text/sm-strong', SW.r(m, 'fg'), { name: 'role' }), await SW.t(hx + '  ·  ' + ref, 'display/label-sm', SW.r(m, 'fg-subtle'), { name: 'value' }));
  const pair = SW.PAIR[role];
  if (pair) { const r = SW.ratio(hx, SW.hex[SW.r(m, pair)]), g = SW.grade(r), ok = role === 'border-control' || role === 'ring' ? r >= 3 : r >= 4.5;
    const row = SW.row(8, { name: 'contrast' });
    SW.add(row, SW.dot(6, SW.r(m, ok ? 'success' : 'danger')), await SW.t(r.toFixed(2) + ':1 ' + g + ' on ' + pair, 'text/xs', SW.r(m, 'fg-muted'), { name: 'ratio' }));
    SW.add(cell, row); }
  return cell; };

SW.section({ name: '01 · Foundations', page: PG.D, run: async () => {
  const s = h.section('01 · Foundations');
  const b = SW.board('01 / Foundations', SW.W, 'dark'); const IN = SW.W - 192;
  SW.add(b, await SW.header('01', 'Foundations', 'Colour, type, space, radius, effects, grid and icons. Every swatch and every text on this board is bound to a variable or a text style. Change the token, not the layer.'));

  // colour: theme roles, dark + light, with contrast
  const col = SW.col(32, { name: 'Colour' }); SW.put(b, col, true);
  SW.add(col, await SW.block('Colour · theme roles', 'Two modes, twenty roles', 'Variables theme · dark/<role> and light/<role>, aliased to primitives. The Starter plan has one variable mode, so the mode is part of the name. Ratios are WCAG 2.2: text needs 4.5:1, borders and rings 3:1.'));
  for (const m of ['dark', 'light']) {
    const p = SW.panel(m, { gap: 28, pad: 40, name: 'Theme / ' + m, fill: SW.r(m, 'bg') });
    const ph = SW.row(12); SW.add(ph, await SW.label('// data-mode="' + m + '"', SW.r(m, 'accent-2-text')), await SW.label(m === 'dark' ? 'code-context dashboard' : 'velimir-mueller.de', SW.r(m, 'fg-subtle')));
    const grid = SW.row(20, { wrap: true, wrapGap: 32, w: IN - 80, name: 'roles', align: 'MIN' });
    for (const role of SW.ROLES) SW.add(grid, await SW.swatch(m, role));
    SW.add(p, ph, grid); SW.put(col, p, true); }

  // primitives
  const prim = SW.panel('dark', { gap: 18, pad: 40, name: 'Primitives' }); SW.put(b, prim, true);
  SW.add(prim, await SW.block('Colour · primitives', '63 primitives, hidden from the pickers', 'The only place a hex value may live. Layers never use them directly: they use a theme role. Scopes are empty, so they do not show in the fill picker.'));
  const P = Object.keys(SW.tok.collections.primitives).filter(n => !/\//.test(n));
  for (const fam of [...SW.FAMILIES, 'base']) { const names = fam === 'base' ? P.filter(n => !/-\d+$/.test(n)) : P.filter(n => n.startsWith(fam + '-'));
    const row = SW.row(12, { name: 'family/' + fam, align: 'MIN' }); SW.add(row, await SW.label(fam, 'dark/fg-subtle', { w: 120 }));
    for (const n of names) { const c = SW.col(6, { name: n }); const r = SW.rect(80, 44, n, null, 6); r.name = 'chip'; SW.s(r, 'dark/border');
      SW.add(c, r, await SW.t(n.replace(fam + '-', ''), 'display/label-sm', 'dark/fg-muted')); SW.add(row, c); }
    SW.add(prim, row); }
  const brand = SW.row(12, { name: 'brand', align: 'MIN' }); SW.add(brand, await SW.label('brand', 'dark/fg-subtle', { w: 120 }));
  for (const n of Object.keys(SW.tok.collections.primitives).filter(x => /^brand\//.test(x))) { const c = SW.col(6, { name: n });
    const r = SW.rect(80, 44, n, null, 6); r.name = 'chip'; SW.s(r, 'dark/border'); SW.add(c, r, await SW.t(n.slice(6), 'display/label-sm', 'dark/fg-muted')); SW.add(brand, c); }
  SW.add(prim, brand);

  // group + service accents
  const acc = SW.col(28, { name: 'Accents' }); SW.put(b, acc, true);
  SW.add(acc, await SW.block('Colour · group and service accents', 'data-group and data-service', 'A group changes accent-2, accent-2-fg, accent-2-text and ring only. Flagship is the default and equals the theme values. A service changes the service accent only. Emerald stays status.'));
  const gr = SW.row(24, { name: 'groups', align: 'MIN' });
  for (const [g, who] of [['flagship', 'synthwerk family · default'], ['lab', 'personal side projects'], ['ops', 'private tools'], ['venture', 'private-income products']]) {
    const c = SW.panel('dark', { gap: 0, pad: 0, w: 332, clip: true, name: 'group/' + g });
    const top = SW.row(0, { name: 'swatches' });
    const f = SW.rect(166, 112, g + '/fill'); f.name = g + '/fill'; const d = SW.rect(83, 112, g + '/dark/accent'); d.name = g + '/dark/accent';
    const l = SW.rect(83, 112, g + '/light/accent'); l.name = g + '/light/accent'; SW.add(top, f, d, l);
    const meta = SW.col(8, { pad: [20, 24], name: 'meta' });
    SW.add(meta, await SW.t(g, 'display/xl', 'dark/fg'), await SW.t(who, 'text/sm', 'dark/fg-muted'),
      await SW.t('fill ' + SW.hex[g + '/fill'] + '  ·  dark ' + SW.hex[g + '/dark/accent'] + '  ·  light ' + SW.hex[g + '/light/accent'], 'display/label-sm', 'dark/fg-subtle'));
    SW.add(c, top); SW.put(c, meta, true); SW.add(gr, c); }
  SW.add(acc, gr);
  const sv = SW.row(16, { name: 'services', wrap: true, w: IN });
  for (const svc of ['studio', 'llm', 'vision', 'pulse', 'identity', 'widgets']) {
    const c = SW.panel('dark', { gap: 12, pad: 20, w: 220, name: 'service/' + svc });
    const sw = SW.row(0, { name: 'pair', r: 'sm', clip: true }); SW.add(sw, SW.rect(90, 40, 'service/' + svc + '/dark'), SW.rect(90, 40, 'service/' + svc + '/light'));
    SW.add(c, sw, await SW.t(svc, 'text/sm-strong', 'dark/fg'), await SW.t(SW.hex['service/' + svc + '/dark'] + ' / ' + SW.hex['service/' + svc + '/light'], 'display/label-sm', 'dark/fg-subtle'));
    SW.add(sv, c); }
  SW.add(acc, sv);

  // type
  const type = SW.panel('dark', { gap: 0, pad: 0, name: 'Type', clip: true }); SW.put(b, type, true);
  const th = SW.col(12, { pad: [32, 40], name: 'type-head' });
  SW.add(th, await SW.block('Type', 'Space Mono, Inter, JetBrains Mono', 'Space Mono: wordmark, display, labels and pills. Inter: body and controls. JetBrains Mono: code, logs and diffs. Sizes and line heights are the token text scale (px). 7xl and 9xl are Figma-only steps for heroes and banners.'));
  SW.put(type, th, true);
  const samples = { display: 'SYNTHWERK.', heading: 'One source. No drift.', text: 'Tokens feed Figma and code. A change starts in the tokens, never in a layer.',
    mono: '$ npm i @synthwerk/tokens  // 0.2.0', 'display/label': 'Live · Flagship · TypeScript' };
  for (const [name, d] of Object.entries(SW.tok.text)) {
    const row = SW.row(40, { pad: [20, 40], name: 'style/' + name, stroke: 'dark/border-subtle' }); SW.sides(row, 1, 0, 0, 0);
    const meta = SW.col(4, { w: 300, name: 'meta' });
    SW.add(meta, await SW.t(name, 'text/sm-strong', 'dark/fg'), await SW.t(d.family + ' ' + d.style + ' · ' + d.size + '/' + parseFloat(d.lineHeight) + (d.letterSpacing ? ' · ' + d.letterSpacing + ' %' : ''), 'display/label-sm', 'dark/fg-subtle'));
    const key = /^display\/label/.test(name) ? 'display/label' : name.split('/')[0];
    const sample = await SW.t(samples[key], name, 'dark/fg', { name: 'sample' });
    SW.add(row, meta, sample); SW.put(type, row, true); }

  // space, radius, effects
  const r3 = SW.row(24, { name: 'Space, radius, effects', align: 'MIN' }); SW.put(b, r3, true);
  const sp = SW.panel('dark', { gap: 14, w: 448, name: 'Space' });
  SW.add(sp, await SW.label('// Space · 4 px unit', 'dark/accent-2-text'));
  for (const [px, v] of Object.entries(SW.SPACE)) { const r = SW.row(16, { name: v });
    const bar = SW.rect(Math.max(4, +px * 3), 12, 'dark/accent-2', null, 3); bar.name = 'bar';
    SW.add(r, await SW.t(v + '  ' + px, 'display/label-sm', 'dark/fg-muted', { w: 120 }), bar); SW.add(sp, r); }
  const rd = SW.panel('dark', { gap: 20, w: 448, name: 'Radius' });
  SW.add(rd, await SW.label('// Radius', 'dark/accent-2-text'));
  const rr = SW.row(20, { wrap: true, wrapGap: 20, w: 384, align: 'MIN' });
  for (const k of ['sm', 'md', 'card', 'page', 'pill']) { const c = SW.col(10, { align: 'CENTER', name: 'radius-' + k });
    const sq = SW.rect(96, 96, 'dark/surface-2', null, k); SW.s(sq, 'dark/border-control'); sq.name = 'sample';
    SW.add(c, sq, await SW.t('radius-' + k + '  ' + SW.num['radius-' + k], 'display/label-sm', 'dark/fg-muted')); SW.add(rr, c); }
  SW.add(rd, rr);
  const fx = SW.panel('dark', { gap: 20, w: 448, name: 'Effects' });
  SW.add(fx, await SW.label('// Effects', 'dark/accent-2-text'));
  for (const [name, m, note] of [['effects/glow-dark', 'dark', 'Hover glow, dark. Indigo 25 %, blur 40, spread -10.'], ['effects/glow-light', 'light', 'Hover glow, light. Indigo 15 %, blur 20, spread 2.'], ['effects/shadow-card-light', 'light', 'Card shadow, light only. Dark mode has no shadows.']]) {
    const stage = SW.row(20, { pad: [24, 24], r: 'md', fill: SW.r(m, 'bg'), stroke: SW.r(m, 'border'), name: name });
    const card = SW.rect(96, 64, SW.r(m, 'surface'), null, 'md'); SW.s(card, SW.r(m, 'border')); card.name = 'sample'; await h.effect(card, name);
    const t = SW.col(4); SW.add(t, await SW.t(name, 'text/sm-strong', SW.r(m, 'fg')), await SW.t(note, 'text/xs', SW.r(m, 'fg-muted'), { w: 220 }));
    SW.add(stage, card, t); SW.put(fx, stage, true); }
  SW.add(r3, sp, rd, fx);

  // grid
  const gd = SW.panel('dark', { gap: 24, pad: 40, name: 'Grid' }); SW.put(b, gd, true);
  SW.add(gd, await SW.block('Grid', '12 columns · 1200 max · 24 gutter · 32 px texture', 'Content sits on a 12-column grid. The page texture is a 32 px grid of 1 px lines (theme texture-grid), faded at the edges. One soft glow per edge, never behind text.'));
  const cols = SW.row(24, { name: 'columns' });
  for (let i = 0; i < 12; i++) { const c = SW.rect(78, 140, 'dark/accent-2', 0.1, 4); SW.s(c, 'dark/accent-2', 1, 0.4); c.name = 'col-' + (i + 1); SW.add(cols, c); }
  const tiles = SW.row(24, { name: 'texture' });
  for (const m of ['dark', 'light']) { const t = figma.createFrame(); t.name = 'texture/' + m; t.resize(320, 160); t.clipsContent = true; t.fills = [SW.c(SW.r(m, 'bg'))]; SW.radius(t, 'md');
    for (let x = 32; x < 320; x += 32) { const r = SW.rect(1, 160, SW.r(m, 'texture-grid')); r.x = x; t.appendChild(r); }
    for (let y = 32; y < 160; y += 32) { const r = SW.rect(320, 1, SW.r(m, 'texture-grid')); r.y = y; t.appendChild(r); }
    SW.s(t, SW.r(m, 'border')); SW.add(tiles, t); }
  SW.add(gd, cols, tiles);

  // iconography: the Icon component set
  const ic = SW.col(24, { name: 'Iconography' }); SW.put(b, ic, true);
  SW.add(ic, await SW.block('Iconography', 'Icons are components', '24 px grid, 1.5 px stroke, round caps and joins. The stroke is bound to fg of the mode. Recolour an instance with a theme role, never a hex value.'));
  await SW.set(ic, 'Icon', 'Line icons on a 24 px grid, 1.5 px stroke, bound to <mode>/fg. Use at 16, 20 or 24 px. Names: ' + SW.ICON_NAMES.join(', ') + '.',
    [['Name', SW.ICON_NAMES]], async (p, m) => { const c = figma.createComponent(); c.resize(24, 24); c.fills = []; c.clipsContent = false;
      const g = SW.iconNode(p.Name, SW.r(m, 'fg')); c.appendChild(g); g.x = 0; g.y = 0;
      g.constraints = { horizontal: 'SCALE', vertical: 'SCALE' }; return c; }, { wrap: 16, gap: 40 });
  return SW.finish(s, b, 'dark');
} });
