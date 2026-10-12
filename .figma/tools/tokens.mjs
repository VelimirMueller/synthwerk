#!/usr/bin/env node
// Writes .figma/tokens.json (vfb format) from the released @synthwerk/tokens source.
// Usage: node .figma/tools/tokens.mjs [path/to/synthwerk-sdk/packages/tokens/src/tokens.ts]
// Default: the synthwerk-sdk checkout next to this repo (the synthwerk-workspace layout).
// Needs Node >= 23.6 (type stripping). Names follow the variables that already exist in Figma file
// e7RJDqZc1F6TBW0Bqad8KG (collections primitives, theme, group, size), so "Sync tokens" updates them and never duplicates.
import { writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const src = resolve(process.argv[2] || join(here, '../../../synthwerk-sdk/packages/tokens/src/tokens.ts'))
const T = await import(pathToFileURL(src).href)
const P = T.primitives
const css = (n) => `var(--${n})`
const a = (n) => `{${n}}`
const hexA = (prim, pct) => { if (!/^#[0-9A-F]{6}$/i.test(P[prim])) throw new Error(`primitive ${prim} is not #RRGGBB`); return P[prim] + Math.round((pct / 100) * 255).toString(16).padStart(2, '0').toUpperCase() }

// ---- primitives: raw hex, hidden from the pickers (components use theme roles)
const primitives = {}
for (const [n, hex] of Object.entries(P))
  primitives[n] = { type: 'COLOR', value: hex, scopes: [], web: css(n), description: `Primitive ${n}. Do not use on a layer: use a theme role.` }
for (const [n, ref] of Object.entries(T.brand))
  primitives[`brand/${n}`] = { type: 'COLOR', value: a(ref), scopes: ['FRAME_FILL', 'SHAPE_FILL', 'STROKE_COLOR', 'TEXT_FILL'],
    description: `Brand palette "${n}" (banners, social previews) = ${ref} ${P[ref]}.` }

// ---- theme: default theme, dark + light (Starter plan = 1 mode, so the mode is a name prefix)
const TEXT = new Set(['fg', 'fg-muted', 'fg-subtle', 'accent-fg', 'accent-text', 'accent-2-fg', 'accent-2-text'])
const scopeOf = (role) => TEXT.has(role) ? ['TEXT_FILL', 'SHAPE_FILL', 'STROKE_COLOR']
  : /^(border|ring)/.test(role) ? ['STROKE_COLOR']
  : /^(bg|surface)/.test(role) ? ['FRAME_FILL', 'SHAPE_FILL']
  : ['FRAME_FILL', 'SHAPE_FILL', 'STROKE_COLOR', 'TEXT_FILL']
const theme = {}
for (const mode of ['dark', 'light']) {
  const g = T.groups[T.defaultGroup].themes.default[mode]
  const refs = { ...T.themes.default[mode].colors, 'accent-2': g.accent, 'accent-2-fg': g.fg, 'accent-2-text': g.accent, ring: g.accent }
  for (const role of T.semanticColorNames)
    theme[`${mode}/${role}`] = { type: 'COLOR', value: a(refs[role]), scopes: scopeOf(role), web: css(role),
      description: `Theme default, data-mode="${mode}": ${role} = ${refs[role]} ${P[refs[role]]}.` }
  const fx = T.themes.default[mode].effects
  theme[`${mode}/texture-grid`] = { type: 'COLOR', value: hexA(fx['texture-grid'].line.tint, fx['texture-grid'].line.alpha), scopes: ['STROKE_COLOR', 'SHAPE_FILL'],
    web: css('texture-grid'), description: `Grid line, ${fx['texture-grid'].size} px grid: ${fx['texture-grid'].line.tint} at ${fx['texture-grid'].line.alpha} %.` }
  for (const [i, gl] of fx['glow-edge'].entries()) {
    const k = ['teal', 'red', 'violet'][i]
    theme[`${mode}/glow-edge-${k}`] = { type: 'COLOR', value: hexA(gl.color.tint, gl.color.alpha), scopes: ['FRAME_FILL', 'SHAPE_FILL'],
      web: css('glow-edge'), description: `Edge glow ${k}: ${gl.color.tint} at ${gl.color.alpha} %, centre ${gl.x} % / ${gl.y} %. Page edges only, never behind text.` }
  }
  theme[`${mode}/badge-service-tint`] = { type: 'FLOAT', value: fx['badge-service-tint'], scopes: [], web: css('badge-service-tint'),
    description: `Share of the service accent in a service badge fill, in percent (${mode}).` }
}

// ---- group: accent families + service accents
const group = {}
for (const name of T.groupNames) {
  const gr = T.groups[name]
  group[`${name}/fill`] = { type: 'COLOR', value: a(gr.fill), scopes: ['FRAME_FILL', 'SHAPE_FILL', 'STROKE_COLOR'], web: css('group-fill'),
    description: `data-group="${name}": graphic fill for glows, lines and banner art. Never text.` }
  for (const mode of ['dark', 'light']) {
    const m = gr.themes.default[mode]
    group[`${name}/${mode}/accent`] = { type: 'COLOR', value: a(m.accent), scopes: ['FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL', 'STROKE_COLOR'], web: css(`group-${name}-accent`),
      description: `data-group="${name}", ${mode}: accent-2, accent-2-text and ring = ${m.accent}.` }
    group[`${name}/${mode}/fg`] = { type: 'COLOR', value: a(m.fg), scopes: ['TEXT_FILL', 'SHAPE_FILL', 'STROKE_COLOR'], web: css(`group-${name}-fg`),
      description: `data-group="${name}", ${mode}: text on an accent fill = ${m.fg}.` }
  }
}
for (const s of T.serviceNames) for (const mode of ['dark', 'light'])
  group[`service/${s}/${mode}`] = { type: 'COLOR', value: a(T.services[s][mode]), scopes: ['FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL', 'STROKE_COLOR'],
    web: css(`service-${s}-text`), description: `data-service="${s}", ${mode}: ${T.services[s][mode]}. The dark step is also the accent stripe in all modes.` }

// ---- size: radii, spacing, focus
const px = (rem) => /rem$/.test(rem) ? parseFloat(rem) * 16 : parseFloat(rem)
const size = {}
for (const [n, v] of Object.entries(T.radii))
  size[`radius-${n}`] = { type: 'FLOAT', value: px(v), scopes: ['CORNER_RADIUS'], web: css(`radius-${n}`), description: `Radius ${n} = ${v}.` }
for (const n of [1, 2, 3, 4, 6, 8, 12, 16, 24])
  size[`space-${n}`] = { type: 'FLOAT', value: n * 4, scopes: ['GAP', 'WIDTH_HEIGHT'], web: `calc(var(--spacing) * ${n})`,
    description: 'Tailwind 4 spacing step (0.25rem unit). Not in @synthwerk/tokens: Tailwind owns spacing.' }
size['focus-outline'] = { type: 'FLOAT', value: 2, scopes: ['STROKE_FLOAT'], web: css('focus-outline'), description: `Focus ring width: ${T.components['focus-outline']}.` }
size['focus-outline-offset'] = { type: 'FLOAT', value: 2, scopes: ['GAP'], web: css('focus-outline-offset'), description: 'Gap between a control and its focus ring.' }

// ---- type: families and the text scale
const type = {}
for (const [n, f] of Object.entries(T.fonts))
  type[`font-${n}`] = { type: 'STRING', value: f.family, scopes: ['FONT_FAMILY'], web: css(`font-${n}`), description: `${f.stack}. Weights ${f.weights.join(', ')}.` }
for (const [n, s] of Object.entries(T.textScale)) {
  type[`text-${n}`] = { type: 'FLOAT', value: s.size, scopes: ['FONT_SIZE'], web: css(`text-${n}`), description: `Text step ${n}: ${s.size} px.` }
  type[`text-${n}-line-height`] = { type: 'FLOAT', value: s.lineHeight, scopes: ['LINE_HEIGHT'], web: css(`text-${n}-line-height`), description: `Line height of step ${n}: ${s.lineHeight} px.` }
}

// ---- motion
const motion = {}
for (const [n, v] of Object.entries(T.motion.duration))
  motion[`duration-${n}`] = { type: 'FLOAT', value: parseFloat(v), scopes: [], web: css(`duration-${n}`), description: `${v}. Reduced motion: ${T.motion.reducedDuration}.` }

// ---- text styles: names of the existing Figma styles, values from textScale
const S = T.textScale
const pct = (tr) => tr ? Math.round(parseFloat(tr) * 1000) / 10 : 0
const st = (family, style, step, extra) => Object.assign({ family, style, size: S[step].size, lineHeight: S[step].lineHeight + 'px', letterSpacing: pct(S[step].tracking) }, extra || {})
const sans = T.fonts.sans.family, disp = T.fonts.display.family, mono = T.fonts.mono.family
const text = {
  'text/xs': st(sans, 'Regular', 'xs', { letterSpacing: 0, description: 'Inter 12/16. Captions, hints, meta.' }),
  'text/sm': st(sans, 'Regular', 'sm', { description: 'Inter 13/20. UI text, table cells.' }),
  'text/base': st(sans, 'Regular', 'base', { description: 'Inter 15/24. Body.' }),
  'text/lg': st(sans, 'Regular', 'lg', { description: 'Inter 17/26. Lead text.' }),
  'text/sm-strong': st(sans, 'Semi Bold', 'sm', { description: 'Inter 600 13/20. Small controls, button sm.' }),
  'text/base-strong': st(sans, 'Semi Bold', 'base', { description: 'Inter 600 15/24. Controls, button md.' }),
  'heading/xl': st(sans, 'Semi Bold', 'xl', { description: 'Inter 600 20/28.' }),
  'heading/2xl': st(sans, 'Semi Bold', '2xl', { description: 'Inter 600 24/30.' }),
  'heading/3xl': st(sans, 'Semi Bold', '3xl', { letterSpacing: -1, description: 'Inter 600 30/36.' }),
  'heading/5xl': st(sans, 'Semi Bold', '5xl', { description: 'Inter 600 48/52, tracking -0.04em.' }),
  'display/label-xs': st(disp, 'Bold', 'xs', { case: 'UPPER', description: 'Space Mono Bold 12/16, capitals, tracking 0.15em. Labels and pills.' }),
  'display/label-sm': st(disp, 'Regular', 'sm', { letterSpacing: 0, description: 'Space Mono 13/20. ASCII art, $ command snippets.' }),
  'display/xl': st(disp, 'Bold', 'xl', { description: 'Space Mono Bold 20/28. Wordmark in bars.' }),
  'display/3xl': st(disp, 'Bold', '3xl', { description: 'Space Mono Bold 30/36.' }),
  'display/5xl': st(disp, 'Bold', '5xl', { description: 'Space Mono Bold 48/52, tracking -0.04em.' }),
  'display/7xl': { family: disp, style: 'Bold', size: 72, lineHeight: '76px', letterSpacing: -4, description: 'Space Mono Bold 72/76, -4 %. Figma-only hero step above the 5xl token.' },
  'display/9xl': { family: disp, style: 'Bold', size: 128, lineHeight: '128px', letterSpacing: -4, description: 'Space Mono Bold 128, -4 %. Figma-only wordmark step for banners.' },
  'mono/sm': st(mono, 'Regular', 'sm', { letterSpacing: 0, description: 'JetBrains Mono 13/20. Code, logs, diffs.' }),
  'mono/base': st(mono, 'Regular', 'base', { letterSpacing: 0, description: 'JetBrains Mono 15/24. Large code.' })
}

// ---- effect styles: names of the existing Figma styles, values from the theme effects
const shadow = (layers) => layers.map((l) => ({ type: 'DROP_SHADOW', color: P[l.color.tint], opacity: l.color.alpha / 100, x: l.x, y: l.y, blur: l.blur, spread: l.spread || 0 }))
const effects = {
  'effects/glow-dark': shadow(T.themes.default.dark.effects.glow),
  'effects/glow-light': shadow(T.themes.default.light.effects.glow),
  'effects/shadow-card-light': shadow(T.themes.default.light.effects['shadow-card-v'])
}

const out = { $schema: 'vfb-tokens/1', $source: '@synthwerk/tokens (synthwerk-sdk/packages/tokens/src/tokens.ts). Generated by .figma/tools/tokens.mjs. Do not edit.',
  collections: { primitives, theme, group, size, type, motion }, text, effects }
const file = join(here, '..', 'tokens.json')
writeFileSync(file, JSON.stringify(out, null, 2) + '\n')
const n = Object.values(out.collections).reduce((s, c) => s + Object.keys(c).length, 0)
console.log(`${file}: ${n} variables, ${Object.keys(text).length} text styles, ${Object.keys(effects).length} effect styles`)
