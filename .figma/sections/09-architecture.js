// 11 · Architecture — lanes diagram (who, front ends, edge, services, bus) and the README ecosystem map as ASCII.
SW.section({ name: '11 · Architecture', page: PG.T, run: async () => {
  const s = h.section('11 · Architecture');
  const b = SW.board('11 / Architecture', SW.W, 'dark');
  SW.add(b, await SW.header('11', 'Architecture', 'Front ends talk HTTPS to the edge. Services talk facts over a NATS bus. The mascot Strobe is isolated: no tools, no database, no egress.'));
  const lane = async (label, items, accent) => { const row = SW.row(20, { name: 'Lane / ' + label });
    SW.add(row, await SW.label(label, 'dark/fg-subtle', { w: 160, name: 'lane' }));
    for (const [icon, n, sub, dashed] of items) {
      const bx = SW.col(8, { pad: [18, 20], r: 'md', w: 220, fill: dashed ? 'dark/bg' : 'dark/surface', stroke: accent && !dashed ? 'dark/accent-2' : 'dark/border', sop: accent && !dashed ? 0.7 : null, name: n });
      if (dashed) bx.dashPattern = [6, 4];
      const t = SW.row(10); SW.add(t, await SW.icon(icon, 'dark', accent ? 'accent-2-text' : 'fg-muted', 18), await SW.t(n, 'text/base-strong', 'dark/fg', { name: 'name' }));
      SW.add(bx, t, await SW.t(sub, 'text/xs', 'dark/fg-muted', { name: 'sub' })); SW.add(row, bx); }
    return row; };
  const dia = SW.panel('dark', { gap: 24, pad: 40, name: 'Diagram' });
  SW.add(dia, await lane('Who', [['eye', 'your website', 'drop-in script'], ['code', 'your app', 'npm packages'], ['user', 'you, the operator', 'admin']]),
    await lane('Front ends', [['chat', 'widgets', 'chat, vision'], ['layers', 'sdk', '@synthwerk/*'], ['settings', 'studio', 'build, admin']], true),
    await lane('Edge', [['key', 'edge', 'TLS · WAF · rate limit'], ['cube', 'infra', 'compose, servers, bus']]),
    await lane('Services', [['user', 'identity', 'orgs, roles, passkeys'], ['chat', 'llm', 'chat gateway'], ['eye', 'vision', 'image labels'], ['pulse', 'pulse', 'health, audit'], ['bolt', 'Strobe', 'mascot · isolated', true]], true),
    await lane('Bus', [['pulse', 'NATS', 'CloudEvents, facts only'], ['code', 'contracts', 'OpenAPI + schemas']]));
  SW.put(b, dia, true);
  const ascii = SW.panel('dark', { gap: 16, pad: [32, 40], fill: 'dark/bg', name: 'ASCII map' });
  SW.add(ascii, await SW.rule('02', 'Ecosystem', 'dark'), await SW.t([
    '   your website             your app                 you, the operator',
    '        |                       |                            |',
    ' +------v-------+       +-------v------+             +-------v------+',
    ' |   widgets    |       |     sdk      |             |    studio    |',
    ' | chat, vision |       | npm packages |             | build, admin |',
    ' +------+-------+       +-------+------+             +-------+------+',
    '        +-----------------------+----------------------------+',
    '                                | HTTPS',
    ' +------------------------------v-----------------------------------+',
    ' |  edge     TLS  /  WAF  /  rate limit             (from infra)    |',
    ' +-----+--------------+--------------+--------------+----------+----+',
    ' +-----v----+   +-----v----+   +-----v----+   +-----v----+  +..v.........+',
    ' | identity |   |   llm    |   |  vision  |   |  pulse   |  :  Strobe    :',
    ' +-----+----+   +-----+----+   +-----+----+   +-----+----+  +............+',
    ' ======+==============+==============+==============+=====   isolated',
    '   NATS event bus  (CloudEvents, facts only)'].join('\n'), 'display/label-sm', 'dark/fg-muted', { name: 'map' }),
    await SW.t('Source: assets/ascii/ecosystem-map.txt. The README draws the same map.', 'text/xs', 'dark/fg-subtle', { name: 'source' }));
  SW.put(b, ascii, true);
  return SW.finish(s, b, 'dark');
} });
