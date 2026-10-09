<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner/banner-dark.svg">
  <img alt="synthwerk — modular AI services that you run yourself" src="assets/banner/banner-light.svg" width="100%">
</picture>

[![license: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![topic: synthwerk](https://img.shields.io/badge/topic-synthwerk-00FFF7)](https://github.com/topics/synthwerk)
[![milestone: M0](https://img.shields.io/badge/milestone-M0_clean_slate-EE4FFF)](#roadmap)

**Synthwerk** is a set of small services for AI chat, image recognition and page building. You run all of it yourself.

## In 30 seconds

- Each part is a separate repo `synthwerk-<role>`. This repo is the map.
- Drop the widgets into a website, or build your own app with the SDK.
- In development, models run on your machine. No paid AI provider is needed.
- Today: the blueprint, the design tokens and the vision classifier work. The other services are planned or in rewrite.

## Ecosystem

```mermaid
flowchart LR
  site["Your website"] --> widgets["widgets<br/>chat + vision"]
  app["Your app"] --> sdk["sdk<br/>npm packages"]
  studio["studio<br/>builder · admin · health"]
  widgets & sdk & studio --> edge["edge<br/>TLS · WAF · rate limit"]
  edge --> identity["identity<br/>orgs · roles · paywall"]
  edge --> llm["llm<br/>chat gateway"]
  edge --> vision["vision<br/>image labels"]
  edge --> pulse["pulse<br/>health · audit"]
  edge --> mascot["Strobe<br/>public mascot, isolated"]
  identity & llm & vision & pulse <--> bus[("event bus<br/>NATS")]
  classDef isolated stroke-dasharray: 4 3
  class mascot isolated
```

- Each service and front end is a `synthwerk-<name>` repo. `synthwerk-infra` configures the edge and the bus.
- The llm service reads the other services through read-only MCP tools.
- **Strobe** is the public mascot: a no-login helper on the website. It is isolated from all other services. The name is not final.

## Repos

| Repo | Role | Language | Status |
|---|---|---|---|
| [synthwerk-blueprint](https://github.com/VelimirMueller/synthwerk-blueprint) | Shared CI workflows, lint configs, templates, feature-doc skill | YAML · JS | ![v1.0.0](https://img.shields.io/badge/-v1.0.0_released-05FFA1) |
| [synthwerk-sdk](https://github.com/VelimirMueller/synthwerk-sdk) | npm packages: design tokens now, SDK later | TypeScript | ![tokens 0.1.0](https://img.shields.io/badge/-tokens_0.1.0-05FFA1) |
| [synthwerk-vision](https://github.com/VelimirMueller/synthwerk-vision) | Image labels with an open vocabulary and a topic tree | Python | ![working](https://img.shields.io/badge/-working-00FFF7) |
| [synthwerk-identity](https://github.com/VelimirMueller/synthwerk-identity) | Orgs, roles, entitlements, paywall (login by Zitadel) | Go | ![rewrite planned](https://img.shields.io/badge/-rewrite_planned-EE4FFF) |
| [synthwerk-llm](https://github.com/VelimirMueller/synthwerk-llm) | LLM gateway, streaming chat, mascot binary | Go | ![rewrite planned](https://img.shields.io/badge/-rewrite_planned-EE4FFF) |
| [synthwerk-widgets](https://github.com/VelimirMueller/synthwerk-widgets) | Embeddable chat and vision widgets | Vue 3.5 | ![rewrite planned](https://img.shields.io/badge/-rewrite_planned-EE4FFF) |
| [synthwerk-studio](https://github.com/VelimirMueller/synthwerk-studio) | Public site, page builder, admin, live health | Nuxt 4 | ![rewrite planned](https://img.shields.io/badge/-rewrite_planned-EE4FFF) |
| `synthwerk-contracts` | OpenAPI, event schemas, generated clients | OpenAPI · JSON Schema | ![planned](https://img.shields.io/badge/-planned-6B6B74) |
| `synthwerk-infra` | Servers, compose stack, edge, repo settings | OpenTofu | ![planned](https://img.shields.io/badge/-planned-6B6B74) |
| `synthwerk-pulse` | Health, audit log, KPIs over SSE | Go | ![planned](https://img.shields.io/badge/-planned-6B6B74) |
| `synthwerk-e2e` | End-to-end tests across all services | Playwright | ![planned](https://img.shields.io/badge/-planned-6B6B74) |

- "Rewrite planned": the repo has a new README. The old code is kept at the tag `legacy-final`.
- A repo without a link does not exist yet.

## Two ways to use it

| | Drop in | Build |
|---|---|---|
| **You get** | Chat and vision widgets plus sign-in, on any page | Your own app on the same services |
| **You use** | One loader script on your page. Settings in studio. | `@synthwerk/react` or `@synthwerk/vue`, `@synthwerk/tokens` |
| **Sign-in** | Required for AI calls. Passkeys and MFA. | Same accounts and roles |
| **Ready** | Milestone M2 (planned) | Tokens now. SDK at milestone M5 (planned). |

## Principles

- **Local-first.** Development uses local models. Vision runs on CPU with ONNX and calls no external API.
- **Isolated public mascot.** Strobe has no tools, no database and no network egress. It uses a local model only.
- **Scope on the token, not the prompt.** Each service checks the scope in the user's token. A prompt cannot change access.
- **Events for facts.** Services publish facts as CloudEvents on NATS. Questions use HTTP.
- **No anonymous AI.** Chat and vision need a signed-in user. Only the mascot is public.

## Roadmap

| Milestone | Proof | Target | Status |
|---|---|---|---|
| M0 Clean slate | Old names removed. Blueprint CI green in a repo. | 2026‑10 | ![in progress](https://img.shields.io/badge/-in_progress-00FFF7) |
| M1 Spine runs locally | `docker compose up` starts edge, bus, database, telemetry, pulse | 2026‑11 | ![planned](https://img.shields.io/badge/-planned-6B6B74) |
| M2 Chat slice on dev | A passkey user gets streamed answers in an embedded chat | 2027‑01 | ![planned](https://img.shields.io/badge/-planned-6B6B74) |
| M3 MVP on prd | The approved stg build runs on prd. Restore drill done. | 2027‑02 | ![planned](https://img.shields.io/badge/-planned-6B6B74) |
| M4 Public demo | Public site with live chat, vision and the mascot | 2027‑04 | ![planned](https://img.shields.io/badge/-planned-6B6B74) |
| M5 Paid plans and SDK apps | Checkout changes entitlements. App templates for React and Vue. | 2027‑05 | ![planned](https://img.shields.io/badge/-planned-6B6B74) |
| M6 Cluster-ready | Same images on k3s. Security review closed. Card scan works. | 2027‑06 | ![planned](https://img.shields.io/badge/-planned-6B6B74) |

- Targets are estimates.

## How the repos fit

```mermaid
flowchart LR
  feat["feat/* branch"] -->|PR + checks| main["main"]
  main -->|auto| dev["dev"]
  dev -->|tag vX.Y.Z| stg["stg"]
  stg -->|manual approval| prd["prd"]
```

- **Trunk-based.** There are no environment branches. One image is built once and promoted by digest.
- **One blueprint.** Every repo calls the blueprint workflows at `@v1` and uses the same README and feature-doc layout.
- **One contract.** APIs and events are defined in `synthwerk-contracts`. Clients are generated from it.
- No service deploys yet. This flow is the target for milestone M1 and later.

## Docs

- [Blueprint README](https://github.com/VelimirMueller/synthwerk-blueprint#readme): how a repo adopts the shared CI and templates.
- [Definition of Ready](https://github.com/VelimirMueller/synthwerk-blueprint/blob/main/docs/process/definition-of-ready.md) and [Definition of Done](https://github.com/VelimirMueller/synthwerk-blueprint/blob/main/docs/process/definition-of-done.md).
- [Repo templates](https://github.com/VelimirMueller/synthwerk-blueprint/tree/main/templates/_common) and [caller workflows](https://github.com/VelimirMueller/synthwerk-blueprint/tree/main/examples/workflows).
- [Design tokens](https://github.com/VelimirMueller/synthwerk-sdk/tree/main/packages/tokens): colours, themes and the logo files.
- [MAINTAINING.md](MAINTAINING.md): manual steps for this repo.

## License

[MIT](LICENSE) © 2026 Velimir Mueller
