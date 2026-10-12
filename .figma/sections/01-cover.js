// 00 · Cover — the front door of the file: wordmark on the flagship art, what Synthwerk is, the file map.
SW.pill = async (str, m, kind) => { m = SW.m(m); const solid = kind === 'solid';
  const p = SW.row(8, { pad: [6, 14], r: 'pill', name: 'pill', fill: solid ? SW.r(m, 'accent') : null, stroke: solid ? null : SW.r(m, kind === 'status' ? 'success' : 'border-control'), sop: kind === 'status' ? 0.4 : null });
  if (kind === 'status') { SW.f(p, SW.r(m, 'success'), 0.1); SW.add(p, SW.dot(7, SW.r(m, 'success'))); }
  SW.add(p, await SW.label(str, SW.r(m, solid ? 'accent-fg' : kind === 'status' ? 'success' : 'fg-muted'))); return p; };

SW.section({ name: '00 · Cover', page: PG.D, run: async () => {
  const s = h.section('00 · Cover', 0, 0, ['Synthwerk Design System']);
  const b = SW.board('00 / Cover', SW.W, 'dark'); b.paddingTop = b.paddingLeft = b.paddingRight = b.paddingBottom = 0; b.itemSpacing = 0;

  // hero: full-bleed flagship art, wordmark, status
  const hero = await SW.art('synthwerk/synthwerk.jpg', SW.W, 860, { name: 'Hero', side: true, pad: 96, gap: 32, r: 0, stroke: false });
  const top = SW.row(12, { name: 'status' });
  SW.add(top, await SW.pill('Design system · v1', 'dark', 'solid'), await SW.pill('Tokens 0.2.0 · synced', 'dark', 'status'), await SW.pill('Figma library · synthwerk#9', 'dark'));
  SW.add(hero, top, await SW.t('SYNTHWERK.', 'display/9xl', 'dark/fg', { name: 'wordmark' }),
    await SW.t('One visual language for every Synthwerk surface: READMEs, sites, the studio and the widgets. The tokens are the source. Figma and code read the same values.', 'text/lg', 'dark/fg-muted', { w: 820, name: 'tagline' }));
  SW.put(b, hero, true);

  // about + file map
  const body = SW.row(64, { pad: [96, 96], name: 'About', align: 'MIN' }); SW.put(b, body, true);
  const left = SW.col(24, { w: 620, name: 'What it is' });
  SW.add(left, await SW.label('// 01  What Synthwerk is', 'dark/accent-2-text'),
    await SW.t('A self-hosted AI platform you can drop into any website or build on.', 'heading/3xl', 'dark/fg', { w: 620 }),
    await SW.t('Chat and vision widgets, an SDK and a studio to run it. Each service is its own repo. All of them share one look: this file.', 'text/base', 'dark/fg-muted', { w: 620 }));
  const flow = SW.col(0, { pad: [20, 24], r: 'sm', fill: 'dark/surface', stroke: 'dark/border', name: 'flow' });
  SW.add(flow, await SW.t([
    '+-----------+     +-----------+     +--------------+',
    '|  tokens   | --> |   Figma   | --> | synthwerk-ui |',
    '| released  |     | this file |     |   planned    |',
    '+-----------+     +-----------+     +--------------+'].join('\n'), 'display/label-sm', 'dark/fg-muted', { name: 'ascii' }));
  SW.add(left, flow);
  const map = SW.panel('dark', { gap: 0, pad: 0, name: 'File map', clip: true });
  const mh = SW.row(12, { pad: [18, 24], name: 'map-head', fill: 'dark/surface-2' }); SW.add(mh, await SW.label('// 02  What is in this file', 'dark/fg-subtle'));
  SW.put(map, mh, true);
  for (const pg of [PG.D, PG.T, PG.B]) {
    const row = SW.row(24, { pad: [18, 24], name: 'page/' + pg, align: 'MIN', stroke: 'dark/border-subtle' }); SW.sides(row, 1, 0, 0, 0);
    const pn = await SW.t(pg, 'text/base-strong', 'dark/fg', { w: 200 });
    const list = SW.col(6, { name: 'sections' });
    for (const sec of (B[pack.id] || []).filter(x => x.page === pg)) SW.add(list, await SW.t(sec.name, 'display/label-sm', 'dark/fg-muted'));
    SW.add(row, pn, list); SW.put(map, row, true); }
  SW.add(body, left, map); SW.grow(map);

  // footer strip
  const foot = SW.row(32, { pad: [28, 96], justify: 'SPACE_BETWEEN', stroke: 'dark/border', name: 'Footer' }); SW.sides(foot, 1, 0, 0, 0);
  SW.add(foot, await SW.label('Source  @synthwerk/tokens 0.2.0  ·  github.com/VelimirMueller/synthwerk', 'dark/fg-subtle'),
    await SW.label('VM. studio / flagship', 'dark/accent-2-text'));
  SW.put(b, foot, true);
  return SW.finish(s, b, 'dark');
} });
