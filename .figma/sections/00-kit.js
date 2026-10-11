// Synthwerk design system (synthwerk#9) · shared helpers for every section file of this pack.
// All files run in one scope, in file-name order. `h` is the vfb helper object, `pack` is pack.json, `B` the section registry.
// Rules of this pack:
// - Every solid colour is bound to a variable: SW.c('<var>', op). Fallback hex values come from tokens.json.
// - Every text uses a text style from tokens.json: SW.t(str, '<style>', '<colour var>', o). No font or size overrides.
// - Every component is a component set with Mode=Dark|Light: SW.set(...). Patterns use instances: SW.inst(...).
// - Look D-41: graphite near-black, 1 px borders, no shadows in dark, faint 32 px grid, edge glows, Space Mono capital labels,
//   white pills, ASCII art. Indigo = the one accent. Emerald = status only.
// - Art: request the exact file name in art/ (all .jpg). `vfb check` fails on a missing file.

const PG = { D: 'Design', T: 'Tech', B: 'Brand & Roadmap' };
const SW = { W: 1600, hex: {}, num: {}, ready: false, idx: {}, MODES: ['Dark', 'Light'] };

// ---- tokens -------------------------------------------------------------------------------
// tokens.json is served as <pack>/__tokens.json (vfb up). It gives the fallback hex of every variable.
SW.load = (tok) => { const raw = {};
  for (const entries of Object.values(tok.collections || {})) for (const [n, d] of Object.entries(entries)) raw[n] = d && typeof d === 'object' ? d.value : d;
  const res = (n, depth) => { const v = raw[n]; if (depth > 8) return null;
    if (typeof v === 'string' && /^\{.+\}$/.test(v)) return res(v.slice(1, -1), depth + 1); return v; };
  for (const n of Object.keys(raw)) { const x = res(n, 0);
    if (typeof x === 'string' && x[0] === '#') SW.hex[n] = x.slice(0, 7); else if (typeof x === 'number') SW.num[n] = x; }
  SW.tok = tok; };
SW.init = async () => { if (SW.ready) return;
  let tok = null; try { tok = JSON.parse(await h.getText(pack.id + '/__tokens.json')); } catch (e) { tok = null; }
  if (!tok || !tok.collections) throw new Error('tokens.json not readable: run `vfb up` and try again');
  SW.load(tok); SW.ready = true; };
// Register a section: loads the token table first. Section names are identities: never rename them.
SW.section = (def) => section(Object.assign({}, def, { run: async (hh) => { await SW.init(); return def.run(hh); } }));

// ---- colour -------------------------------------------------------------------------------
SW.m = (m) => String(m || 'dark').toLowerCase() === 'light' ? 'light' : 'dark';   // 'Dark' -> 'dark'
SW.M = (m) => SW.m(m) === 'light' ? 'Light' : 'Dark';                             // 'dark' -> 'Dark'
SW.r = (m, role) => SW.m(m) + '/' + role;                                          // theme variable of a role
SW.c = (name, op) => h.paint(name, op, SW.hex[name] || '#FF00FF');                 // bound paint
SW.f = (n, name, op) => { n.fills = [SW.c(name, op)]; return n; };
SW.s = (n, name, w, op, align) => { n.strokes = [SW.c(name, op)]; n.strokeWeight = w || 1; n.strokeAlign = align || 'INSIDE'; return n; };
SW.sides = (n, t, r, b, l) => { n.strokeTopWeight = t; n.strokeRightWeight = r; n.strokeBottomWeight = b; n.strokeLeftWeight = l; return n; };
SW.STATUS = { Live: 'success', Building: 'warning', Planned: 'fg-subtle', Blocked: 'danger' };
// WCAG 2.2 contrast (same maths as @synthwerk/tokens contrast.ts)
SW.lum = (x) => { if (!/^#[0-9a-f]{6}$/i.test(x || '')) throw new Error('contrast needs #RRGGBB, got ' + x); const n = parseInt(x.slice(1), 16); const ch = (v) => { const c = v / 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  return 0.2126 * ch(n >> 16) + 0.7152 * ch((n >> 8) & 255) + 0.0722 * ch(n & 255); };
SW.ratio = (a, b) => { const x = SW.lum(a), y = SW.lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
SW.grade = (r) => r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA large' : 'fail';

// ---- text ---------------------------------------------------------------------------------
// SW.t(str, style, colourVar, {w, align, name, op})
SW.t = async (str, style, color, o) => h.text(str, Object.assign({ style, color, fb: SW.hex[color] }, o || {}));
SW.label = async (str, color, o) => SW.t(str, 'display/label-xs', color, o);

// ---- layout -------------------------------------------------------------------------------
SW.SPACE = { 4: 'space-1', 8: 'space-2', 12: 'space-3', 16: 'space-4', 24: 'space-6', 32: 'space-8', 48: 'space-12', 64: 'space-16', 96: 'space-24' };
SW.bind = (n, field, varName) => { const v = h.v(varName); if (!v || !n.setBoundVariable) return n; try { n.setBoundVariable(field, v); } catch (e) { h.log('bind ' + field + ' ' + varName + ': ' + e.message, 'warn'); } return n; };
SW.space = (n, field, px) => { n[field] = px; if (SW.SPACE[px]) SW.bind(n, field, SW.SPACE[px]); return n; };
// radius: number or token key ('sm' 10, 'md' 14, 'card' 24, 'page' 32, 'pill' 9999), bound to radius-<key>
SW.radius = (n, r) => { if (r == null) return n; if (typeof r === 'number') { n.cornerRadius = r; return n; }
  const name = 'radius-' + r; n.cornerRadius = SW.num[name] != null ? SW.num[name] : 8;
  for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) SW.bind(n, k, name); return n; };
// SW.frame(dir, o, asComponent): auto-layout frame (or component). o: gap, pad (n | [v, h] | [t, r, b, l]), align, justify, wrap,
// r (radius), fill / stroke (variable names), op, w, h (fixed sizes), clip, name.
SW.frame = (dir, o, comp) => { o = o || {}; const f = comp ? figma.createComponent() : figma.createFrame();
  f.layoutMode = dir || 'VERTICAL'; f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO'; f.fills = []; f.clipsContent = !!o.clip;
  if (o.name) f.name = o.name;
  SW.space(f, 'itemSpacing', o.gap || 0);
  const p = o.pad == null ? 0 : o.pad; const P = Array.isArray(p) ? (p.length === 2 ? [p[0], p[1], p[0], p[1]] : p) : [p, p, p, p];
  SW.space(f, 'paddingTop', P[0]); SW.space(f, 'paddingRight', P[1]); SW.space(f, 'paddingBottom', P[2]); SW.space(f, 'paddingLeft', P[3]);
  if (o.align) f.counterAxisAlignItems = o.align; if (o.justify) f.primaryAxisAlignItems = o.justify;
  if (o.wrap) { f.layoutWrap = 'WRAP'; SW.space(f, 'counterAxisSpacing', o.wrapGap == null ? (o.gap || 0) : o.wrapGap); }
  if (o.fill) SW.f(f, o.fill, o.op); if (o.stroke) SW.s(f, o.stroke, o.sw, o.sop);
  SW.radius(f, o.r);
  if (o.w && o.h) SW.fix(f, o.w, o.h); else if (o.w) SW.fixW(f, o.w); else if (o.h) SW.fixH(f, o.h);
  return f; };
SW.col = (gap, o) => SW.frame('VERTICAL', Object.assign({ gap }, o || {}));
SW.row = (gap, o) => SW.frame('HORIZONTAL', Object.assign({ gap, align: 'CENTER' }, o || {}));
SW.cmp = (dir, o) => SW.frame(dir, o, true);
SW.fixW = (f, w) => { f.resize(w, Math.max(1, f.height));
  if (f.layoutMode === 'VERTICAL') f.counterAxisSizingMode = 'FIXED'; else if (f.layoutMode === 'HORIZONTAL') f.primaryAxisSizingMode = 'FIXED'; return f; };
SW.fixH = (f, hh) => { f.resize(Math.max(1, f.width), hh);
  if (f.layoutMode === 'VERTICAL') f.primaryAxisSizingMode = 'FIXED'; else if (f.layoutMode === 'HORIZONTAL') f.counterAxisSizingMode = 'FIXED'; return f; };
SW.fix = (f, w, hh) => { f.resize(w, hh); if (f.layoutMode && f.layoutMode !== 'NONE') { f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'FIXED'; } return f; };
SW.add = (p, ...kids) => h.add(p, ...kids);
SW.fill = (...ns) => { for (const n of ns.flat()) if (n) { try { n.layoutSizingHorizontal = 'FILL'; } catch (e) { h.log('fill ' + n.name + ': ' + e.message, 'warn'); } } };
SW.fillV = (...ns) => { for (const n of ns.flat()) if (n) { try { n.layoutSizingVertical = 'FILL'; } catch (e) { h.log('fillV ' + n.name + ': ' + e.message, 'warn'); } } };
SW.grow = (n) => { try { n.layoutGrow = 1; } catch (e) {} return n; };
SW.spacer = () => { const g = SW.row(0, { name: 'spacer' }); return g; };
SW.rect = (w, hh, color, op, r) => { const x = h.rect(w, hh, color ? [SW.c(color, op)] : []); SW.radius(x, r); return x; };
SW.dot = (d, color, op) => { const e = figma.createEllipse(); e.resize(d, d); e.fills = [SW.c(color, op)]; e.name = 'dot'; return e; };
SW.under = (parent, n, x, y) => { parent.insertChild(0, n); n.layoutPositioning = 'ABSOLUTE'; n.x = x; n.y = y; return n; };
SW.over = (parent, n, x, y) => { parent.appendChild(n); n.layoutPositioning = 'ABSOLUTE'; n.x = x; n.y = y; return n; };

// ---- ASCII rule: "-- 01 ------------ TITLE --", 72 columns, three text runs in three colours ----------------
SW.rule = async (code, title, m, cols) => { m = SW.m(m); cols = cols || 72;
  const a = '-- ' + code + ' ', c = ' ' + String(title).toUpperCase() + ' --', dash = '-'.repeat(Math.max(4, cols - a.length - c.length));
  const r = SW.row(0, { name: 'ascii-rule' });
  SW.add(r, await SW.t(a, 'display/label-sm', SW.r(m, 'accent-2-text'), { name: 'index' }), await SW.t(dash, 'display/label-sm', SW.r(m, 'border-control'), { name: 'dashes' }),
    await SW.t(c, 'display/label-sm', SW.r(m, 'fg-muted'), { name: 'label' }));
  return r; };

// ---- boards -------------------------------------------------------------------------------
SW.board = (name, w, m) => { const b = SW.col(96, { name, pad: [96, 96, 128, 96], fill: SW.r(m, 'bg'), clip: true }); SW.fixW(b, w || SW.W); return b; };
SW.header = async (code, title, sub, m) => { m = SW.m(m); const x = SW.col(24, { name: 'Header' });
  const acc = SW.rect(44, 2, SW.r(m, 'accent-2')); acc.name = 'accent-line';
  SW.add(x, await SW.rule(code, title, m), acc, await SW.t(title, 'display/7xl', SW.r(m, 'fg'), { name: 'title' }));
  if (sub) SW.add(x, await SW.t(sub, 'text/lg', SW.r(m, 'fg-muted'), { w: 920, name: 'lead' }));
  return x; };
// sub-block title inside a board: "// LABEL" + heading + note
SW.block = async (label, title, note, m) => { m = SW.m(m); const x = SW.col(12, { name: 'Block / ' + title });
  SW.add(x, await SW.label('// ' + label, SW.r(m, 'accent-2-text')), await SW.t(title, 'heading/3xl', SW.r(m, 'fg'), { name: 'title' }));
  if (note) SW.add(x, await SW.t(note, 'text/base', SW.r(m, 'fg-muted'), { w: 960, name: 'note' }));
  return x; };
SW.panel = (m, o) => SW.col(o && o.gap != null ? o.gap : 20, Object.assign({ pad: 32, r: 'card', fill: SW.r(m, 'surface'), stroke: SW.r(m, 'border') }, o || {}));

// Faint 32 px grid (bound to <mode>/texture-grid) + the three edge glows of the website, behind the board content.
// Call after the content is in, so the board size is known.
SW.texture = (b, m) => { m = SW.m(m); const w = b.width, hh = Math.min(b.height, 1120), step = 32;
  const g = figma.createFrame(); g.name = 'texture'; g.resize(w, hh); g.fills = []; g.clipsContent = true;
  for (let x = step; x < w; x += step) { const r = SW.rect(1, hh, SW.r(m, 'texture-grid')); r.x = x; r.y = 0; g.appendChild(r); }
  for (let y = step; y < hh; y += step) { const r = SW.rect(w, 1, SW.r(m, 'texture-grid')); r.x = 0; r.y = y; g.appendChild(r); }
  const bg = SW.hex[SW.r(m, 'bg')] || '#0C0C10';
  const fade = h.rect(w, hh, [h.grad([[0, bg, 0], [0.6, bg, 0.2], [1, bg, 1]], 90)]); fade.name = 'grid-fade'; g.appendChild(fade);
  const k = m === 'dark' ? [0.22, 0.14, 0.22] : [0.14, 0.08, 0.14];
  for (const [i, [col, cx, rx, ry]] of [['teal-500', 0.16, 0.36, 0.52], ['red-500', 0.52, 0.28, 0.36], ['violet-500', 0.9, 0.34, 0.56]].entries()) {
    const e = figma.createEllipse(); e.name = 'glow-edge/' + col.split('-')[0]; const ew = w * rx * 2, eh = Math.min(hh, 900) * ry * 2;
    e.resize(ew, eh); e.x = w * cx - ew / 2; e.y = -eh / 2; e.fills = [h.radial(SW.hex[col] || '#6366F1', k[i])]; g.appendChild(e); }
  g.locked = true; SW.under(b, g, 0, 0); return g; };
SW.finish = (s, b, m) => { SW.texture(b, m); return h.place(s, b); };

// ---- art ----------------------------------------------------------------------------------
// Art panel: image fill over the mode background, with a fade into the background so text on top stays readable.
// o: mode, dir, gap, pad, align (primary axis), r, side (left fade), fade (false = none), stroke (false = none), name
SW.art = async (path, w, hh, o) => { o = o || {}; const m = SW.m(o.mode);
  const f = SW.frame(o.dir || 'VERTICAL', { gap: o.gap == null ? 16 : o.gap, pad: o.pad == null ? 48 : o.pad, name: o.name || 'art/' + path.split('/').pop() });
  SW.fix(f, w, hh); f.primaryAxisAlignItems = o.align || 'MAX'; f.clipsContent = true; SW.radius(f, o.r == null ? 'card' : o.r);
  const bg = SW.hex[SW.r(m, 'bg')] || '#0C0C10'; const over = [];
  if (o.fade !== false) over.push(h.grad([[0, bg, m === 'light' ? 0.2 : 0], [0.5, bg, m === 'light' ? 0.45 : 0.2], [1, bg, 0.94]], 90));
  if (o.side) over.push(h.grad([[0, bg, 0.92], [0.55, bg, 0.5], [1, bg, 0]], 0));
  if (m === 'light' && o.fade !== false) over.unshift(h.grad([[0, bg, 0.55], [1, bg, 0.55]], 0));
  await h.imgFill(f, path, { under: [SW.c(SW.r(m, 'bg'))], over, op: o.op });
  if (o.stroke !== false) SW.s(f, SW.r(m, 'border')); return f; };

// ---- icons: 24 px grid, 1.5 px stroke, round caps (lucide geometry) --------------------------------
SW.ICONS = {
  'arrow-right': '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  'arrow-left': '<path d="M19 12H5"/><path d="m11 18-6-6 6-6"/>',
  'arrow-up-right': '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  'check': '<path d="M20 6 9 17l-5-5"/>',
  'minus': '<path d="M5 12h14"/>',
  'plus': '<path d="M5 12h14"/><path d="M12 5v14"/>',
  'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'menu': '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
  'search': '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  'copy': '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  'terminal': '<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',
  'code': '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
  'cube': '<path d="M12 2 21 7v10l-9 5-9-5V7z"/><path d="m3 7 9 5 9-5"/><path d="M12 12v10"/>',
  'layers': '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
  'bolt': '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  'eye': '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  'user': '<circle cx="12" cy="8" r="4.5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  'key': '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.3-9.3"/><path d="m16 7 3 3"/>',
  'chat': '<path d="M21 12a8 8 0 0 1-11.7 7.1L3 21l1.9-6.3A8 8 0 1 1 21 12z"/>',
  'pulse': '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  'info': '<circle cx="12" cy="12" r="9"/><path d="M12 16v-5"/><path d="M12 8h.01"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  'alert': '<path d="M10.3 4.2 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  'x-circle': '<circle cx="12" cy="12" r="9"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
  'external': '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  'github': '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.1-1.3-.3-2.5-1-3.5.3-1.2.3-2.4 0-3.5 0 0-1 0-3 1.5a13.4 13.4 0 0 0-8 0C6 2 5 2 5 2c-.3 1.2-.3 2.4 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.4.5-.7 1-.8 1.7-.2.6-.3 1.2-.2 1.8v4"/><path d="M9 18c-4.5 2-5-2-7-2"/>',
  'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/>',
  'moon': '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
  'settings': '<circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="m4.9 4.9 2.1 2.1"/><path d="m17 17 2.1 2.1"/><path d="M2 12h3"/><path d="M19 12h3"/><path d="m4.9 19.1 2.1-2.1"/><path d="m17 7 2.1-2.1"/>',
};
SW.ICON_NAMES = Object.keys(SW.ICONS);
// A vector icon whose strokes are bound to a colour variable. Used inside the Icon set.
SW.iconNode = (name, color) => { const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + SW.ICONS[name] + '</svg>';
  if (!SW.ICONS[name]) throw new Error('unknown icon ' + name);
  const f = figma.createNodeFromSvg(svg); f.name = 'glyph'; f.fills = []; f.clipsContent = false;
  for (const n of f.findAll ? f.findAll(() => true) : []) {
    if ('strokes' in n && n.strokes && n.strokes.length) n.strokes = [SW.c(color)];
    if ('fills' in n && n.fills && n.fills.length) n.fills = [];
    try { n.constraints = { horizontal: 'SCALE', vertical: 'SCALE' }; } catch (e) {} }
  return f; };

// ---- component sets -------------------------------------------------------------------------
const prod = (axes) => axes.reduce((acc, [k, vals]) => acc.flatMap(a => vals.map(v => Object.assign({}, a, { [k]: v }))), [{}]);
// SW.set(parent, name, desc, axes, build, o) -> set. axes: [['Kind', [...]], ['State', [...]]]; Mode=Dark|Light is added last.
// build(props, mode) returns a COMPONENT (SW.cmp). Columns = o.colAxis (default: the last axis), rows = the other axes.
// Dark variants fill the top half, light variants the bottom half; the set background splits there.
// o.wrap: max columns per row. o.props: [['label', 'Label']] = TEXT component properties bound to the text layers of that name.
SW.set = async (parent, name, desc, axes, build, o) => { o = o || {}; const gap = o.gap == null ? 24 : o.gap, PAD = 40, MG = 80;
  if (!desc) throw new Error('set ' + name + ': description missing');
  const colAxis = o.colAxis !== undefined ? o.colAxis : (axes.length ? axes[axes.length - 1][0] : null);
  const colVals = colAxis ? axes.find(a => a[0] === colAxis)[1] : [null];
  const rows = prod(axes.filter(a => a[0] !== colAxis));
  const wrap = SW.col(20, { name: 'Set / ' + name }); SW.add(parent, wrap);
  const head = SW.row(16, { name: 'head' });
  SW.add(head, await SW.t(name, 'heading/3xl', 'dark/fg', { name: 'title' }), await SW.label(prod(axes).length * 2 + ' variants', 'dark/fg-subtle', { name: 'count' }));
  SW.add(wrap, head, await SW.t(desc, 'text/base', 'dark/fg-muted', { w: 1080, name: 'description' }));
  const grid = [], comps = [];
  for (const mm of SW.MODES) for (const rp of rows) { const line = [];
    for (const cv of colVals) { const props = Object.assign({}, rp); if (colAxis) props[colAxis] = cv; props.Mode = mm;
      const c = await build(props, SW.m(mm)); c.name = Object.entries(props).map(([k, v]) => k + '=' + v).join(', ');
      line.push(c); comps.push(c); }
    const n = o.wrap || line.length; for (let i = 0; i < line.length; i += n) grid.push({ m: mm, line: line.slice(i, i + n) }); }
  const names = new Set(comps.map(c => c.name)); if (names.size !== comps.length) throw new Error('set ' + name + ': duplicate variant names');
  for (const c of comps) if (c.type !== 'COMPONENT' || !/(^|, )Mode=(Dark|Light)$/.test(c.name)) throw new Error('set ' + name + ': bad variant ' + c.type + ' ' + c.name);
  const set = figma.combineAsVariants(comps, wrap); set.name = name; if (desc) set.description = desc; set.layoutMode = 'NONE';
  const nc = Math.max(...grid.map(r => r.line.length));
  const colW = Array.from({ length: nc }, (_, j) => Math.max(...grid.filter(r => r.line[j]).map(r => r.line[j].width)));
  let y = PAD, split = 0, W = 0;
  grid.forEach((r, i) => { if (i > 0 && r.m !== grid[i - 1].m) { split = y - gap + MG / 2; y += MG - gap; }
    let x = PAD; const rh = Math.max(...r.line.map(c => c.height));
    r.line.forEach((c, j) => { c.x = x; c.y = y; x += colW[j] + gap; }); W = Math.max(W, x - gap + PAD); y += rh + gap; });
  const H = y - gap + PAD; set.resizeWithoutConstraints(Math.max(W, 240), H);
  const d = SW.hex['dark/bg'] || '#0C0C10', l = SW.hex['light/bg'] || '#FAFAFA', k = Math.min(0.999, Math.max(0.001, split / H));
  set.fills = [h.grad([[0, d], [k, d], [k, l], [1, l]], 90)];
  SW.s(set, 'dark/border-control', 1, 0.6); set.dashPattern = [6, 4]; set.cornerRadius = 16;
  for (const [layer, prop] of o.props || []) { try {
      const first = comps[0].findOne ? comps[0].findOne(n => n.type === 'TEXT' && n.name === layer) : null;
      const key = set.addComponentProperty(prop, 'TEXT', first ? first.characters : prop);
      for (const c of comps) for (const t of c.findAll(n => n.type === 'TEXT' && n.name === layer)) t.componentPropertyReferences = { characters: key };
    } catch (e) { h.log('set ' + name + ' property ' + prop + ': ' + e.message, 'warn'); } }
  SW.idx[name] = set; return set; };

// ---- instances --------------------------------------------------------------------------------
SW.reindex = async () => { SW.idx = {};
  for (const pg of figma.root.children) { if (typeof pg.loadAsync === 'function') await pg.loadAsync();
    for (const s of pg.findAllWithCriteria({ types: ['COMPONENT_SET'] })) SW.idx[s.name] = s; } };
SW.variant = async (name, props) => { let s = SW.idx[name]; if (!s || s.removed) { await SW.reindex(); s = SW.idx[name]; }
  if (!s) throw new Error('component set "' + name + '" missing: build "01 · Foundations" and the "02 · Components" sections first');
  const want = Object.entries(props || {}).map(([k, v]) => k + '=' + v);
  const c = s.children.find(x => want.every(w => x.name.split(', ').includes(w)));
  if (!c) throw new Error('variant ' + name + ' ' + want.join(', ') + ' missing'); return c; };
SW.inst = async (name, props, layer) => { const i = (await SW.variant(name, props)).createInstance(); i.name = layer || name; return i; };
// Text override in an instance. A text bound to a TEXT property is set through the property of its nearest instance.
SW.setText = async (node, layer, str) => { if (!node || !node.findOne) return node; const t = node.findOne(x => x.type === 'TEXT' && x.name === layer); if (!t) return node;
  const key = t.componentPropertyReferences && t.componentPropertyReferences.characters;
  if (key) { let owner = t.parent; while (owner && owner.type !== 'INSTANCE') owner = owner.parent;
    if (owner) { try { owner.setProperties({ [key]: String(str) }); return node; } catch (e) { h.log('setText ' + layer + ': ' + e.message, 'warn'); } } }
  if (t.fontName !== figma.mixed) await figma.loadFontAsync(t.fontName); t.characters = String(str); return node; };
SW.texts = async (node, map) => { for (const [k, v] of Object.entries(map)) await SW.setText(node, k, v); return node; };
SW.swap = async (node, layer, setName, props) => { if (!node || !node.findOne) return node; const n = node.findOne(x => x.type === 'INSTANCE' && x.name === layer);
  if (n) n.swapComponent(await SW.variant(setName, props)); return node; };
// icon instance; role recolours the glyph (an instance override) when it is not fg
SW.icon = async (name, m, role, size) => { const i = await SW.inst('Icon', { Name: name, Mode: SW.M(m) }, 'icon/' + name);
  if (size && size !== 24) i.resize(size, size);
  if (role && role !== 'fg' && i.findAll) for (const v of i.findAll(n => n.type === 'VECTOR')) if (v.strokes && v.strokes.length) v.strokes = [SW.c(SW.r(m, role))];
  return i; };
SW.put = (parent, inst, fill) => { SW.add(parent, inst); if (fill) SW.fill(inst); return inst; };

// ---- page order: lay the sections of each page top to bottom, in registration order ------------------
after(async () => {
  for (const name of [PG.D, PG.T, PG.B]) { const pg = figma.root.children.find(p => p.name === name); if (!pg) continue;
    if (typeof pg.loadAsync === 'function') await pg.loadAsync();
    const order = (B[pack.id] || []).filter(s => s.page === name).map(s => s.name);
    h.stack(order.map(n => pg.children.find(x => x.type === 'SECTION' && x.name === n)).filter(Boolean), 240); } });
