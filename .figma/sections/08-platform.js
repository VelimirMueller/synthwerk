// 10 · Platform — the eight synthwerk-* repos, each with its art, role, stack and status (repo descriptions of 2026-10-11).
SW.PLATFORM = [
  ['synthwerk', 'Hub', 'The front door: map of all repos, docs, roadmap and board.', 'Markdown · ASCII', 'Building'],
  ['synthwerk-sdk', 'SDK', 'Design tokens today. Core client, Vue and React bindings, create-synthwerk-app next.', 'TypeScript · npm', 'Live'],
  ['synthwerk-blueprint', 'CI', 'Shared CI workflows, Biome, Go and Python lint configs, README, ADR and PR templates.', 'GitHub Actions', 'Building'],
  ['synthwerk-vision', 'Service', 'Open-vocabulary, hierarchical image classifier.', 'FastAPI · ONNX SigLIP 2', 'Building'],
  ['synthwerk-llm', 'Service', 'LLM gateway: local models in dev, any provider in prod, scoped AI, SSE streaming.', 'Go', 'Planned'],
  ['synthwerk-identity', 'Service', 'Orgs, roles, entitlements and paywall on top of Zitadel.', 'Go · Zitadel', 'Planned'],
  ['synthwerk-widgets', 'Front end', 'Embeddable AI chat and vision widgets.', 'Vue custom elements · iframe', 'Planned'],
  ['synthwerk-studio', 'Front end', 'Landing page builder, admin dashboard and live health.', 'Nuxt 4', 'Planned'],
];

SW.section({ name: '10 · Platform', page: PG.T, run: async () => {
  const s = h.section('10 · Platform');
  const b = SW.board('10 / Platform', SW.W, 'dark');
  SW.add(b, await SW.header('10', 'Platform', 'Eight repos. Each service and front end is its own synthwerk-<name> repo. One look, one token set, one board. Rewrites start from the legacy-final tags.'));
  const grid = SW.row(24, { wrap: true, wrapGap: 24, w: SW.W - 192, name: 'Repos', align: 'MIN' });
  for (const [name, kind, what, stack, st] of SW.PLATFORM) {
    const c = SW.panel('dark', { gap: 0, pad: 0, w: 692, clip: true, name: 'Repo / ' + name });
    const a = await SW.art('synthwerk/' + name + '.jpg', 692, 280, { name: 'art', pad: [24, 28], gap: 8, r: 0, stroke: false });
    const kb = await SW.inst('Badge', { Kind: 'Neutral', Mode: 'Dark' }, 'kind'); await SW.setText(kb, 'label', kind);
    SW.add(a, kb, await SW.t(name, 'display/3xl', 'dark/fg', { name: 'name' }));
    const body = SW.col(16, { pad: [20, 28, 24, 28], name: 'body' });
    SW.put(body, await SW.t(what, 'text/base', 'dark/fg-muted', { w: 636, name: 'what' }), true);
    const meta = SW.row(12, { justify: 'SPACE_BETWEEN', name: 'meta' });
    const sk = SW.row(8, { name: 'stack' }); SW.add(sk, await SW.icon('code', 'dark', 'fg-subtle', 16), await SW.t(stack, 'display/label-sm', 'dark/fg-subtle', { name: 'stack' }));
    SW.add(meta, sk, await SW.inst('Status pill', { Status: st, Mode: 'Dark' }, 'status')); SW.put(body, meta, true);
    SW.put(c, a, true); SW.put(c, body, true); SW.add(grid, c); }
  SW.put(b, grid, true);
  const legend = SW.row(24, { name: 'Legend' });
  for (const st of ['Live', 'Building', 'Planned']) SW.add(legend, await SW.inst('Status pill', { Status: st, Mode: 'Dark' }, 'legend/' + st.toLowerCase()));
  SW.add(legend, await SW.t('Live = released and used. Building = work in the current milestone. Planned = rewrite later, old code at tag legacy-final.', 'text/sm', 'dark/fg-subtle', { name: 'note' }));
  SW.add(b, legend);
  return SW.finish(s, b, 'dark');
} });
