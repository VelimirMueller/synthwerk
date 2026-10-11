// 12 · Demo stack & tokens — where the demo runs (docs/infrastructure.md, decided 2026-10-10) and how one token
// travels from tokens.ts to a Figma variable and a CSS / Tailwind name. Collection counts are read from the file.
SW.section({ name: '12 · Demo stack & tokens', page: PG.T, run: async () => {
  const s = h.section('12 · Demo stack & tokens');
  const b = SW.board('12 / Demo stack & tokens', SW.W, 'dark'); const IN = SW.W - 192;
  SW.add(b, await SW.header('12', 'Demo stack & tokens', 'Where the demo runs, and how one token goes from tokens.ts to a Figma variable and a Tailwind class. Nothing is deployed yet.'));

  // demo stack
  const dw = SW.col(24, { name: 'Demo stack' }); SW.put(b, dw, true);
  SW.add(dw, await SW.block('Demo stack · decided 2026-10-10', 'Three providers, one demo', 'Front ends on Vercel, back end on one IONOS VPS, Postgres on Supabase. GitHub holds code and tasks, Figma holds design. Production hosting is still open.'));
  const stack = SW.row(16, { name: 'providers', align: 'MIN' });
  for (const [icon, n, role, note, st] of [['eye', 'Vercel', 'Front ends', 'Studio, public site, demo pages. Preview build per pull request.', 'Planned'],
    ['cube', 'IONOS VPS', 'Back end', 'Edge, services, NATS, telemetry, local models. Docker Compose.', 'Planned'],
    ['layers', 'Supabase', 'Database', 'Postgres for the demo. One project.', 'Planned'], ['github', 'GitHub', 'Code + tasks', 'Repos, Actions, board #7, releases.', 'Live'],
    ['code', 'Figma', 'Design', 'This file. Built by vfb from tokens.json.', 'Building'], ['alert', 'prd hosting', 'Open', 'Conflicts with D-05 (Hetzner + OpenTofu). Not decided.', 'Blocked']]) {
    const c = SW.panel('dark', { gap: 12, pad: 24, w: 222, name: 'provider/' + n }); if (st === 'Blocked') c.dashPattern = [6, 4];
    SW.add(c, await SW.icon(icon, 'dark', st === 'Blocked' ? 'danger' : 'accent-2-text', 22), await SW.label(role, 'dark/fg-subtle', { name: 'role' }),
      await SW.t(n, 'heading/xl', 'dark/fg', { name: 'name' }), await SW.t(note, 'text/sm', 'dark/fg-muted', { w: 174, name: 'note' }),
      await SW.inst('Status pill', { Status: st, Mode: 'Dark' }, 'status'));
    SW.add(stack, c); }
  SW.add(dw, stack);

  // token pipeline
  const pw = SW.col(24, { name: 'Token pipeline' }); SW.put(b, pw, true);
  SW.add(pw, await SW.block('Tokens', 'One source, no drift', 'A change starts in tokens.ts, ships as a new @synthwerk/tokens version, then .figma/tools/tokens.mjs writes tokens.json and "Sync tokens" updates the variables. Never the other way round.'));
  const pipe = SW.row(14, { pad: 32, r: 'card', fill: 'dark/surface', stroke: 'dark/border', name: 'pipeline' });
  const steps = [['code', 'tokens.ts', 'synthwerk-sdk'], ['layers', 'tokens.json', '.figma · vfb format'], ['bolt', 'Sync tokens', 'vfb plugin'], ['cube', 'Variables', 'this file'], ['eye', 'CSS + Tailwind', 'tokens.css · tailwind.css']];
  for (const [i, [ic, n, sub]] of steps.entries()) { const bx = SW.col(8, { pad: 20, r: 'md', w: 220, fill: 'dark/bg', stroke: i === 3 ? 'dark/accent-2' : 'dark/border', name: n });
    SW.add(bx, await SW.icon(ic, 'dark', 'accent-2-text', 20), await SW.t(n, 'display/label-sm', 'dark/fg', { name: 'name' }), await SW.t(sub, 'text/xs', 'dark/fg-muted', { name: 'sub' }));
    SW.add(pipe, bx); if (i < steps.length - 1) SW.add(pipe, await SW.icon('arrow-right', 'dark', 'fg-subtle', 20)); }
  SW.add(pw, pipe);

  // live collection counts
  const cols = await figma.variables.getLocalVariableCollectionsAsync(); const vars = await figma.variables.getLocalVariablesAsync();
  const counts = SW.row(0, { r: 'card', clip: true, fill: 'dark/surface', stroke: 'dark/border', name: 'collections', align: 'MIN' });
  for (const [i, c] of cols.entries()) { const n = vars.filter(v => v.variableCollectionId === c.id).length;
    const cell = SW.col(8, { pad: [24, 28], stroke: 'dark/border', name: 'collection/' + c.name }); SW.sides(cell, 0, i < cols.length - 1 ? 1 : 0, 0, 0);
    SW.add(cell, await SW.t(String(n), 'display/3xl', 'dark/fg', { name: 'count' }), await SW.label(c.name, 'dark/fg-subtle', { name: 'collection' }));
    SW.add(counts, cell); SW.grow(cell); }
  SW.put(pw, counts, true);

  // mapping table
  const tbl = SW.col(0, { r: 'md', clip: true, stroke: 'dark/border', name: 'Token mapping' });
  const W6 = [200, 260, 220, 220, 230, 230];
  const head = ['Role', 'Figma variable', 'CSS variable', 'Tailwind', 'Dark', 'Light'];
  const rows = ['bg', 'surface', 'border', 'fg', 'fg-muted', 'accent', 'accent-2', 'accent-2-text', 'success', 'ring'];
  const hr = SW.row(0, { pad: [14, 20], fill: 'dark/surface-2', stroke: 'dark/border', name: 'header' }); SW.sides(hr, 0, 0, 1, 0);
  for (let i = 0; i < 6; i++) SW.add(hr, await SW.label(head[i], 'dark/fg-subtle', { w: W6[i] }));
  SW.put(tbl, hr, true);
  for (const role of rows) { const r = SW.row(0, { pad: [12, 20], fill: 'dark/surface', stroke: 'dark/border-subtle', name: 'row/' + role }); SW.sides(r, 0, 0, 1, 0);
    const tw = /^(fg|accent-2-text)/.test(role) ? 'text-' : /border|ring/.test(role) ? (role === 'ring' ? 'ring-' : 'border-') : 'bg-';
    const cells = [role, 'theme · dark/' + role, 'var(--' + role + ')', tw + role];
    for (let i = 0; i < 4; i++) SW.add(r, await SW.t(cells[i], i === 0 ? 'text/sm-strong' : 'mono/sm', i === 0 ? 'dark/fg' : 'dark/fg-muted', { w: W6[i] }));
    for (const m of ['dark', 'light']) { const cell = SW.row(10, { w: W6[m === 'dark' ? 4 : 5], name: m });
      const chip = SW.rect(18, 18, SW.r(m, role), null, 5); SW.s(chip, 'dark/border-control'); chip.name = SW.r(m, role);
      SW.add(cell, chip, await SW.t(SW.hex[SW.r(m, role)] || '', 'mono/sm', 'dark/fg-muted')); SW.add(r, cell); }
    SW.put(tbl, r, true); }
  SW.put(b, tbl, true);
  return SW.finish(s, b, 'dark');
} });
