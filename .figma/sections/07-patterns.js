// 03 · Patterns — page sections built from component instances: hero, stats row, feature cards, flow diagram,
// status table, plan block, README banner. Copy a pattern, then change text and art. Do not detach.
SW.REPOS = [
  ['synthwerk', 'hub', 'Docs hub, roadmap, board. The front door.', 'Building', 'M0 · Clean slate'],
  ['synthwerk-sdk', 'sdk', 'npm packages. @synthwerk/tokens 0.2.0 is out.', 'Live', 'M5 · SDK apps'],
  ['synthwerk-blueprint', 'ci', 'Shared CI, lint configs, repo templates.', 'Building', 'M0 · Clean slate'],
  ['synthwerk-vision', 'service', 'Image labels per tenant. Kept from the old stack.', 'Building', 'M4 · Public demo'],
  ['synthwerk-llm', 'service', 'Chat gateway. Reads services through MCP tools.', 'Planned', 'M2 · Chat on dev'],
  ['synthwerk-identity', 'service', 'Passkeys, orgs, roles, widget tokens.', 'Planned', 'M2 · Chat on dev'],
  ['synthwerk-widgets', 'front end', 'Chat and vision widgets for any page.', 'Planned', 'M2 · Chat on dev'],
  ['synthwerk-studio', 'front end', 'Build and admin. Health view, AI settings.', 'Planned', 'M3 · MVP on prd'],
];
SW.pattern = async (b, title, note) => { const w = SW.col(28, { name: 'Pattern / ' + title }); SW.put(b, w, true);
  SW.add(w, await SW.block('Pattern', title, note)); return w; };

SW.section({ name: '03 · Patterns', page: PG.D, run: async () => {
  const s = h.section('03 · Patterns');
  const b = SW.board('03 / Patterns', SW.W, 'dark'); const IN = SW.W - 192;
  SW.add(b, await SW.header('03', 'Patterns', 'Page sections built from component instances. Copy a pattern, then change text and art through the instance properties. Do not detach: a change in the component reaches every page.'));

  // hero
  const hw = await SW.pattern(b, 'Hero', 'Flagship art with a left fade, glass nav bar, status, display headline, two actions and the install command.');
  const hero = await SW.art('synthwerk/flagship-base.jpg', IN, 780, { name: 'Hero', side: true, pad: [24, 64, 72, 64], gap: 28, align: 'MIN' });
  SW.put(hero, await SW.inst('Nav bar', { Kind: 'Desktop', Mode: 'Dark' }, 'nav'), true);
  const sp = SW.spacer(); SW.add(hero, sp); SW.grow(sp);
  SW.add(hero, await SW.inst('Status pill', { Status: 'Live', Mode: 'Dark' }, 'status'),
    await SW.t('AI for your website.\nSelf-hosted. Yours.', 'display/7xl', 'dark/fg', { w: 1000, name: 'headline' }),
    await SW.t('Drop in chat and vision with one script tag, or build on the SDK. Every service runs on your own server.', 'text/lg', 'dark/fg-muted', { w: 640, name: 'lead' }));
  const ctas = SW.row(12, { name: 'actions' });
  SW.add(ctas, await SW.button('dark', 'Primary', 'md', 'Get started'), await SW.button('dark', 'Secondary', 'md', 'Read the docs'), await SW.inst('Terminal snippet', { Kind: 'Command', Mode: 'Dark' }, 'install'));
  SW.add(hero, ctas); SW.put(hw, hero, true);

  // stats row: live numbers from this file
  const sw = await SW.pattern(b, 'Stats row', 'Four facts in Space Mono, one row, 1 px dividers. The numbers below are read from this file at build time.');
  await SW.reindex(); const sets = Object.values(SW.idx); const nComp = sets.reduce((a, x) => a + x.children.length, 0);
  const nVar = (await figma.variables.getLocalVariablesAsync()).length;
  const stats = SW.row(0, { r: 'card', clip: true, fill: 'dark/surface', stroke: 'dark/border', name: 'Stats row', align: 'MIN' });
  for (const [i, [n, l, badge]] of [['8', 'Repos, one look', 'Flagship'], [String(nVar), 'Figma variables', 'Synced'], [String(sets.length) + ' / ' + nComp, 'Sets / variants', 'Mode=Dark|Light'], ['0.2.0', 'Tokens released', 'npm']].entries()) {
    const c = SW.col(10, { pad: 32, name: 'stat-' + (i + 1), stroke: 'dark/border' }); SW.sides(c, 0, i < 3 ? 1 : 0, 0, 0);
    const bd = await SW.inst('Badge', { Kind: i === 1 ? 'Accent' : 'Neutral', Mode: 'Dark' }, 'badge'); await SW.setText(bd, 'label', badge);
    SW.add(c, await SW.t(n, 'display/5xl', 'dark/fg', { name: 'value' }), await SW.label(l, 'dark/fg-subtle', { name: 'label' }), bd);
    SW.add(stats, c); SW.grow(c); }
  SW.put(sw, stats, true);

  // feature cards
  const fw = await SW.pattern(b, 'Feature cards', 'Three Card instances. Art, eyebrow, title and body are overrides; the footer status is a nested Status pill.');
  const feats = SW.row(24, { name: 'Feature cards', align: 'MIN' });
  for (const [art, eyebrow, title, body, st] of [['synthwerk-widgets', '// Drop in', 'Widgets', 'Chat and vision on any page with one script tag.', 'Planned'],
    ['synthwerk-llm', '// Gateway', 'LLM', 'One gateway for every model. Reads services through MCP tools.', 'Planned'],
    ['synthwerk-studio', '// Operate', 'Studio', 'Build pages, manage users, watch health. One admin.', 'Planned']]) {
    const c = await SW.inst('Card', { Media: 'Art', Mode: 'Dark' }, 'card/' + title.toLowerCase());
    await SW.texts(c, { eyebrow, title, body }); await SW.swap(c, 'status', 'Status pill', { Status: st, Mode: 'Dark' });
    const media = c.findOne ? c.findOne(n => n.name === 'media') : null;
    if (media) await h.imgFill(media, 'synthwerk/' + art + '.jpg', { under: [SW.c('dark/surface')], over: [h.grad([[0, SW.hex['dark/surface'], 0], [1, SW.hex['dark/surface'], 0.9]], 90)] });
    SW.add(feats, c); SW.grow(c); }
  SW.put(fw, feats, true);

  // flow diagram
  const dw = await SW.pattern(b, 'Flow diagram', 'Boxes on the page colour, 1 px border, the active step in accent-2. Arrows are Icon instances. Each step carries its status.');
  const flow = SW.row(16, { pad: 40, r: 'card', fill: 'dark/surface', stroke: 'dark/border', name: 'Flow' });
  const steps = [['layers', 'tokens', 'released · 0.2.0', 'Live'], ['cube', 'Figma', 'this file · vfb', 'Building'], ['code', 'synthwerk-ui', 'components in code', 'Planned'], ['eye', 'products', 'studio · widgets', 'Planned']];
  for (const [i, [ic, n, sub, st]] of steps.entries()) {
    const bx = SW.col(12, { pad: 24, r: 'md', w: 270, fill: 'dark/bg', stroke: i === 1 ? 'dark/accent-2' : 'dark/border', name: 'step/' + n });
    SW.add(bx, await SW.icon(ic, 'dark', i === 1 ? 'accent-2-text' : 'fg-muted', 24), await SW.t(n, 'display/xl', 'dark/fg', { name: 'title' }),
      await SW.t(sub, 'text/sm', 'dark/fg-muted', { name: 'sub' }), await SW.inst('Status pill', { Status: st, Mode: 'Dark' }, 'status'));
    SW.add(flow, bx); if (i < steps.length - 1) SW.add(flow, await SW.icon('arrow-right', 'dark', 'accent-2-text', 24)); }
  SW.add(dw, flow);

  // status table
  const tw = await SW.pattern(b, 'Status table', 'Table row instances: one header, one row per repo. The status cell is a nested Status pill, swapped per row.');
  const table = SW.col(0, { r: 'md', clip: true, stroke: 'dark/border', name: 'Status table', w: 1120 });
  SW.put(table, await SW.inst('Table row', { Kind: 'Header', Mode: 'Dark' }, 'header'), true);
  for (const [name, , what, st, ms] of SW.REPOS) { const r = await SW.inst('Table row', { Kind: 'Body', Mode: 'Dark' }, 'row/' + name);
    await SW.texts(r, { 'cell-1': name, 'cell-2': what, 'cell-3': ms }); await SW.swap(r, 'status', 'Status pill', { Status: st, Mode: 'Dark' }); SW.put(table, r, true); }
  SW.add(tw, table);

  // plan block
  const pw = await SW.pattern(b, 'Plan block', 'Three plans side by side. The recommended plan has the accent-2 border and the dark glow. Paid plans arrive with M5: the prices are placeholders.');
  const plans = SW.row(24, { name: 'Plans', align: 'MIN' });
  for (const [name, price, per, note, items, hot] of [['Free', '€0', 'forever', 'One site, one widget, community support.', ['1 chat widget', '1,000 messages / month', 'Passkey sign-in'], false],
    ['Team', '€29', 'per month', 'For teams that ship AI features every week.', ['5 widgets, chat and vision', '50,000 messages / month', 'Roles and audit log', 'Email support'], true],
    ['Self-hosted', 'Your server', 'MIT core', 'Run every service yourself. Same images, your data.', ['Unlimited widgets', 'Local models', 'k3s ready (M6)'], false]]) {
    const c = SW.panel('dark', { gap: 20, pad: 32, name: 'plan/' + name.toLowerCase(), stroke: hot ? 'dark/accent-2' : 'dark/border' });
    if (hot) await h.effect(c, 'effects/glow-dark');
    const top = SW.row(12, { justify: 'SPACE_BETWEEN', name: 'head' }); SW.add(top, await SW.t(name, 'heading/2xl', 'dark/fg', { name: 'plan' }));
    if (hot) { const bd = await SW.inst('Badge', { Kind: 'Accent', Mode: 'Dark' }, 'badge'); await SW.setText(bd, 'label', 'Recommended'); SW.add(top, bd); }
    SW.put(c, top, true);
    const pr = SW.row(10, { align: 'MAX', name: 'price' }); SW.add(pr, await SW.t(price, price.length > 5 ? 'display/3xl' : 'display/5xl', 'dark/fg', { name: 'amount' }), await SW.t(per, 'text/sm', 'dark/fg-subtle', { name: 'period' }));
    SW.add(c, pr); SW.put(c, await SW.t(note, 'text/sm', 'dark/fg-muted', { w: 380, name: 'note' }), true);
    const dv = await SW.inst('Divider', { Kind: 'Line', Mode: 'Dark' }, 'divider'); SW.put(c, dv, true);
    for (const it of items) { const r = SW.row(10, { name: 'feature' }); SW.add(r, await SW.icon('check', 'dark', 'accent-2-text', 16), await SW.t(it, 'text/sm', 'dark/fg', { name: 'item' })); SW.add(c, r); }
    const btn = await SW.button('dark', hot ? 'Primary' : 'Secondary', 'md', hot ? 'Start with Team' : name === 'Free' ? 'Start free' : 'Read the guide'); SW.put(c, btn, true);
    SW.add(plans, c); SW.grow(c); }
  SW.put(pw, plans, true);

  // README banner
  const rw = await SW.pattern(b, 'README banner', 'Top of every synthwerk-* README: art banner, wordmark, badges, then the ASCII rule and the install command.');
  const banner = await SW.art('synthwerk/synthwerk.jpg', 1280, 320, { name: 'README banner', side: true, pad: [48, 56], gap: 16, align: 'CENTER' });
  const badges = SW.row(8, { name: 'badges' });
  const b1 = await SW.inst('Badge', { Kind: 'Accent', Mode: 'Dark' }, 'badge/group'); const b2 = await SW.inst('Badge', { Kind: 'Neutral', Mode: 'Dark' }, 'badge/lang');
  SW.add(badges, b1, b2, await SW.inst('Status pill', { Status: 'Building', Mode: 'Dark' }, 'status'));
  SW.add(banner, badges, await SW.t('SYNTHWERK.', 'display/7xl', 'dark/fg', { name: 'wordmark' }), await SW.t('Modular AI services that you run yourself.', 'text/lg', 'dark/fg-muted', { name: 'tagline' }));
  const stack = SW.col(20, { name: 'README top' });
  SW.add(stack, banner, await SW.inst('ASCII rule', { Kind: 'Rule', Mode: 'Dark' }, 'rule'), await SW.inst('Terminal snippet', { Kind: 'Command', Mode: 'Dark' }, 'install'));
  SW.add(rw, stack);
  return SW.finish(s, b, 'dark');
} });
