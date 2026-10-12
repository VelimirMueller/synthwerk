// 02 · Components · Feedback — Tooltip, Modal, Toast, Progress, Skeleton, Empty state.
SW.TONE = { Success: ['success', 'check-circle', 'Tokens synced', '193 variables updated in 2.1 s.'], Info: ['info', 'info', 'New version', '@synthwerk/tokens 0.3.0 is ready to sync.'],
  Warning: ['warning', 'alert', 'Contrast warning', 'fg-subtle on surface-2 is 4.4:1. Use fg-muted.'], Danger: ['danger', 'x-circle', 'Sync failed', 'The art server on :8765 does not answer.'] };
SW.button = async (m, kind, size, label) => { const b = await SW.inst('Button', { Kind: kind, Size: size, State: 'Default', Mode: SW.M(m) }, 'button/' + kind.toLowerCase());
  await SW.setText(b, 'label', label); return b; };

SW.tooltipComp = async (p, m) => { const c = SW.cmp('VERTICAL', { align: 'CENTER' });
  const bub = SW.row(0, { pad: [6, 10], r: 8, fill: SW.r(m, 'accent'), name: 'bubble' });
  SW.add(bub, await SW.t('Copy to clipboard', 'text/xs', SW.r(m, 'accent-fg'), { name: 'label' }));
  const tip = figma.createPolygon(); tip.pointCount = 3; tip.resize(12, 6); tip.fills = [SW.c(SW.r(m, 'accent'))]; tip.name = 'arrow';
  if (p.Placement === 'Top') { SW.add(c, bub, tip); tip.rotation = 180; } else SW.add(c, tip, bub);
  return c; };

SW.modalComp = async (p, m) => { const confirm = p.Kind === 'Confirm';
  const c = SW.cmp('VERTICAL', { w: 480, r: 'card', clip: true, fill: SW.r(m, 'surface'), stroke: SW.r(m, 'border') });
  if (m === 'light') await h.effect(c, 'effects/shadow-card-light');
  const head = SW.row(16, { pad: [24, 16, 0, 24], justify: 'SPACE_BETWEEN', align: 'MIN', name: 'header' });
  const close = await SW.inst('Icon button', { Kind: 'Ghost', State: 'Default', Mode: SW.M(m) }, 'close'); await SW.swap(close, 'icon/plus', 'Icon', { Name: 'x', Mode: SW.M(m) });
  SW.add(head, await SW.t(confirm ? 'Delete this widget?' : 'Invite a teammate', 'heading/2xl', SW.r(m, 'fg'), { name: 'title' }), close);
  const body = SW.col(16, { pad: [12, 24, 24, 24], name: 'body' });
  SW.put(body, await SW.t(confirm ? 'The chat widget stops on every page that embeds it. Conversations stay in the audit log for 30 days.' : 'They get an email with a passkey sign-up link. The link expires in 48 hours.',
    'text/base', SW.r(m, 'fg-muted'), { w: 432, name: 'body' }), true);
  if (confirm) { const w = SW.row(10, { pad: [10, 12], r: 'sm', fill: SW.r(m, 'warning'), op: 0.1, name: 'warning' });
    SW.add(w, await SW.icon('alert', m, 'warning', 18), await SW.t('This cannot be undone.', 'text/sm-strong', SW.r(m, 'fg'), { name: 'note' })); SW.put(body, w, true); }
  else SW.put(body, await SW.inst('Form field', { State: 'Default', Mode: SW.M(m) }, 'field'), true);
  const foot = SW.row(12, { pad: [16, 24], justify: 'MAX', fill: SW.r(m, 'surface-2'), stroke: SW.r(m, 'border'), name: 'footer' }); SW.sides(foot, 1, 0, 0, 0);
  SW.add(foot, await SW.button(m, 'Secondary', 'md', 'Cancel'), await SW.button(m, 'Primary', 'md', confirm ? 'Delete widget' : 'Send invite'));
  SW.put(c, head, true); SW.put(c, body, true); SW.put(c, foot, true); return c; };

SW.toastComp = async (p, m) => { const [role, icon, title, msg] = SW.TONE[p.Tone];
  const c = SW.cmp('HORIZONTAL', { gap: 12, pad: [14, 16, 14, 20], r: 'md', w: 380, align: 'MIN', fill: SW.r(m, 'surface'), stroke: SW.r(m, 'border'), clip: true });
  if (m === 'light') await h.effect(c, 'effects/shadow-card-light');
  const txt = SW.col(2, { name: 'text' });
  SW.add(txt, await SW.t(title, 'text/sm-strong', SW.r(m, 'fg'), { name: 'title' })); SW.put(txt, await SW.t(msg, 'text/xs', SW.r(m, 'fg-muted'), { w: 260, name: 'message' }), true);
  SW.add(c, await SW.icon(icon, m, role, 20), txt, await SW.icon('x', m, 'fg-subtle', 16)); SW.grow(txt);
  const bar = SW.rect(3, 20, SW.r(m, role)); bar.name = 'tone'; SW.over(c, bar, 0, 0); bar.resize(3, Math.max(20, c.height)); bar.constraints = { horizontal: 'MIN', vertical: 'STRETCH' };
  return c; };

SW.progressComp = async (p, m) => { const v = +p.Value; const done = v === 100;
  const c = SW.cmp('VERTICAL', { gap: 8, w: 320 });
  const top = SW.row(8, { justify: 'SPACE_BETWEEN', name: 'meta' });
  SW.add(top, await SW.t(done ? 'Tokens synced' : 'Syncing tokens', 'text/xs', SW.r(m, 'fg'), { name: 'label' }), await SW.t(v + ' %', 'display/label-sm', SW.r(m, done ? 'success' : 'fg-muted'), { name: 'value' }));
  const track = SW.row(0, { h: 6, r: 'pill', fill: SW.r(m, 'surface-2'), name: 'track', clip: true });
  const bar = SW.rect(Math.max(6, 320 * v / 100), 6, SW.r(m, done ? 'success' : 'accent-2'), null, 'pill'); bar.name = 'bar'; SW.add(track, bar);
  SW.put(c, top, true); SW.put(c, track, true); return c; };

SW.skel = (w, hh, m, r) => { const x = SW.rect(w, hh, SW.r(m, 'surface-2'), null, r == null ? 6 : r);
  const hi = SW.hex[SW.r(m, 'border')] || '#282838'; x.fills = x.fills.concat([h.grad([[0, hi, 0], [0.5, hi, 0.5], [1, hi, 0]], 0)]); x.name = 'bone'; return x; };
SW.skeletonComp = async (p, m) => {
  if (p.Kind === 'Line') { const c = SW.cmp('VERTICAL', { gap: 10, w: 320 }); for (const w of [320, 280, 200]) SW.add(c, SW.skel(w, 12, m)); return c; }
  if (p.Kind === 'Avatar') { const c = SW.cmp('HORIZONTAL', { gap: 12, align: 'CENTER' }); const l = SW.col(8);
    SW.add(l, SW.skel(160, 12, m), SW.skel(100, 10, m)); SW.add(c, SW.skel(40, 40, m, 'pill'), l); return c; }
  const c = SW.cmp('VERTICAL', { gap: 14, pad: 20, w: 320, r: 'card', fill: SW.r(m, 'surface'), stroke: SW.r(m, 'border') });
  const media = SW.skel(280, 140, m, 'md'); SW.put(c, media, true); for (const w of [200, 280, 160]) SW.add(c, SW.skel(w, 12, m)); return c; };

SW.emptyComp = async (p, m) => { const err = p.Kind === 'Error';
  const c = SW.cmp('VERTICAL', { gap: 16, pad: 40, w: 480, r: 'card', align: 'CENTER', fill: SW.r(m, 'surface'), stroke: SW.r(m, err ? 'danger' : 'border-control'), sop: err ? 0.5 : null });
  c.dashPattern = [6, 4];
  const ic = SW.row(0, { w: 56, h: 56, r: 'pill', justify: 'CENTER', fill: SW.r(m, 'surface-2'), stroke: SW.r(m, 'border'), name: 'icon' });
  SW.add(ic, await SW.icon(err ? 'alert' : 'cube', m, err ? 'danger' : 'fg-muted', 24));
  SW.add(c, ic, await SW.t(err ? '[!!]  pulse: no answer' : '[  ]  0 widgets', 'display/label-sm', SW.r(m, 'fg-subtle'), { name: 'ascii' }),
    await SW.t(err ? 'Health data did not load' : 'No widgets yet', 'heading/xl', SW.r(m, 'fg'), { name: 'title', align: 'CENTER' }),
    await SW.t(err ? 'The studio did not reach pulse. Check the bus, then try again.' : 'Create a chat or vision widget, then paste one script tag into your page.', 'text/sm', SW.r(m, 'fg-muted'), { w: 360, align: 'CENTER', name: 'body' }),
    await SW.button(m, 'Secondary', 'md', err ? 'Try again' : 'Create a widget'));
  return c; };

SW.section({ name: '02 · Components · Feedback', page: PG.D, run: async () => {
  const s = h.section('02 · Components · Feedback');
  const b = SW.board('02 / Components · Feedback', SW.W, 'dark');
  SW.add(b, await SW.header('02', 'Feedback', 'Overlays, messages and loading. Status colours carry meaning, always with an icon or a word, never colour alone.'));
  await SW.set(b, 'Tooltip', 'Inverted bubble: accent fill with accent-fg text, 8 px radius, 6 px arrow. Short labels only.', [['Placement', ['Top', 'Bottom']]], SW.tooltipComp, { props: [['label', 'Label']] });
  await SW.set(b, 'Toast', 'Surface card with a 3 px tone bar, a tone icon, title and message. Light mode adds shadow-card.', [['Tone', ['Success', 'Info', 'Warning', 'Danger']]], SW.toastComp,
    { wrap: 2 });
  await SW.set(b, 'Progress', '6 px pill track on surface-2. The bar is accent-2 while running and success when done.', [['Value', ['25', '60', '100']]], SW.progressComp);
  await SW.set(b, 'Skeleton', 'Loading bones on surface-2 with a soft border-colour shimmer. Match the shape of the content.', [['Kind', ['Line', 'Avatar', 'Card']]], SW.skeletonComp);
  await SW.set(b, 'Empty state', 'Dashed border-control card, icon in a surface-2 circle, ASCII status, title, one action. Error kind uses danger.', [['Kind', ['Empty', 'Error']]], SW.emptyComp);
  await SW.set(b, 'Modal', 'radius-card dialog on surface, 480 px. Close = ghost icon button. Footer on surface-2 with Secondary and Primary buttons. Dialog body holds a Form field instance.',
    [['Kind', ['Dialog', 'Confirm']]], SW.modalComp);
  return SW.finish(s, b, 'dark');
} });
