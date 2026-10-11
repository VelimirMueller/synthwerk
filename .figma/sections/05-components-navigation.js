// 02 · Components · Navigation — Tabs, Breadcrumbs, Pagination, Table row, Table, Nav bar, Footer.
SW.TABS = ['Overview', 'Tokens', 'Components', 'Changelog'];

SW.tabsComp = async (p, m) => {
  if (p.Kind === 'Segmented') { const c = SW.cmp('HORIZONTAL', { gap: 4, pad: 4, r: 'pill', fill: SW.r(m, 'surface-2'), stroke: SW.r(m, 'border'), align: 'CENTER' });
    for (const [i, l] of SW.TABS.entries()) { const t = SW.row(0, { pad: [8, 16], r: 'pill', name: 'tab-' + (i + 1), fill: i === 0 ? SW.r(m, 'bg') : null, stroke: i === 0 ? SW.r(m, 'border') : null });
      SW.add(t, await SW.t(l, i === 0 ? 'text/sm-strong' : 'text/sm', SW.r(m, i === 0 ? 'fg' : 'fg-muted'), { name: 'tab-' + (i + 1) })); SW.add(c, t); }
    return c; }
  const c = SW.cmp('HORIZONTAL', { gap: 28, stroke: SW.r(m, 'border'), align: 'MAX' }); SW.sides(c, 0, 0, 1, 0);
  for (const [i, l] of SW.TABS.entries()) { const t = SW.col(10, { name: 'tab-' + (i + 1) });
    SW.add(t, await SW.t(l, i === 0 ? 'text/sm-strong' : 'text/sm', SW.r(m, i === 0 ? 'fg' : 'fg-muted'), { name: 'tab-' + (i + 1) }));
    const ind = SW.rect(10, 2, i === 0 ? SW.r(m, 'accent-2') : null); ind.name = 'indicator'; SW.put(t, ind, true); SW.add(c, t); }
  return c; };

SW.crumbsComp = async (p, m) => { const c = SW.cmp('HORIZONTAL', { gap: 8, align: 'CENTER' });
  const items = p.Depth === '3' ? ['Synthwerk', 'Design system', 'Tokens'] : ['Synthwerk', 'Tokens'];
  for (const [i, it] of items.entries()) { const last = i === items.length - 1;
    if (i) SW.add(c, await SW.icon('chevron-right', m, 'fg-subtle', 14));
    SW.add(c, await SW.t(it, last ? 'text/sm-strong' : 'text/sm', SW.r(m, last ? 'fg' : 'fg-muted'), { name: 'crumb-' + (i + 1) })); }
  return c; };

SW.navIcon = async (m, kind, name) => { const i = await SW.inst('Icon button', { Kind: kind, State: 'Default', Mode: SW.M(m) }, 'button/' + name);
  await SW.swap(i, 'icon/plus', 'Icon', { Name: name, Mode: SW.M(m) }); return i; };

SW.pageComp = async (p, m) => { const c = SW.cmp('HORIZONTAL', { gap: 6, align: 'CENTER' });
  SW.add(c, await SW.navIcon(m, 'Ghost', 'chevron-left'));
  if (p.Kind === 'Numbers') for (const n of ['1', '2', '3', '…', '8']) { const cur = n === '2';
    const cell = SW.row(0, { w: 36, h: 36, r: 'pill', justify: 'CENTER', name: 'page-' + n, fill: cur ? SW.r(m, 'accent') : null });
    SW.add(cell, await SW.t(n, cur ? 'text/sm-strong' : 'text/sm', SW.r(m, cur ? 'accent-fg' : n === '…' ? 'fg-subtle' : 'fg-muted'), { name: 'page' })); SW.add(c, cell); }
  else SW.add(c, await SW.t('Page 2 of 8', 'text/sm', SW.r(m, 'fg-muted'), { name: 'label' }));
  SW.add(c, await SW.navIcon(m, 'Ghost', 'chevron-right')); return c; };

SW.COLW = [280, 420, 200, 140];
SW.rowComp = async (p, m) => { const head = p.Kind === 'Header';
  const c = SW.cmp('HORIZONTAL', { gap: 24, pad: [14, 20], w: 1120, fill: SW.r(m, head || p.Kind === 'Selected' ? 'surface-2' : 'surface'), stroke: SW.r(m, 'border') });
  SW.sides(c, 0, 0, 1, 0);
  const cells = head ? ['Repo', 'Role', 'Milestone', 'Status'] : ['synthwerk-vision', 'Image labels per tenant', 'M4 · Public demo'];
  for (let i = 0; i < 3; i++) SW.add(c, head ? await SW.label(cells[i], SW.r(m, 'fg-subtle'), { name: 'cell-' + (i + 1), w: SW.COLW[i] })
    : await SW.t(cells[i], i === 0 ? 'mono/sm' : 'text/sm', SW.r(m, i === 0 ? 'fg' : 'fg-muted'), { name: 'cell-' + (i + 1), w: SW.COLW[i] }));
  SW.add(c, head ? await SW.label('Status', SW.r(m, 'fg-subtle'), { name: 'cell-4' }) : await SW.inst('Status pill', { Status: p.Kind === 'Selected' ? 'Live' : 'Building', Mode: SW.M(m) }, 'status'));
  if (p.Kind === 'Selected') { const bar = SW.rect(2, 20, SW.r(m, 'accent-2')); bar.name = 'selected'; SW.over(c, bar, 0, 0); bar.resize(2, Math.max(20, c.height)); bar.constraints = { horizontal: 'MIN', vertical: 'STRETCH' }; }
  return c; };

SW.tableComp = async (p, m) => { const c = SW.cmp('VERTICAL', { w: 1120, r: 'md', clip: true, stroke: SW.r(m, 'border'), fill: SW.r(m, 'surface') });
  SW.put(c, await SW.inst('Table row', { Kind: 'Header', Mode: SW.M(m) }, 'header'), true);
  for (const [i, [repo, role, ms, st]] of [['synthwerk', 'Docs hub, roadmap, board', 'M0 · Clean slate', 'Building'], ['synthwerk-sdk', 'npm packages, tokens 0.2.0', 'M5 · SDK apps', 'Live'],
    ['synthwerk-vision', 'Image labels per tenant', 'M4 · Public demo', 'Building'], ['synthwerk-llm', 'Chat gateway, MCP tools', 'M2 · Chat on dev', 'Planned']].entries()) {
    const r = await SW.inst('Table row', { Kind: i === 1 ? 'Selected' : 'Body', Mode: SW.M(m) }, 'row-' + (i + 1));
    await SW.texts(r, { 'cell-1': repo, 'cell-2': role, 'cell-3': ms }); await SW.swap(r, 'status', 'Status pill', { Status: st, Mode: SW.M(m) });
    SW.put(c, r, true); }
  return c; };

SW.navComp = async (p, m) => { const desk = p.Kind === 'Desktop';
  const c = SW.cmp('HORIZONTAL', { gap: 32, pad: [12, 12, 12, 24], r: 'md', w: desk ? 1120 : 390, justify: 'SPACE_BETWEEN', fill: SW.r(m, 'surface'), op: 0.85, stroke: SW.r(m, 'border') });
  SW.add(c, await SW.t('SYNTHWERK.', 'display/xl', SW.r(m, 'fg'), { name: 'wordmark' }));
  if (desk) { const links = SW.row(28, { name: 'links' });
    for (const [i, l] of ['Platform', 'Widgets', 'SDK', 'Docs', 'Roadmap'].entries()) SW.add(links, await SW.t(l, i === 0 ? 'text/sm-strong' : 'text/sm', SW.r(m, i === 0 ? 'fg' : 'fg-muted'), { name: 'link-' + (i + 1) }));
    const right = SW.row(8, { name: 'actions' }); const cta = await SW.inst('Button', { Kind: 'Primary', Size: 'sm', State: 'Default', Mode: SW.M(m) }, 'cta');
    await SW.setText(cta, 'label', 'Start building');
    SW.add(right, await SW.navIcon(m, 'Ghost', 'github'), await SW.navIcon(m, 'Ghost', m === 'dark' ? 'sun' : 'moon'), cta); SW.add(c, links, right); }
  else SW.add(c, await SW.navIcon(m, 'Outline', 'menu'));
  return c; };

SW.footerComp = async (p, m) => { const c = SW.cmp('VERTICAL', { gap: 40, pad: [48, 40, 32, 40], w: 1120, fill: SW.r(m, 'bg'), stroke: SW.r(m, 'border') }); SW.sides(c, 1, 0, 0, 0);
  const top = SW.row(64, { align: 'MIN', name: 'columns' });
  const brand = SW.col(14, { w: 360, name: 'brand' });
  SW.add(brand, await SW.t('SYNTHWERK.', 'display/xl', SW.r(m, 'fg'), { name: 'wordmark' }),
    await SW.t('Self-hosted AI for any website. Chat, vision and an SDK. Yours.', 'text/sm', SW.r(m, 'fg-muted'), { w: 320, name: 'tagline' }),
    await SW.inst('Badge', { Kind: 'Accent', Mode: SW.M(m) }, 'group'));
  SW.add(top, brand);
  for (const [title, items] of [['Product', ['Widgets', 'Studio', 'Pricing']], ['Developers', ['SDK', 'Tokens', 'Docs']], ['Project', ['Roadmap', 'Board', 'GitHub']]]) {
    const col = SW.col(12, { name: 'col/' + title.toLowerCase() }); SW.add(col, await SW.label(title, SW.r(m, 'fg-subtle')));
    for (const it of items) SW.add(col, await SW.t(it, 'text/sm', SW.r(m, 'fg-muted'), { name: 'link' })); SW.add(top, col); }
  const bot = SW.row(24, { justify: 'SPACE_BETWEEN', pad: [24, 0, 0, 0], stroke: SW.r(m, 'border-subtle'), name: 'legal' }); SW.sides(bot, 1, 0, 0, 0);
  SW.add(bot, await SW.label('VM. studio / flagship', SW.r(m, 'accent-2-text')), await SW.t('© 2026 Velimir Müller · MIT', 'text/xs', SW.r(m, 'fg-subtle'), { name: 'legal' }),
    await SW.inst('Status pill', { Status: 'Live', Mode: SW.M(m) }, 'status'));
  SW.put(c, top, true); SW.put(c, bot, true); return c; };

SW.section({ name: '02 · Components · Navigation', page: PG.D, run: async () => {
  const s = h.section('02 · Components · Navigation');
  const b = SW.board('02 / Components · Navigation', SW.W, 'dark');
  SW.add(b, await SW.header('02', 'Navigation', 'Bars, tabs, trails, pages and tables. The nav bar is a glass surface at 85 % with one white pill. Tables use surface-2 for the header and a 1 px row border.'));
  await SW.set(b, 'Tabs', 'Segmented = pill group; the active tab sits on the page colour. Underline = 2 px accent-2 indicator.', [['Kind', ['Segmented', 'Underline']]], SW.tabsComp);
  await SW.set(b, 'Breadcrumbs', 'Trail with chevrons in fg-subtle. The current page is fg, semibold, not a link.', [['Depth', ['2', '3']]], SW.crumbsComp);
  await SW.set(b, 'Pagination', 'Ghost icon buttons for previous and next. The current page is the accent pill.', [['Kind', ['Numbers', 'Compact']]], SW.pageComp);
  await SW.set(b, 'Table row', 'Header on surface-2 with capital labels. Body on surface. Selected = surface-2 with a 2 px accent-2 bar. Status cell = Status pill instance.',
    [['Kind', ['Header', 'Body', 'Selected']]], SW.rowComp, { colAxis: null });
  await SW.set(b, 'Table', 'Table built from Table row instances, radius-md, 1 px border, clipped.', [], SW.tableComp, { colAxis: null });
  await SW.set(b, 'Nav bar', 'Wordmark left, links in the middle, icon buttons and one primary pill right. Mobile: wordmark and the menu button.',
    [['Kind', ['Desktop', 'Mobile']]], SW.navComp, { colAxis: null });
  await SW.set(b, 'Footer', 'Wordmark, tagline, group badge, three link columns, legal row with the live status.', [], SW.footerComp, { colAxis: null });
  return SW.finish(s, b, 'dark');
} });
