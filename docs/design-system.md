# Design system

One visual language for every Synthwerk surface: READMEs, websites, the studio, the widgets.

- **Today:** design tokens are released as `@synthwerk/tokens` 0.2.0. The presence style guide covers READMEs and banners.
- **Next:** a Figma library, then the `synthwerk-ui` component package.

```text
-- 01 -------------------------------------------------- DESIGN SYSTEM --

  +-----------+     +-----------+     +--------------+     +----------+
  |  tokens   | --> |   Figma   | --> | synthwerk-ui | --> | products |
  | released  |     |  planned  |     |   planned    |     | planned  |
  +-----------+     +-----------+     +--------------+     +----------+

  one source: tokens. Figma and code read the same values.
```

## The layers

| Layer | What it is | Where | State |
|---|---|---|---|
| Tokens | Colours, themes, type, radii as CSS variables, Tailwind theme and JSON | [synthwerk-sdk / packages/tokens](https://github.com/VelimirMueller/synthwerk-sdk/tree/main/packages/tokens) | released, 0.2.0 |
| Presence | README layout, banners, ASCII kit | [presence-style.md](presence-style.md) | written |
| Figma library | Tokens as variables, type styles, base components | Figma, link follows | planned |
| `synthwerk-ui` | The Figma components in code | `synthwerk-sdk`, package name not final | planned |
| Product UI | Studio, widgets, public site | `synthwerk-studio`, `synthwerk-widgets` | planned |

## The look

- Near-black page, 1 px borders, no shadows in dark mode.
- A faint grid and one soft glow at the edge. A glow never sits behind text.
- **Inter** for headings and body. **Space Mono** for labels, code and ASCII art.
- White pills for actions. Capital labels with wide tracking.
- Every surface has a dark and a light version.

## Colour

| Role | Dark | Light | Rule |
|---|---|---|---|
| Page | `#0a0a0b` | `#ffffff` | Background |
| Surface | `#121214` | `#f6f6f8` | Cards |
| Text | `#f4f4f5` | `#0a0a0b` | Headlines and body |
| Accent, fill | `#6366f1` | `#6366f1` | Lines, glows, shapes |
| Accent, text | `#818cf8` | `#4f46e5` | Links and labels. 6.7:1 and 6.3:1 |
| Status | `#10b981` | `#047857` as text | One use per view: the current status |

- Indigo is the accent of the product. Use one accent per surface.
- Emerald means status. Do not use it as decoration or as an accent.
- A neon colour fails as text on white. Use the text value of each colour.

## Theme switch

- Set `data-theme` and `data-mode` on `<html>`. Modes are `light`, `dark` and `system`.
- Set `data-group` to change the accent family. The default is the product accent.
- The choice is stored in `localStorage` under `sw:prefs:v1`. Nothing is stored before the user chooses.

## Figma

The Figma library is the next step. It is not created yet.

| Page | Content |
|---|---|
| Foundations | Colour variables for dark and light, type styles, spacing, radii, grid |
| Components | Button, pill, input, card, status pill, terminal snippet, divider |
| Patterns | Hero, stats row, feature cards, flow diagram, status table |
| Brand | Wordmark `SYNTHWERK.`, banners, social preview |
| Roadmap | The milestones of [roadmap.md](roadmap.md) as a board |

- Figma variables mirror the token names. A change starts in the tokens, not in Figma.
- A component enters `synthwerk-ui` after it exists in Figma with all states and both modes.

## `synthwerk-ui`

- Purpose: every Synthwerk product uses the same components, so the look cannot drift.
- First set: the components of the Figma **Components** page.
- Each component reads tokens only. No colour or size is written into a component.
- Checks: contrast of 4.5:1 or more for text, visible focus, keyboard use, both modes.

## Rules

- Do not copy a colour value into a product. Import the token.
- Do not add a colour for one screen. Change the token set, with a reason.
- A new look gets a new file version (`-v3`). GitHub caches images by address.
