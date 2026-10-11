// 21 · Roadmap — docs/roadmap.md as a board: ASCII timeline, milestones M0–M6, epics, sprint calendar, design track.
// Dates are estimates, not promises. Update this file together with docs/roadmap.md.
SW.MILESTONES = [
  ['M0', 'Clean slate', '2026-10-23', 'E0', 'Old names are removed. Blueprint CI is green in a repo.', 'Building', ['Rename, security cleanup', 'Blueprint CI', 'Brand tokens 0.2.0', 'Figma library (#9)']],
  ['M1', 'Spine runs locally', '2026-11-20', 'E1', 'docker compose up starts edge, bus, database, telemetry and pulse. All green.', 'Planned', ['Contracts', 'Edge + bus', 'Observability', 'Pulse skeleton']],
  ['M2', 'Chat slice on dev', '2027-01-29', 'E2 · E3', 'A passkey user gets streamed answers in an embedded chat. A signed-out visitor triggers no AI call.', 'Planned', ['Identity, orgs', 'LLM gateway', 'Chat widget', 'SDK core']],
  ['M3', 'MVP on prd', '2027-02-26', 'E4', 'prd runs the approved stg build. The 5-minute embed works. A restore drill is done.', 'Planned', ['Studio admin', 'Health view', 'prd go-live']],
  ['M4', 'Public demo', '2027-04-09', 'E5 · E6', 'Public site with live chat, vision and the mascot. Legal sign-off exists.', 'Planned', ['Vision widget', 'Page builder', 'Strobe mascot']],
  ['M5', 'Paid plans and SDK apps', '2027-05-07', 'E7', 'Test checkout changes entitlements. React and Vue templates pass their tests.', 'Planned', ['React / Vue adapters', 'Paywall', 'AI tools']],
  ['M6', 'Cluster-ready', '2027-06-04', 'E8', 'Same images on k3s. Security review closed. Card scan is correct on the eval set.', 'Planned', ['k3s', 'Fallback provider', 'Card scan']],
];
SW.EPICS = [['E0', 'Clean slate', 1, true], ['E1', 'Spine', 2, true], ['E2', 'Identity', 2, true], ['E3', 'Chat slice', 2, true], ['E4', 'Studio core', 2, true],
  ['E5', 'Vision', 1, false], ['E6', 'Builder and public site', 2, false], ['E7', 'SDK apps, paywall, AI tools', 2, false], ['E8', 'Scale and hardening', 2, false]];
SW.SPRINTS = [['S1', '2026-10-12', 'E0'], ['S2–3', '2026-10-26', 'E1'], ['S4–5', '2026-11-23', 'E2'], ['Buffer', '2026-12-21', ''], ['S6–7', '2027-01-04', 'E3'],
  ['S8–9', '2027-02-01', 'E4'], ['S10', '2027-03-01', 'E5'], ['S11–12', '2027-03-15', 'E6'], ['S13–14', '2027-04-12', 'E7'], ['S15–16', '2027-05-10', 'E8']];

SW.section({ name: '21 · Roadmap', page: PG.B, run: async () => {
  const s = h.section('21 · Roadmap');
  const W = 2400; const b = SW.board('21 / Roadmap', W, 'dark');
  SW.add(b, await SW.header('21', 'Roadmap', 'Seven milestones, M0 to M6, in two-week sprints. Dates are estimates, not promises. Live board: github.com/users/VelimirMueller/projects/7'));
  const tl = SW.panel('dark', { gap: 12, pad: [32, 40], fill: 'dark/bg', name: 'Timeline' });
  SW.add(tl, await SW.rule('01', 'Roadmap', 'dark'), await SW.t([
    '  M0       M1       M2       M3       M4       M5       M6',
    '  [>>]-----[  ]-----[  ]-----[  ]-----[  ]-----[  ]-----[  ]',
    '  2026-10  2026-11  2027-01  2027-02  2027-04  2027-05  2027-06',
    '  clean    spine    chat     MVP      public   paid +   cluster',
    '  slate    local    on dev   on prd   demo     SDK      ready',
    '',
    '  [>>] in progress    [  ] planned    [##] done'].join('\n'), 'mono/base', 'dark/accent-2-text', { name: 'ascii' }));
  SW.add(b, tl);

  // milestone board
  const cols = SW.row(16, { name: 'Board', align: 'MIN' });
  for (const [id, name, date, epics, proof, st, items] of SW.MILESTONES) {
    const c = SW.panel('dark', { gap: 14, pad: [24, 22], w: 300, r: 'md', name: 'Column / ' + id, stroke: st === 'Building' ? 'dark/accent-2' : 'dark/border' });
    if (st === 'Building') await h.effect(c, 'effects/glow-dark');
    const pill = await SW.inst('Status pill', { Status: st, Mode: 'Dark' }, 'status'); await SW.setText(pill, 'label', st === 'Building' ? 'In progress' : 'Planned');
    SW.add(c, await SW.t(id, 'display/5xl', 'dark/accent-2-text', { name: 'id' }), await SW.t(name, 'heading/xl', 'dark/fg', { w: 256, name: 'name' }),
      await SW.label(date + '  ·  ' + epics, 'dark/fg-subtle', { name: 'date' }), pill, await SW.t(proof, 'text/sm', 'dark/fg-muted', { w: 256, name: 'proof' }));
    for (const it of items) { const card = SW.row(10, { pad: [10, 12], r: 8, fill: 'dark/bg', stroke: 'dark/border-subtle', name: 'item' });
      SW.add(card, await SW.icon(st === 'Building' ? 'bolt' : 'chevron-right', 'dark', st === 'Building' ? 'accent-2-text' : 'fg-subtle', 14), await SW.t(it, 'text/sm', 'dark/fg', { name: 'item' })); SW.put(c, card, true); }
    SW.add(cols, c); }
  SW.add(b, cols);

  // epics + sprint calendar
  const ep = SW.row(24, { name: 'Epics and sprints', align: 'MIN' }); SW.put(b, ep, true);
  const et = SW.panel('dark', { gap: 0, pad: 0, w: 900, clip: true, name: 'Epics' });
  const eh = SW.row(16, { pad: [16, 24], fill: 'dark/surface-2', name: 'head' }); SW.add(eh, await SW.label('// Epics · MVP = E0 to E4', 'dark/fg-subtle')); SW.put(et, eh, true);
  for (const [id, n, sp, mvp] of SW.EPICS) { const r = SW.row(16, { pad: [12, 24], stroke: 'dark/border-subtle', name: 'epic/' + id }); SW.sides(r, 1, 0, 0, 0);
    const nm = await SW.t(n, 'text/sm', 'dark/fg', { name: 'name' });
    const bd = await SW.inst('Badge', { Kind: mvp ? 'Accent' : 'Neutral', Mode: 'Dark' }, 'mvp'); await SW.setText(bd, 'label', mvp ? 'MVP' : 'After MVP');
    SW.add(r, await SW.t(id, 'display/label-sm', 'dark/accent-2-text', { w: 40 }), nm, await SW.t(sp + (sp > 1 ? ' sprints' : ' sprint'), 'text/xs', 'dark/fg-subtle', { name: 'sprints' }), bd);
    SW.grow(nm); SW.put(et, r, true); }
  const cal = SW.panel('dark', { gap: 16, pad: 32, name: 'Sprint calendar' });
  SW.add(cal, await SW.label('// Sprint calendar · two weeks each · 2026-10-12 to 2027-06-04', 'dark/fg-subtle'));
  const strip = SW.row(8, { wrap: true, wrapGap: 8, w: 1180, name: 'sprints' });
  for (const [i, [sp, start, e]] of SW.SPRINTS.entries()) { const cur = i === 0, buf = !e;
    const c = SW.col(6, { pad: [14, 16], r: 'sm', w: 224, fill: cur ? 'dark/accent-2' : 'dark/bg', op: cur ? 0.14 : null, stroke: cur ? 'dark/accent-2' : 'dark/border', name: 'sprint/' + sp });
    if (buf) c.dashPattern = [4, 4];
    SW.add(c, await SW.t(sp, 'display/label-sm', cur ? 'dark/accent-2-text' : 'dark/fg', { name: 'sprint' }), await SW.t(start + (e ? '  ·  ' + e : '  ·  holidays'), 'text/xs', 'dark/fg-muted', { name: 'start' }));
    SW.add(strip, c); }
  SW.add(cal, strip); SW.add(ep, et, cal); SW.grow(cal);

  // design track
  const dw = SW.col(16, { name: 'Design track' });
  SW.add(dw, await SW.label('// Design track · runs beside the epics', 'dark/fg-subtle'));
  const design = SW.row(16, { name: 'steps' });
  for (const [d, r, st, label] of [['D1', '@synthwerk/tokens with group accents', 'Live', 'Released 0.2.0'], ['D2', 'Figma library (this file, #9)', 'Building', 'Built from code'],
    ['D3', 'synthwerk-ui package', 'Planned', 'Planned'], ['D4', 'Studio and widgets use synthwerk-ui', 'Planned', 'With E3, E4']]) {
    const c = SW.row(14, { pad: [16, 20], r: 'md', fill: 'dark/surface', stroke: st === 'Building' ? 'dark/accent-2' : 'dark/border', name: d });
    const pill = await SW.inst('Status pill', { Status: st, Mode: 'Dark' }, 'status'); await SW.setText(pill, 'label', label);
    SW.add(c, await SW.t(d, 'display/xl', 'dark/accent-2-text', { name: 'id' }), await SW.t(r, 'text/sm', 'dark/fg', { name: 'result' }), pill); SW.add(design, c); }
  SW.add(dw, design); SW.add(b, dw);
  return SW.finish(s, b, 'dark');
} });
