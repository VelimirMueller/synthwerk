# Infrastructure

Where Synthwerk runs. This page covers hosting, the database and the demo.

- **Today:** nothing is deployed. The services run on a developer machine or not at all.
- **Decided 2026-10-10:** the demo runs on the stack below.
- **Open:** the production plan names a different provider. See [Open decisions](#open-decisions).

## Demo stack

```text
-- 01 ----------------------------------------------------- DEMO STACK --

   visitor
      |
 +----v-----------+        +-------------------+
 |  Vercel        |  API   |  VPS              |
 |  front ends    +------->+  edge, services,  |
 |  studio, site  |        |  local models     |
 +----+-----------+        +---------+---------+
      |                              |
      |        +----------------+    |
      +------->+  Supabase      +<---+
               |  Postgres      |
               +----------------+

   GitHub: code, CI/CD, ticket board      Figma: design, roadmap
```

| Part | Runs on | Purpose |
|---|---|---|
| Front ends | Vercel | Studio, public site, demo pages |
| Back end | One IONOS VPS | Edge, services, event bus, heavy computing, local models |
| Database | Supabase | Postgres for the demo |
| Code and tasks | GitHub | Repos, Actions, ticket board, releases |
| Design | Figma | Design system, roadmap board |

- The demo shows a distributed system: a front end, a back end and a database on three providers.
- The VPS runs the models for the Synthwerk tools, as far as its hardware allows.
- The VPS size is not recorded here yet. The first task on the board measures it and sets the model sizes.

## Hosting and database

| Topic | Demo | Notes |
|---|---|---|
| Front-end hosting | Vercel | Preview build per pull request |
| Back-end hosting | IONOS VPS | Docker Compose. One host |
| Database | Supabase Postgres | One project for the demo |
| Event bus | NATS on the VPS | Planned, milestone M1 |
| Edge | Traefik and a web application firewall on the VPS | Planned, milestone M1 |
| Telemetry | OpenTelemetry stack on the VPS | Planned, milestone M1 |
| Models | Local models on the VPS | Size depends on the hardware |
| Secrets | GitHub environment secrets | No secret in a repo |

## Environments

| Name | Trigger | Data |
|---|---|---|
| dev | Merge to `main` | Synthetic. Reset is allowed |
| stg | Tag `vX.Y.Z` | Synthetic. Same config as prd |
| prd | Manual approval, same image digest as stg | Real |

- One image is built once and promoted by digest. There are no environment branches.
- The demo starts as one environment on one VPS. It is the dev host of milestone M2.
- The full flow is in [ci-cd.md](ci-cd.md).

## Open decisions

| Topic | Earlier plan | Demo stack | To decide |
|---|---|---|---|
| Server provider | Another EU cloud, built with OpenTofu, one VM per environment | One IONOS VPS | Does the VPS replace the plan, or is it the demo only |
| Database | Postgres on the server, with its own backups | Supabase | Which one is used for prd |
| Front ends | Served from the server behind the edge | Vercel | Which one is used for prd |
| Mascot host | Its own VM with no network egress | Not placed | Whether the VPS can isolate it |

- A decision here changes [architecture.md](architecture.md). Update both in one pull request.

## Rules

- All data stays in the EU.
- No personal data in the demo. Demo data is synthetic.
- An AI call needs a signed-in user. The demo uses a demo org with a strict rate limit.
