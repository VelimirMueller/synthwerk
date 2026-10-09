# Presence style guide

The public look of every `synthwerk` repo: READMEs, banners, social previews.

```text
-- 00 ------------------------------------------------------- PRESENCE --

  website look     +   dashboard accents   +   ASCII art
  near-black,          emerald #10b981,        maps, flows,
  Space Mono,          terminal snippets       dividers, wordmark
  Inter, pills
```

## Scope

- This guide applies to all public surfaces: READMEs, banners, social previews, the overview repo, and the product UI (studio, widgets).
- The look follows [velimir-mueller.de](https://velimir-mueller.de) and the code-context dashboard.
- Do not use the private "street" brand here. It is for local tools only.
- Do not use the "Patch" squiggle mark. It is retired from public use.

## Tokens

| Token | Dark | Light | Use |
|---|---|---|---|
| `page` | `#0a0a0a` | `#fafafa` | Banner background |
| `page-alt` | `#0c0c10` | `#ffffff` | Dashboard background, social preview |
| `card` | `#111111` | `#ffffff` | Cards on the page |
| `line` | `#1a1a1a` to `#282838` | `#e4e4e7` | Borders, 1 px |
| `text` | `#fafafa` | `#18181b` | Headlines |
| `sub` | `#a1a1aa` | `#52525b` | Body text, labels |
| `faint` | `#71717a` | `#71717a` | Small labels |
| `emerald` | `#10b981` | `#059669` | Status, "working", the status pill |
| `indigo` | `#6366f1` | `#4f46e5` | The thin accent line, "rewrite planned" |
| `zinc` | `#27272a` / `#3f3f46` | same | Neutral badges, "planned" |
| `glow-teal` | `#14b8a6` at 22 % | at 14 % | Top-left glow |
| `glow-red` | `#ef4444` at 14 % | at 8 % | Top-centre glow |
| `glow-violet` | `#8b5cf6` at 22 % | at 14 % | Top-right glow |
| `grid` | white at 4.5 % | `#18181b` at 5 % | 32 px grid, faded at the edges |

- Use emerald for one thing per view: the current status. Do not use it as decoration.
- Keep glows at the edges. Never put a glow behind text.

## Type

| Role | Font | Style |
|---|---|---|
| Wordmark, display | Space Mono Bold | Capitals, tight tracking (-4 %), ends with a full stop: `SYNTHWERK.` |
| Labels, pills | Space Mono Regular | Capitals, wide tracking (15 to 20 %) |
| Body, tagline | Inter Regular | Sentence case |
| Code, snippets | Space Mono Regular | `$ command` on a contrast card |

- The fonts are in `assets/fonts/` (SIL OFL 1.1). Keep the licence files next to them.
- In SVGs, outline all text to paths. GitHub shows SVGs in an `<img>` sandbox. It loads no fonts.
- In Markdown, GitHub uses its own fonts. Get the mono feel from `text` code blocks and `for-the-badge` badges.

## Shapes

- Page radius 32 px. Card radius 24 px. Snippet radius 10 px. Pills are fully round.
- Borders are 1 px. No shadows in dark mode.
- A status pill has a dot, a green border at 40 %, and a green fill at 10 %.
- The accent line is 44 × 2 px, indigo, left of the label.

## ASCII rules

```text
  box        +--------+      arrow   -->   <--   v   ^
             |  name  |      bus     ===+===
             +--------+      isolated  +....+  and  :
```

- Put ASCII art in a fenced block with the `text` language. GitHub then keeps the spacing and does not colour it.
- Keep each line at 80 columns or less. Aim for 72 to 76.
- Keep a status block at 40 columns or less. It must fit a phone without scrolling.
- Use printable ASCII only (space to `~`). Do not use tabs or trailing spaces.
- Exception: the block wordmark uses `U+2588` (full block). It has the same width as `A` in the GitHub code fonts (SF Mono, Menlo, Consolas, Liberation Mono, DejaVu Sans Mono).
- Do not use emoji, box-drawing characters (`U+2500` to `U+257F`), or the middle dot inside a block. Their width changes between fonts.
- Write labels in capitals and body text in lower case.
- Start a section's art with its divider: `-- 02 ---...--- ECOSYSTEM --` (72 columns).
- Run `python3 scripts/check-ascii.py` after each change.

### Code block or SVG?

| Use a `text` code block for | Use an SVG for |
|---|---|
| Facts that change: maps, flows, status, roadmap | The banner and the social preview |
| Content that people copy or search | Typography that must look exact |
| Content that must work in light and dark with one source | Content that does not change between releases |

- Never put a fact that changes often into an SVG. A banner change needs a new file name.
- The milestone in the status pill is the only changing fact in a banner. Make a new banner version at each milestone.

## The ASCII kit

| File | Content | Width |
|---|---|---|
| `assets/ascii/wordmark.txt` | Block wordmark `SYNTHWERK.` with the tagline | 75 |
| `assets/ascii/wordmark-ascii.txt` | ASCII-only wordmark (fallback) | 75 |
| `assets/ascii/wordmark-small.txt` | Small ASCII-only wordmark | 57 |
| `assets/ascii/ecosystem-map.txt` | All repos, the edge, the bus and Strobe | 74 |
| `assets/ascii/promotion-flow.txt` | `feat/*` to `main` to `dev` to `stg` to `prd` | 74 |
| `assets/ascii/roadmap.txt` | Milestones M0 to M6 | 63 |
| `assets/ascii/dividers.txt` | Section dividers, status block, snippet | 72 |

- Make a wordmark for a repo: `python3 scripts/ascii-wordmark.py VISION.` (A to Z, `.`, `-`, space).

## Badges

- Use shields.io static badges. Do not use dynamic badges that call other services.
- Top row: `style=for-the-badge`, `labelColor=18181b`, max 3 badges.
- Tables: default style, no label, colour by status.

| Status | Colour | Example |
|---|---|---|
| released, working, in progress | `10b981` | `https://img.shields.io/badge/-working-10b981` |
| rewrite planned | `6366f1` | `https://img.shields.io/badge/-rewrite_planned-6366f1` |
| planned | `3f3f46` | `https://img.shields.io/badge/-planned-3f3f46` |
| neutral (licence, topic) | `27272a` | `https://img.shields.io/badge/license-MIT-27272a?style=for-the-badge&labelColor=18181b` |

## README skeleton for a `synthwerk-*` repo

Copy this skeleton. Keep the order. Delete a section only when it has no content.

````markdown
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner/banner-v1-dark.svg">
  <img alt="SYNTHWERK / ROLE. One-line role. Status." src="assets/banner/banner-v1-light.svg" width="100%">
</picture>

<p align="center"> 3 badges: status (emerald), one fact, licence </p>

**synthwerk-<role>** does <one thing>. <One sentence on who uses it.>

```text
[ STATUS ]  <milestone or version>
[ WORKS  ]  <what works today>
[ NEXT   ]  <next proof>
```

## In 30 seconds          4 bullets: what, who, how to run, status
## How it works           ASCII map, divider 02, max 76 columns
## Quick start            sh code block: clone, configure, run
## Configuration          table of SYNTHWERK_<SERVICE>_* variables
## API and events         links to synthwerk-contracts
## Development            test, lint, build commands
## Roadmap                ASCII milestones, then the table
## Docs                   links: feature docs, blueprint, overview repo

```text
<block wordmark of the role, from scripts/ascii-wordmark.py>
```

[MIT](LICENSE) © 2026 Velimir Mueller
````

- Write prose in ASD-STE100: short sentences, active voice, one idea per sentence.
- A reader must get the role and the status in 30 seconds.
- Say what does not exist yet. Do not show a command as working when it does not work.

## Banner and social preview

```text
  +-- page: 1280 x 400, radius 32, grid, edge glows ----------------+
  | +-- card ---------------------------+  +-- card, grid ---------+ |
  | | ( * STATUS PILL )                 |  |   ( * BADGE PILL )    | |
  | | SYNTHWERK.                        |  |     Title line 1.     | |
  | | ---- LABEL IN SPACE MONO          |  |     Title line 2.     | |
  | |      SUB LABEL                    |  |  +-----------------+  | |
  | | | Tagline in Inter, two lines.    |  |  | $ snippet       |  | |
  | +-----------------------------------+  |  +-----------------+  | |
  |                                        |      footer link      | |
  |                                        +-----------------------+ |
  +------------------------------------------------------------------+
```

- `scripts/make-banner.py` writes the dark banner, the light banner and the social-preview SVG.
- The social preview is 1280 × 640. It adds a row of repo chips.
- Each new version gets a new file name (`--version v3`). GitHub caches images by URL.

Make the overview banner:

```sh
python3 -m pip install fonttools brotli
python3 scripts/make-banner.py
```

Make a banner for one repo:

```sh
python3 scripts/make-banner.py --repo vision --version v1 \
  --status "WORKING" \
  --label "IMAGE LABELS" --sublabel "OPEN VOCABULARY · TOPIC TREE · CPU" \
  --tagline "Labels for images, with an open vocabulary." --tagline2 "Runs on CPU. Calls no external API." \
  --badge "PYTHON · MIT" --title "One service.|Local model." \
  --snippet "$ docker compose up vision" --foot "synthwerk-vision"
```

- Copy `scripts/make-banner.py` and `assets/fonts/` into the repo, or run the script from this repo with `--out <repo>/assets`.
- Render the social PNG with `node scripts/render-social.mjs`. See [MAINTAINING.md](../MAINTAINING.md).
- Check the result in dark and light at 1280 px and 390 px before you commit.

## Review checklist

- [ ] The banner has no `<text>`, no fonts and no external references.
- [ ] `python3 scripts/check-ascii.py` passes.
- [ ] `scripts/check-links.sh` passes.
- [ ] Emerald marks the status only.
- [ ] The README states what does not work yet.
- [ ] Dark and light screenshots at 1280 px and 390 px show no misalignment.
