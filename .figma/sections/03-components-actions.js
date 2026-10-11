// 02 · Components — actions and forms: Button, Icon button, Link, Input, Textarea, Select, Checkbox, Radio, Switch, Form field.
// Every set: variants for kind / state / size where relevant, plus Mode=Dark|Light. Components read variables only.
SW.STATES = ['Default', 'Hover', 'Focus', 'Disabled'];
SW.ring = (n, m) => { SW.s(n, SW.r(m, 'ring'), 2, null, 'OUTSIDE'); SW.bind(n, 'strokeWeight', 'focus-outline'); return n; };
SW.compHeader = async (b, code, title, sub) => SW.add(b, await SW.header(code, title, sub));

SW.buttonComp = async (p, m) => { const md = p.Size === 'md', hover = p.State === 'Hover';
  const c = SW.cmp('HORIZONTAL', { gap: 8, pad: md ? [12, 22] : [8, 16], r: 'pill', align: 'CENTER' });
  let fg = 'fg';
  if (p.Kind === 'Primary') { SW.f(c, SW.r(m, 'accent'), hover ? 0.86 : null); fg = 'accent-fg'; }
  if (p.Kind === 'Secondary') { if (hover) SW.f(c, SW.r(m, 'surface-2')); SW.s(c, SW.r(m, 'border-control')); }
  if (p.Kind === 'Ghost') { if (hover) SW.f(c, SW.r(m, 'surface-2')); fg = hover ? 'fg' : 'fg-muted'; }
  if (p.State === 'Focus') SW.ring(c, m);
  const label = 'Get started';
  SW.add(c, await SW.t(label, md ? 'text/base-strong' : 'text/sm-strong', SW.r(m, fg), { name: 'label' }), await SW.icon('arrow-right', m, fg, md ? 16 : 14));
  if (p.State === 'Disabled') c.opacity = 0.4; return c; };

SW.iconButtonComp = async (p, m) => { const hover = p.State === 'Hover';
  const c = SW.cmp('HORIZONTAL', { r: 'pill', align: 'CENTER', justify: 'CENTER', w: 40, h: 40 }); let fg = 'fg';
  if (p.Kind === 'Solid') { SW.f(c, SW.r(m, 'accent'), hover ? 0.86 : null); fg = 'accent-fg'; }
  if (p.Kind === 'Outline') { if (hover) SW.f(c, SW.r(m, 'surface-2')); SW.s(c, SW.r(m, 'border-control')); }
  if (p.Kind === 'Ghost') { if (hover) SW.f(c, SW.r(m, 'surface-2')); fg = hover ? 'fg' : 'fg-muted'; }
  if (p.State === 'Focus') SW.ring(c, m);
  SW.add(c, await SW.icon('plus', m, fg, 18)); if (p.State === 'Disabled') c.opacity = 0.4; return c; };

SW.linkComp = async (p, m) => { const role = p.State === 'Hover' ? 'accent-2-text' : 'accent-text';
  const c = SW.cmp('VERTICAL', { gap: 3, pad: [2, 4] });
  const r = SW.row(6, { name: 'text' });
  SW.add(r, await SW.t('Read the roadmap', 'text/base-strong', SW.r(m, role), { name: 'label' }), await SW.icon('arrow-up-right', m, role, 16));
  const u = SW.rect(10, p.State === 'Hover' ? 2 : 1, SW.r(m, role), p.State === 'Hover' ? null : 0.35); u.name = 'underline';
  SW.add(c, r); SW.put(c, u, true);
  if (p.State === 'Focus') { SW.ring(c, m); SW.radius(c, 4); } return c; };

SW.fieldShell = (m, state, o) => { const f = SW.frame(o && o.dir || 'HORIZONTAL', Object.assign({ gap: 10, pad: [12, 14], r: 'sm', align: 'CENTER', name: 'field' }, o || {}));
  SW.f(f, SW.r(m, state === 'Disabled' ? 'surface-2' : 'surface'));
  if (state === 'Focus' || state === 'Open') SW.s(f, SW.r(m, 'ring'), 2); else SW.s(f, SW.r(m, state === 'Error' ? 'danger' : 'border-control'));
  return f; };

SW.inputComp = async (p, m) => { const c = SW.cmp('HORIZONTAL', { gap: 10, pad: [12, 14], r: 'sm', align: 'CENTER', w: 320 });
  SW.f(c, SW.r(m, p.State === 'Disabled' ? 'surface-2' : 'surface'));
  if (p.State === 'Focus') SW.s(c, SW.r(m, 'ring'), 2); else SW.s(c, SW.r(m, p.State === 'Error' ? 'danger' : 'border-control'));
  const filled = p.State !== 'Default';
  const v = await SW.t(filled ? 'velimir@synthwerk' : 'you@company.dev', 'text/base', SW.r(m, filled ? 'fg' : 'fg-subtle'), { name: 'value' });
  SW.add(c, await SW.icon('user', m, 'fg-subtle', 18), v); SW.grow(v);
  if (p.State === 'Error') SW.add(c, await SW.icon('alert', m, 'danger', 18));
  if (p.State === 'Disabled') c.opacity = 0.5; return c; };

SW.textareaComp = async (p, m) => { const c = SW.cmp('VERTICAL', { gap: 8, pad: 14, r: 'sm', w: 320, h: 136, justify: 'SPACE_BETWEEN' });
  SW.f(c, SW.r(m, p.State === 'Disabled' ? 'surface-2' : 'surface'));
  if (p.State === 'Focus') SW.s(c, SW.r(m, 'ring'), 2); else SW.s(c, SW.r(m, p.State === 'Error' ? 'danger' : 'border-control'));
  const v = await SW.t('Describe the widget you want to embed: chat, vision or both.', 'text/base', SW.r(m, p.State === 'Default' ? 'fg-subtle' : 'fg'), { w: 292, name: 'value' });
  const cnt = await SW.t(p.State === 'Error' ? '312 / 280' : '58 / 280', 'text/xs', SW.r(m, p.State === 'Error' ? 'danger' : 'fg-subtle'), { name: 'counter', align: 'RIGHT' });
  SW.put(c, v, true); SW.put(c, cnt, true); if (p.State === 'Disabled') c.opacity = 0.5; return c; };

SW.selectComp = async (p, m) => { const c = SW.cmp('VERTICAL', { gap: 6, w: 320 });
  const f = SW.fieldShell(m, p.State);
  const v = await SW.t('Flagship', 'text/base', SW.r(m, 'fg'), { name: 'value' });
  SW.add(f, SW.dot(10, 'flagship/fill'), v, await SW.icon('chevron-down', m, 'fg-muted', 18)); SW.grow(v); SW.put(c, f, true);
  if (p.State === 'Open') { const menu = SW.col(2, { pad: 6, r: 'md', fill: SW.r(m, 'surface'), stroke: SW.r(m, 'border'), name: 'menu' });
    if (m === 'light') await h.effect(menu, 'effects/shadow-card-light');
    for (const [i, [g, n]] of [['flagship', 'Flagship'], ['vlm', 'vlm'], ['rig', 'Rig']].entries()) {
      const it = SW.row(10, { pad: [8, 10], r: 8, name: 'option', fill: i === 0 ? SW.r(m, 'surface-2') : null });
      const t = await SW.t(n, 'text/sm', SW.r(m, i === 0 ? 'fg' : 'fg-muted'), { name: 'option' });
      SW.add(it, SW.dot(8, g + '/fill'), t); SW.grow(t);
      if (i === 0) SW.add(it, await SW.icon('check', m, 'accent-2-text', 16)); SW.put(menu, it, true); }
    SW.put(c, menu, true); }
  if (p.State === 'Disabled') c.opacity = 0.5; return c; };

SW.checkComp = async (p, m, kind) => { const on = p.Checked !== 'Off';
  const c = SW.cmp('HORIZONTAL', { gap: 10, align: 'CENTER' });
  let ctl;
  if (kind === 'switch') { ctl = SW.row(0, { pad: 3, r: 'pill', w: 36, h: 20, name: 'track', justify: on ? 'MAX' : 'MIN' });
    SW.f(ctl, SW.r(m, on ? 'accent-2' : 'surface-2')); if (!on) SW.s(ctl, SW.r(m, 'border-control'));
    SW.add(ctl, SW.dot(14, SW.r(m, on ? 'accent-2-fg' : 'fg-subtle'))); }
  else { ctl = SW.row(0, { justify: 'CENTER', w: 18, h: 18, name: 'control', r: kind === 'radio' ? 'pill' : 5 });
    if (kind === 'radio') { SW.f(ctl, SW.r(m, 'surface')); SW.s(ctl, SW.r(m, on ? 'accent-2' : 'border-control'), on ? 1.5 : 1); if (on) SW.add(ctl, SW.dot(8, SW.r(m, 'accent-2'))); }
    else if (on) { SW.f(ctl, SW.r(m, 'accent-2')); SW.add(ctl, await SW.icon(p.Checked === 'Mixed' ? 'minus' : 'check', m, 'accent-2-fg', 14)); }
    else { SW.f(ctl, SW.r(m, 'surface')); SW.s(ctl, SW.r(m, 'border-control')); } }
  if (p.State === 'Focus') SW.ring(ctl, m);
  const label = { switch: 'Auto-sync tokens', radio: 'Self-hosted', check: 'Send me release notes' }[kind];
  SW.add(c, ctl, await SW.t(label, 'text/sm', SW.r(m, 'fg'), { name: 'label' }));
  if (p.State === 'Disabled') c.opacity = 0.45; return c; };

SW.formFieldComp = async (p, m) => { const c = SW.cmp('VERTICAL', { gap: 8, w: 320 });
  const lr = SW.row(6, { justify: 'SPACE_BETWEEN', name: 'label-row' });
  SW.add(lr, await SW.t('Work email', 'text/sm-strong', SW.r(m, 'fg'), { name: 'label' }), await SW.t('Required', 'text/xs', SW.r(m, 'fg-subtle'), { name: 'required' }));
  SW.put(c, lr, true);
  SW.put(c, await SW.inst('Input', { State: p.State === 'Default' ? 'Filled' : p.State, Mode: SW.M(m) }, 'input'), true);
  const hint = SW.row(6, { name: 'hint-row' });
  if (p.State === 'Error') SW.add(hint, await SW.icon('alert', m, 'danger', 14));
  SW.add(hint, await SW.t(p.State === 'Error' ? 'Enter a valid email address.' : 'We send the invite to this address.', 'text/xs', SW.r(m, p.State === 'Error' ? 'danger' : 'fg-subtle'), { name: 'hint' }));
  SW.put(c, hint, true); if (p.State === 'Disabled') c.opacity = 0.5; return c; };

SW.section({ name: '02 · Components', page: PG.D, run: async () => {
  const s = h.section('02 · Components');
  const b = SW.board('02 / Components · Actions and forms', SW.W, 'dark');
  await SW.compHeader(b, '02', 'Components', 'Actions and forms. Every component is a set with Mode=Dark|Light and its kinds, states and sizes. Components read variables only. A component enters synthwerk-ui after it exists here in all states and both modes.');
  SW.add(b, await SW.block('Actions', 'Buttons, icon buttons, links', 'The primary action is the white pill. One primary per view. Focus is a 2 px ring in the ring colour, 2 px outside.'));
  await SW.set(b, 'Button', 'Pill button. Primary = accent fill (white in dark, ink in light). Secondary = 1 px border-control. Ghost = text only. Hover lifts the surface; focus = 2 px ring; disabled = 40 % opacity. Label and trailing arrow icon.',
    [['Kind', ['Primary', 'Secondary', 'Ghost']], ['Size', ['md', 'sm']], ['State', SW.STATES]], SW.buttonComp, { props: [['label', 'Label']] });
  await SW.set(b, 'Icon button', 'Round 40 px icon-only action. Always give it an accessible name in code. Kinds and states follow Button.',
    [['Kind', ['Solid', 'Outline', 'Ghost']], ['State', SW.STATES]], SW.iconButtonComp);
  await SW.set(b, 'Link', 'Inline link: link-fg (accent-text), hover link-fg-hover (accent-2-text) with a 2 px underline. External links carry the arrow.',
    [['State', ['Default', 'Hover', 'Focus']]], SW.linkComp, { props: [['label', 'Label']] });
  SW.add(b, await SW.block('Forms', 'Inputs and choices', 'Fields: surface fill, 1 px border-control, radius-sm (10). Focus = 2 px ring. Error = danger border plus a hint with an icon, never colour alone.'));
  await SW.set(b, 'Input', 'Single-line text field, 320 px, radius-sm. input-bg = surface, input-border = border-control, input-border-focus = ring. Leading icon optional.',
    [['State', ['Default', 'Filled', 'Focus', 'Error', 'Disabled']]], SW.inputComp);
  await SW.set(b, 'Textarea', 'Multi-line field with a character counter. The counter turns danger above the limit.',
    [['State', ['Default', 'Focus', 'Error', 'Disabled']]], SW.textareaComp);
  await SW.set(b, 'Select', 'Single choice from a menu. Open shows the menu on surface with a 1 px border; the chosen item sits on surface-2 with a check.',
    [['State', ['Default', 'Open', 'Focus', 'Disabled']]], SW.selectComp);
  await SW.set(b, 'Checkbox', '18 px box, radius 5. On and mixed use accent-2 with accent-2-fg marks. checkbox-border = border-control.',
    [['Checked', ['Off', 'On', 'Mixed']], ['State', ['Default', 'Focus', 'Disabled']]], (p, m) => SW.checkComp(p, m, 'check'), { props: [['label', 'Label']] });
  await SW.set(b, 'Radio', '18 px round control. On = accent-2 ring and dot.',
    [['Checked', ['Off', 'On']], ['State', ['Default', 'Focus', 'Disabled']]], (p, m) => SW.checkComp(p, m, 'radio'), { props: [['label', 'Label']] });
  await SW.set(b, 'Switch', '36 × 20 track, 14 px knob. On = accent-2 track, knob in accent-2-fg.',
    [['Checked', ['Off', 'On']], ['State', ['Default', 'Focus', 'Disabled']]], (p, m) => SW.checkComp(p, m, 'switch'), { props: [['label', 'Label']] });
  await SW.set(b, 'Form field', 'Label, Input instance and hint. Error hints carry an icon and the danger colour. Built from the Input set.',
    [['State', ['Default', 'Error', 'Disabled']]], SW.formFieldComp, { props: [['label', 'Label']] });
  return SW.finish(s, b, 'dark');
} });
