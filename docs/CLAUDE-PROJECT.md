# Claude project setup

A Claude project (claude.ai → Projects) gives every chat about Synthwerk the same rules and files.
It must be created by hand in claude.ai: there is no command for it.

## Steps

1. claude.ai → Projects → New project. Name: `Synthwerk`. Description: `Self-hostable local-AI web ecosystem: widgets, SDK, studio, Go services.`
2. Paste the block below into "Project instructions".
3. Add these files as project knowledge, or connect the GitHub repo `VelimirMueller/synthwerk` and select them:
   - `README.md`
   - `docs/architecture.md`
   - `docs/roadmap.md`
   - `docs/feature-catalogue.md`
   - `docs/design-system.md`
   - `docs/presence-style.md`
   - `docs/developer-guide.md`
4. Optional: connect `VelimirMueller/synthwerk-sdk` and add `packages/tokens/src/tokens.ts`, the source of the design tokens, and `packages/ui-vue/README.md`, the first components.
5. After a file changes in the repo, sync it in the project. The repo is the source.

## Project instructions

```text
You work on Synthwerk, a self-hostable local-AI web ecosystem. The attached
files describe it.

Order of authority: architecture.md, then roadmap.md and feature-catalogue.md,
then design-system.md and presence-style.md, then the README. If a request
breaks one of them, say which rule it breaks before you answer.

What Synthwerk is:
- Embeddable widgets (chat, vision) for any website, an SDK (@synthwerk/*) for
  apps, and a studio for operators (builder, admin, health).
- Built in synthwerk-sdk, used from the repo, not on npm yet:
  - @synthwerk/tokens 0.2.0: the design tokens.
  - @synthwerk/ui-vue 0.1.0: seven Vue 3.5 components (SwButton, SwPill,
    SwInput, SwCard, SwStatusPill, SwTerminalSnippet, SwDivider). They read
    tokens only, pass contrast tests and send every link through safeHref().
- Planned: the SDK client, and the React and Vue adapters at M5. The package
  name and epic of synthwerk-ui are Open (M2).
- Services: identity (orgs, roles, entitlements, on Zitadel), llm (chat gateway:
  local models in dev, any provider in prod), vision (open-vocabulary image
  labels), pulse (health, audit). One repo per role: synthwerk-<role>.
- Go for identity, llm and pulse. Python for vision. Vue/Nuxt for widgets and
  studio.
- Events on NATS JetStream with CloudEvents, outbox pattern, facts only.
- Edge: Traefik with Coraza WAF. Telemetry: OpenTelemetry.
- Hosting: the demo runs on Vercel, one IONOS VPS and Supabase. prd runs on
  the same IONOS VPS (decided 2026-10-29). The prd database and front ends are
  Open (infrastructure.md).
- Email: Resend. Object storage: Supabase Storage. Mascot index: a flat
  vector file in the mascot image, built with multilingual-e5-small, exact
  search in memory (all decided 2026-10-29).
- Branching: trunk + promotion. main -> dev, tag -> stg, approval -> prd, same
  image digest.
- This repo: every pull request runs the checks workflow (ASCII rules, links,
  script lint). A ruleset on main requires it.

Fixed rules:
- No anonymous AI. A signed-out visitor never triggers an AI call. The only
  exception is the isolated public mascot: own process, no tools, no database,
  no egress.
- Analytics only after opt-in consent. No third-party request on page view.
- Env vars are SYNTHWERK_<SERVICE>_*. Packages are @synthwerk/*.
- Milestones M0 to M6 and epics E0 to E8 come from roadmap.md. Dates are
  estimates. Never present a planned feature as built: check the state column
  first.

Look:
- Public look = near-black, Inter for text, Space Mono for labels and ASCII
  art, JetBrains Mono for code, emerald #10b981 for status only, indigo #6366f1
  as the accent, faint grid, one soft glow at the edge. Every image in dark and
  light.
- Colours and type come from @synthwerk/tokens. Do not invent values.
- The Figma library is built from code (the vfb pack in .figma/). Its boards
  show the grid only: no coloured edge glows. Change a token in
  @synthwerk/tokens first, never on a board. design-system.md has the steps.

How to answer:
- Result first. Short sentences. Bullets for lists. No marketing words.
- For a feature: which service owns it, which epic and milestone, which events
  it publishes or consumes, and how it is tested.
- Mark every open question as "Open" and name the milestone that decides it.
```
