// 20 · Brand — wordmark SYNTHWERK. (sizes, ASCII, dark + light), README banners, GitHub social preview, art strips,
// brand palette and the art rules (docs/presence-style.md, vm-brand Flagship tier: indigo #6366F1).
SW.section({ name: '20 · Brand', page: PG.B, run: async () => {
  const s = h.section('20 · Brand');
  const b = SW.board('20 / Brand', SW.W, 'dark'); const IN = SW.W - 192;
  SW.add(b, await SW.header('20', 'Brand', 'The wordmark is SYNTHWERK. in Space Mono Bold, with the full stop. No logo mark in public. Art is dark and abstract: one glow, no people, no text. Group: Flagship, indigo.'));

  // wordmark sizes + ASCII
  const wm = SW.row(24, { name: 'Wordmark', align: 'MIN' }); SW.put(b, wm, true);
  const sizes = SW.panel('dark', { gap: 24, pad: 48, name: 'Sizes' });
  SW.add(sizes, await SW.label('// Wordmark · sizes', 'dark/accent-2-text'));
  for (const st of ['display/9xl', 'display/7xl', 'display/5xl', 'display/3xl', 'display/xl']) { const r = SW.row(32, { name: st, align: 'CENTER' });
    SW.add(r, await SW.t(st.slice(8) + ' · ' + SW.tok.text[st].size + ' px', 'display/label-sm', 'dark/fg-subtle', { w: 140 }), await SW.t('SYNTHWERK.', st, 'dark/fg', { name: 'wordmark' })); SW.add(sizes, r); }
  const side = SW.col(24, { name: 'Wordmark / modes' });
  for (const m of ['dark', 'light']) { const t = SW.col(12, { pad: 40, r: 'card', w: 420, fill: SW.r(m, 'bg'), stroke: SW.r(m, 'border'), name: 'wordmark/' + m });
    SW.add(t, await SW.label('// ' + m, SW.r(m, 'accent-2-text')), await SW.t('SYNTHWERK.', 'display/5xl', SW.r(m, 'fg'), { name: 'wordmark' }),
      await SW.t('Modular AI services that you run yourself.', 'text/sm', SW.r(m, 'fg-muted'), { name: 'tagline' })); SW.add(side, t); }
  SW.add(wm, sizes, side); SW.grow(sizes);
  const asc = SW.panel('dark', { gap: 16, pad: [32, 40], fill: 'dark/bg', name: 'ASCII wordmark' });
  SW.add(asc, await SW.label('// ASCII wordmark · assets/ascii/wordmark-ascii.txt · 75 columns', 'dark/fg-subtle'), await SW.t([
    ' _______ ___ ___ _______ _______ _______ ________ _______ ______ __  __',
    '|     __|   |   |    |  |_     _|   |   |  |  |  |    ___|   __ \\  |/  |',
    '|__     |\\     /|       | |   | |       |  |  |  |    ___|      <     < __',
    '|_______| |___| |__|____| |___| |___|___|________|_______|___|__|__|\\__|__|'].join('\n'), 'display/label-sm', 'dark/fg', { name: 'ascii' }),
    await SW.t(' ------  modular AI services that you run yourself  ---------------------', 'display/label-sm', 'dark/accent-2-text', { name: 'tagline' }));
  SW.put(b, asc, true);

  // banners dark + light
  const bw = SW.col(24, { name: 'Banners' }); SW.put(b, bw, true);
  SW.add(bw, await SW.block('Banners', 'README banner · dark and light', 'Every banner ships in both modes (picture + prefers-color-scheme). A new look gets a new file name (-v3): GitHub caches images by address.'));
  const bn = SW.row(24, { name: 'banner-pair', align: 'MIN' });
  for (const m of ['dark', 'light']) { const f = await SW.art('synthwerk/synthwerk.jpg', (IN - 24) / 2, 320, { mode: m, side: true, pad: 40, gap: 14, align: 'CENTER', name: 'Banner / ' + m });
    const bd = SW.row(8); SW.add(bd, await SW.inst('Badge', { Kind: 'Accent', Mode: SW.M(m) }, 'group'), await SW.inst('Status pill', { Status: 'Building', Mode: SW.M(m) }, 'status'));
    SW.add(f, bd, await SW.t('SYNTHWERK.', 'display/5xl', SW.r(m, 'fg'), { name: 'wordmark' }), await SW.t('Self-hosted AI for any website.', 'text/base', SW.r(m, 'fg-muted'), { name: 'tagline' }));
    SW.add(bn, f); }
  SW.add(bw, bn);

  // social preview
  const sw = SW.col(24, { name: 'Social preview' }); SW.put(b, sw, true);
  SW.add(sw, await SW.block('Social preview', 'GitHub social preview · 1280 × 640', 'Upload in the repo settings. The milestone in the status pill is the only fact that changes: make a new version at each milestone.'));
  const sp = await SW.art('synthwerk/flagship-base.jpg', 1280, 640, { side: true, pad: [64, 72], gap: 20, align: 'SPACE_BETWEEN', r: 'page', name: 'Social preview 1280×640' });
  const spTop = SW.col(18, { name: 'top' });
  SW.add(spTop, await SW.inst('Status pill', { Status: 'Building', Mode: 'Dark' }, 'status'), await SW.t('SYNTHWERK.', 'display/9xl', 'dark/fg', { name: 'wordmark' }),
    await SW.t('AI for your website. Self-hosted. Yours.', 'heading/3xl', 'dark/fg-muted', { name: 'tagline' }));
  const spBot = SW.row(16, { name: 'bottom', justify: 'SPACE_BETWEEN' });
  SW.add(spBot, await SW.t('github.com/VelimirMueller/synthwerk', 'display/label-sm', 'dark/fg-subtle', { name: 'url' }), await SW.label('VM. studio / flagship', 'dark/accent-2-text'));
  SW.add(sp, spTop); SW.put(sp, spBot, true); SW.add(sw, sp);

  // art strips
  const st = SW.col(16, { name: 'Art strips' }); SW.put(b, st, true);
  SW.add(st, await SW.block('Art', 'Art strips · dividers · 1920 × 576', 'Graded to indigo (vm-brand B-41). Near-black ground, faint grid, one soft glow, no people, no text. Used as section dividers in READMEs and docs.'));
  for (let i = 1; i <= 5; i++) { const a = await SW.art('synthwerk/strip-' + i + '.jpg', IN, 200, { fade: false, dir: 'HORIZONTAL', pad: [0, 32, 20, 32], align: 'MIN', r: 'md', name: 'strip-' + i });
    a.counterAxisAlignItems = 'MAX'; SW.add(a, await SW.label('strip-' + i + ' · flagship', 'dark/fg')); SW.put(st, a, true); }

  // palette + rules
  const pr = SW.row(24, { name: 'Palette and rules', align: 'MIN' }); SW.put(b, pr, true);
  const pal = SW.panel('dark', { gap: 20, pad: 40, name: 'Brand palette' }); SW.add(pal, await SW.label('// Brand palette · primitives brand/*', 'dark/accent-2-text'));
  const chips = SW.row(16, { wrap: true, wrapGap: 20, w: 620, align: 'MIN' });
  for (const n of Object.keys(SW.tok.collections.primitives).filter(x => /^brand\//.test(x))) { const c = SW.col(8, { name: n });
    const r = SW.rect(104, 56, n, null, 'sm'); SW.s(r, 'dark/border'); SW.add(c, r, await SW.t(n.slice(6), 'text/sm-strong', 'dark/fg'), await SW.t(SW.hex[n], 'display/label-sm', 'dark/fg-subtle')); SW.add(chips, c); }
  SW.add(pal, chips);
  const rules = SW.panel('dark', { gap: 16, pad: 40, name: 'Rules' }); SW.add(rules, await SW.label('// Rules', 'dark/accent-2-text'));
  for (const [ok, txt] of [[true, 'Wordmark in capitals, Space Mono Bold, tracking -4 %, with the full stop.'], [true, 'One accent per surface: indigo. Emerald only for the current status.'],
    [true, 'Glows at the page edge. Never behind text.'], [false, 'No logo mark, no "Patch" squiggle, no street brand in public.'], [false, 'No people and no text inside the art.'], [false, 'Never reuse an image address after a change: use a new -vN.']]) {
    const r = SW.row(12, { name: ok ? 'do' : 'dont', align: 'MIN' });
    SW.add(r, await SW.icon(ok ? 'check-circle' : 'x-circle', 'dark', ok ? 'success' : 'danger', 20), await SW.t(txt, 'text/base', 'dark/fg-muted', { w: 560 })); SW.add(rules, r); }
  SW.add(pr, pal, rules); SW.grow(rules);
  return SW.finish(s, b, 'dark');
} });
