# Feature catalogue

Every planned feature, by area. One line per feature group.

- **State** is one of `released`, `working`, `planned`.
- **MVP** means the feature is part of epics E0 to E4 and ships with milestone M3.
- No feature below is `released` unless the line says so.

```text
-- 01 ------------------------------------------------------- FEATURES --

  identity    chat      vision     studio     health
  sign-in     widget    widget     admin      live view
  roles       stream    labels     settings   metrics

  ai          sdk       site       builder    platform
  gateway     core      public     sections   promotion
  quotas      adapters  demo       publish    events
```

## Identity and access

Repo: `synthwerk-identity`. Sign-in by Zitadel.

| Feature | MVP | Epic | State |
|---|---|---|---|
| Sign up and sign in with a passkey, or email plus MFA | yes | E2 | planned |
| Roles per org: owner, admin, member. Platform role: operator | yes | E2 | planned |
| Apps per org with an origin allow-list | yes | E2 | planned |
| Short-lived widget token, 15 minutes or less | yes | E2 | planned |
| Entitlements per org. Default plan is free | yes | E2 | planned |
| Export own data and delete own account | yes | E4 | planned |
| Checkout, customer portal and paid plans | no | E7 | planned |

## Chat

Repos: `synthwerk-widgets`, `synthwerk-llm`.

| Feature | MVP | Epic | State |
|---|---|---|---|
| Embed with one script tag and one custom element | yes | E3 | planned |
| Launcher button on desktop, full-screen sheet below 640 px | yes | E3 | planned |
| Answers stream token by token | yes | E3 | planned |
| Each conversation is isolated per user or session | yes | E3 | planned |
| Widget config from the studio: position, theme, mode, language, colours, greeting | yes | E3 | planned |
| Error, offline and quota states | yes | E3 | planned |
| German and English | yes | E3 | planned |
| Model output renders as safe Markdown. Raw HTML never renders | yes | E3 | planned |
| Past conversations for signed-in users | no | E7 | planned |

## Vision

Repos: `synthwerk-widgets`, `synthwerk-vision`.

| Feature | MVP | Epic | State |
|---|---|---|---|
| Image labels with an open vocabulary and a topic tree | no | E5 | working in `synthwerk-vision` |
| Upload a file or take a photo | no | E5 | planned |
| Client resizes the image before upload | no | E5 | planned |
| Primary label, topic, uncertainty flag and alternatives | no | E5 | planned |
| Vision widget installs as a PWA | no | E5 | planned |
| Label sets per tenant | no | E5 | planned |
| Card scan: detect, retrieve, read, return the printing. Free | no | E8 | planned |

## Studio admin

Repo: `synthwerk-studio`.

| Feature | MVP | Epic | State |
|---|---|---|---|
| List, invite and deactivate users. Change roles | yes | E4 | planned |
| Manage apps and allow-lists. Generate the snippet. Live preview | yes | E4 | planned |
| Widget settings with a preview that updates without reload | yes | E4 | planned |
| AI settings: model alias, system prompt, input length, quota | yes | E4 | planned |
| Audit list of admin actions | yes | E4 | planned |
| Follows the system colour scheme. A toggle overrides it | yes | E4 | planned |
| Vision label admin and corrections | no | E5 | planned |

## Health

Repo: `synthwerk-pulse`, shown in the studio.

| Feature | MVP | Epic | State |
|---|---|---|---|
| Live status per service | yes | E1, E4 | planned |
| Rate, errors and p95 per service | yes | E4 | planned |
| CPU, memory, disk, database connections, pending messages | yes | E4 | planned |
| Tokens per minute and model latency | yes | E4 | planned |
| Org admins see their own org only | yes | E4 | planned |
| AI cost per day, active alerts, trace links | no | E7, E8 | planned |

## AI

Repo: `synthwerk-llm`.

| Feature | MVP | Epic | State |
|---|---|---|---|
| One gateway. The provider comes from the environment | yes | E3 | planned |
| Quotas per user and org | yes | E3 | planned |
| Logs keep metadata only. No prompt or answer text | yes | E3 | planned |
| User AI tools read the user's own data only | no | E7 | planned |
| Admin AI uses read-only tools. Each call is audited | no | E7 | planned |
| Fallback provider | no | E8 | planned |

## SDK

Repo: [synthwerk-sdk](https://github.com/VelimirMueller/synthwerk-sdk).

| Feature | MVP | Epic | State |
|---|---|---|---|
| `@synthwerk/tokens`: colours, themes, type, accent families | yes | E0 | released, 0.2.0 |
| `@synthwerk/sdk` core: sign-in, typed API client, chat stream client | yes | E3 | planned |
| `@synthwerk/react` and `@synthwerk/vue` adapters | no | E7 | planned |
| `create-synthwerk-app` scaffold. React default, Vue by config | no | E7 | planned |
| `synthwerk-ui` component library | no | open | planned, see [design-system.md](design-system.md) |

## Public site and builder

Repo: `synthwerk-studio`.

| Feature | MVP | Epic | State |
|---|---|---|---|
| Prerendered pages in German and English, with legal pages | no | E6 | planned |
| Live demo with a strict rate limit | no | E6 | planned |
| Public numbers: uptime, p95, answered chats | no | E6 | planned |
| Analytics only after opt-in consent | no | E6 | planned |
| Section editor: hero, proof, benefits, pricing, FAQ, call to action | no | E6 | planned |
| Preview, publish, roll back | no | E6 | planned |
| Lead capture with double opt-in | no | E6 | planned |

## Public mascot

Second binary in `synthwerk-llm`. The name Strobe is not final.

| Feature | MVP | Epic | State |
|---|---|---|---|
| Answers without sign-in on the public site and the docs | no | E6 | planned |
| Answers Synthwerk facts from its own index and cites a source | no | E6 | planned |
| No tools, no database, no network egress. Local model only | no | E6 | planned |
| No conversation is stored on the server | no | E6 | planned |

## Platform

Repos: [synthwerk-blueprint](https://github.com/VelimirMueller/synthwerk-blueprint), `synthwerk-infra`, `synthwerk-contracts`, `synthwerk-e2e`.

| Feature | MVP | Epic | State |
|---|---|---|---|
| Reusable CI workflows, lint configs, repo templates | yes | E0 | released, v1 |
| One image, built once, promoted by digest: dev, stg, prd | yes | E1 | planned |
| Health and readiness endpoints in each service | yes | E1 | planned |
| Facts as events through a transactional outbox | yes | E1 | planned |
| One contract for APIs and events. Clients are generated | yes | E1 | planned |
| End-to-end tests across all services | yes | E3 | planned |
| Same images on k3s | no | E8 | planned |
