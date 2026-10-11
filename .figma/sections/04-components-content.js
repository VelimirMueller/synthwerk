// 02 · Components · Content — Status pill, Badge, Avatar, Card, Divider, ASCII rule, Terminal snippet, Code block.
SW.SERVICES = ['Studio', 'LLM', 'Vision', 'Pulse', 'Identity', 'Widgets'];

SW.statusComp = async (p, m) => { const role = SW.STATUS[p.Status];
  const c = SW.cmp('HORIZONTAL', { gap: 8, pad: [5, 12], r: 'pill', align: 'CENTER' });
  SW.f(c, SW.r(m, role), 0.1); SW.s(c, SW.r(m, role), 1, 0.4);
  SW.add(c, SW.dot(7, SW.r(m, role)), await SW.label(p.Status, SW.r(m, role), { name: 'label' })); return c; };

SW.badgeComp = async (p, m) => { const c = SW.cmp('HORIZONTAL', { gap: 6, pad: [4, 10], r: 'pill', align: 'CENTER' }); let role, text;
  if (p.Kind === 'Neutral') { SW.s(c, SW.r(m, 'border-control')); role = SW.r(m, 'fg-muted'); text = 'TypeScript'; }
  else if (p.Kind === 'Accent') { SW.f(c, SW.r(m, 'accent-2'), 0.14); SW.s(c, SW.r(m, 'accent-2'), 1, 0.5); role = SW.r(m, 'accent-2-text'); text = 'Flagship'; }
  else if (p.Kind === 'Solid') { SW.f(c, SW.r(m, 'accent')); role = SW.r(m, 'accent-fg'); text = 'New'; }
  else { const k = p.Kind.toLowerCase(); SW.f(c, 'service/' + k + '/dark', (SW.num[SW.r(m, 'badge-service-tint')] || 14) / 100);
    SW.add(c, SW.rect(3, 12, 'service/' + k + '/dark', null, 2)); role = 'service/' + k + '/' + m; text = p.Kind; }
  SW.add(c, await SW.label(text, role, { name: 'label' })); return c; };

SW.avatarComp = async (p, m) => { const d = { sm: 24, md: 32, lg: 48 }[p.Size];
  const c = SW.cmp('HORIZONTAL', { r: 'pill', w: d, h: d, align: 'CENTER', justify: 'CENTER', clip: true });
  if (p.Kind === 'Initials') { SW.f(c, SW.r(m, 'surface-2')); SW.s(c, SW.r(m, 'border'));
    SW.add(c, await SW.t('VM', { sm: 'display/label-xs', md: 'text/sm-strong', lg: 'text/base-strong' }[p.Size], SW.r(m, 'fg'), { name: 'initials' })); }
  else { await h.imgFill(c, 'synthwerk/synthwerk-identity.jpg', { under: [SW.c(SW.r(m, 'surface-2'))] }); SW.s(c, SW.r(m, 'border')); }
  return c; };

SW.cardComp = async (p, m) => { const c = SW.cmp('VERTICAL', { r: 'card', w: 360, clip: true, fill: SW.r(m, 'surface'), stroke: SW.r(m, 'border') });
  if (m === 'light') await h.effect(c, 'effects/shadow-card-light');
  if (p.Media === 'Art') { const media = figma.createFrame(); media.name = 'media'; media.resize(360, 180); media.clipsContent = true;
    const sf = SW.hex[SW.r(m, 'surface')] || '#131318';
    await h.imgFill(media, 'synthwerk/synthwerk-vision.jpg', { under: [SW.c(SW.r(m, 'surface'))], over: [h.grad([[0, sf, m === 'light' ? 0.25 : 0], [1, sf, 0.9]], 90)] });
    SW.put(c, media, true); }
  const body = SW.col(12, { pad: 24, name: 'body' });
  SW.add(body, await SW.label('// Service', SW.r(m, 'accent-2-text'), { name: 'eyebrow' }), await SW.t('Vision', 'heading/2xl', SW.r(m, 'fg'), { name: 'title' }));
  SW.put(body, await SW.t('Image labels per tenant. Upload, classify and review in one place.', 'text/sm', SW.r(m, 'fg-muted'), { w: 312, name: 'body' }), true);
  const foot = SW.row(12, { justify: 'SPACE_BETWEEN', name: 'footer', pad: [8, 0, 0, 0] });
  SW.add(foot, await SW.inst('Status pill', { Status: 'Building', Mode: SW.M(m) }, 'status'), await SW.icon('arrow-right', m, 'fg-muted', 18));
  SW.put(body, foot, true); SW.put(c, body, true); return c; };

SW.dividerComp = async (p, m) => {
  if (p.Kind === 'Vertical') { const c = SW.cmp('VERTICAL', { w: 1, h: 48 }); const r = SW.rect(1, 48, SW.r(m, 'border')); r.name = 'line'; SW.add(c, r); SW.fillV(r); return c; }
  const c = SW.cmp('HORIZONTAL', { gap: 16, w: 480, align: 'CENTER' });
  const a = SW.rect(10, 1, SW.r(m, 'border')); a.name = 'line'; SW.add(c, a); SW.grow(a);
  if (p.Kind === 'Label') { SW.add(c, await SW.label('or', SW.r(m, 'fg-subtle'), { name: 'label' }));
    const z = SW.rect(10, 1, SW.r(m, 'border')); z.name = 'line'; SW.add(c, z); SW.grow(z); }
  return c; };

SW.asciiComp = async (p, m) => {
  if (p.Kind === 'Rule') { const c = SW.cmp('HORIZONTAL', {}); SW.add(c, await SW.rule('01', 'Design system', m)); return c; }
  const c = SW.cmp('VERTICAL', { w: 1120 });
  const a = await SW.art('synthwerk/strip-2.jpg', 1120, 144, { mode: m, dir: 'HORIZONTAL', pad: [0, 40], gap: 24, align: 'MIN', r: 'md', side: true, fade: m === 'light' ? undefined : false, name: 'strip' });
  a.counterAxisAlignItems = 'CENTER';
  SW.add(a, await SW.t('06', 'display/5xl', SW.r(m, 'accent-2-text'), { name: 'index' }), await SW.t('DESIGN SYSTEM. ONE SOURCE. NO DRIFT.', 'display/xl', SW.r(m, 'fg'), { name: 'label' }));
  SW.put(c, a, true); return c; };

SW.terminalComp = async (p, m) => { const surf = SW.r(m, m === 'dark' ? 'surface' : 'surface-2');
  if (p.Kind === 'Command') { const c = SW.cmp('HORIZONTAL', { gap: 12, pad: [12, 16], r: 'sm', w: 420, fill: surf, stroke: SW.r(m, 'border') });
    const cmd = await SW.t('npm i @synthwerk/tokens', 'display/label-sm', SW.r(m, 'fg'), { name: 'command' });
    SW.add(c, await SW.t('$', 'display/label-sm', SW.r(m, 'accent-2-text'), { name: 'prompt' }), cmd, await SW.icon('copy', m, 'fg-subtle', 16)); SW.grow(cmd); return c; }
  const c = SW.cmp('VERTICAL', { r: 'sm', w: 560, clip: true, fill: surf, stroke: SW.r(m, 'border') });
  const bar = SW.row(8, { pad: [12, 16], stroke: SW.r(m, 'border'), name: 'chrome' }); SW.sides(bar, 0, 0, 1, 0);
  for (let i = 0; i < 3; i++) SW.add(bar, SW.dot(9, SW.r(m, 'border-control')));
  SW.add(bar, await SW.t('  ~/synthwerk — zsh', 'display/label-sm', SW.r(m, 'fg-subtle'), { name: 'title' }));
  const body = SW.col(2, { pad: [16, 20], name: 'output' });
  for (const [str, role] of [['$ npm i @synthwerk/tokens', 'fg'], ['+ @synthwerk/tokens@0.2.0', 'success'], ['$ vfb test synthwerk --strict', 'fg'],
    ['ok   02 · Components · 100% tokens', 'fg-muted'], ['all passed', 'success']]) SW.add(body, await SW.t(str, 'mono/sm', SW.r(m, role), { name: 'line' }));
  SW.put(c, bar, true); SW.put(c, body, true); return c; };

SW.codeComp = async (p, m) => { const c = SW.cmp('VERTICAL', { r: 'sm', w: 560, clip: true, fill: SW.r(m, 'surface'), stroke: SW.r(m, 'border') });
  const head = SW.row(10, { pad: [10, 16], fill: SW.r(m, 'surface-2'), stroke: SW.r(m, 'border'), name: 'header' }); SW.sides(head, 0, 0, 1, 0);
  const fn = await SW.t(p.Kind === 'Diff' ? 'tokens.ts  ·  0.2.0 → 0.3.0' : 'tokens.css', 'display/label-sm', SW.r(m, 'fg-muted'), { name: 'file' });
  SW.add(head, await SW.icon('code', m, 'fg-subtle', 16), fn, await SW.icon('copy', m, 'fg-subtle', 16)); SW.grow(fn); SW.put(c, head, true);
  const body = SW.col(0, { pad: [12, 0], name: 'code' });
  const lines = p.Kind === 'Diff'
    ? [[' ', "  dark: {"], ['-', "    'accent-2': 'indigo-500',"], ['+', "    'accent-2': 'indigo-400',"], [' ', "    ring: 'indigo-400'"], [' ', '  }']]
    : [[' ', ':root {'], [' ', '  --bg: var(--graphite-950);'], [' ', '  --accent-2: var(--indigo-400);'], [' ', '  --radius-card: 1.5rem;'], [' ', '}']];
  for (const [i, [mark, str]] of lines.entries()) {
    const role = mark === '+' ? 'success' : mark === '-' ? 'danger' : null;
    const row = SW.row(16, { pad: [1, 16], name: 'line', fill: role ? SW.r(m, role) : null, op: role ? 0.1 : null });
    SW.add(row, await SW.t(String(i + 1), 'mono/sm', SW.r(m, 'fg-subtle'), { name: 'n', w: 20, align: 'RIGHT' }),
      await SW.t(mark, 'mono/sm', SW.r(m, role || 'fg-subtle'), { name: 'mark' }), await SW.t(str, 'mono/sm', SW.r(m, role ? 'fg' : i === 0 || i === 4 ? 'fg-muted' : 'fg'), { name: 'code' }));
    SW.put(body, row, true); }
  SW.put(c, body, true); return c; };

SW.section({ name: '02 · Components · Content', page: PG.D, run: async () => {
  const s = h.section('02 · Components · Content');
  const b = SW.board('02 / Components · Content', SW.W, 'dark');
  SW.add(b, await SW.header('02', 'Content', 'Status, labels, people, cards, separators and code. Emerald marks the current status and nothing else. Capital Space Mono labels with wide tracking.'));
  await SW.set(b, 'Status pill', 'Dot, 40 % border and 10 % fill of the status colour. Live = success (emerald), Building = warning, Planned = fg-subtle, Blocked = danger. One status per row.',
    [['Status', ['Live', 'Building', 'Planned', 'Blocked']]], SW.statusComp);
  await SW.set(b, 'Badge', 'Labels and tags. Neutral, Accent (accent-2 at 14 %), Solid (accent) and the six service accents (data-service, tint = badge-service-tint, text = service text colour).',
    [['Kind', ['Neutral', 'Accent', 'Solid', ...SW.SERVICES]]], SW.badgeComp, { wrap: 9 });
  await SW.set(b, 'Avatar', 'Round. Initials on surface-2, or an image. 24, 32 and 48 px.', [['Kind', ['Initials', 'Image']], ['Size', ['sm', 'md', 'lg']]], SW.avatarComp);
  await SW.set(b, 'Card', 'card-bg = surface, card-border = border, card-radius = radius-card (24). Art fades into the surface. Light mode adds shadow-card; dark mode has no shadow. Footer holds a Status pill instance.',
    [['Media', ['Art', 'Plain']]], SW.cardComp, { props: [['eyebrow', 'Eyebrow'], ['title', 'Title'], ['body', 'Body']] });
  await SW.set(b, 'Divider', '1 px line in border. Label kind splits a list ("or"). Vertical kind separates items in a row.',
    [['Kind', ['Line', 'Label', 'Vertical']]], SW.dividerComp);
  await SW.set(b, 'ASCII rule', 'Section start, 72 columns: "-- 01 ---- TITLE --". Strip = the art divider of the READMEs with the section index.',
    [['Kind', ['Rule', 'Strip']]], SW.asciiComp, { colAxis: null });
  await SW.set(b, 'Terminal snippet', 'Command = "$ command" in Space Mono on a contrast card, radius-sm. Session = window chrome (three grey dots, never traffic lights) and JetBrains Mono output.',
    [['Kind', ['Command', 'Session']]], SW.terminalComp);
  await SW.set(b, 'Code block', 'JetBrains Mono 13/20 with line numbers. Diff rows: success / danger at 10 % with the marker in the status colour.',
    [['Kind', ['Plain', 'Diff']]], SW.codeComp);
  return SW.finish(s, b, 'dark');
} });
