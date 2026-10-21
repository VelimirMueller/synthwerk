# Infrastructure

<img alt="07 INFRASTRUCTURE. THREE PROVIDERS. ONE DEMO." src="../assets/docs/divider-infra-v2.svg" width="100%">

Where Synthwerk runs. This page covers hosting, the database and the demo.

- **Today:** nothing is deployed. The services run on a developer machine or not at all.
- **Decided 2026-10-10:** the demo runs on the stack below.
- **Decided 2026-10-21:** the server is one IONOS VPS. It replaces the earlier plan of one VM per environment.
- **Open:** the database and front ends for prd, and whether dev, stg and prd share the VPS. See [Open decisions](#open-decisions).

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/docs/infra-flow-v2-dark.svg">
  <img alt="VERCEL -&gt; VPS -&gt; SUPABASE -&gt; GITHUB. Decided 2026-10-10. Nothing is deployed yet." src="../assets/docs/infra-flow-v2-light.svg" width="100%">
</picture>

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
- The VPS size is in [The VPS](#the-vps).

## The VPS

Stated by the owner on 2026-10-21. Not measured yet: #7 checks the numbers with `lscpu`, `free -h`, `df -h` and `lsblk`.

| Part | Value |
|---|---|
| Provider | IONOS, EU region |
| CPU | 8 cores |
| Memory | 8 GB |
| Disk | 256 GB, stated as HDD |
| GPU | None |
| OS | Not recorded |

### Memory budget (estimate)

| Part | Memory |
|---|---|
| OS and Docker | about 0.5 GB |
| Edge, NATS, Zitadel, Go services | about 1.5 GB |
| Telemetry stack | about 1 GB |
| Vision model | about 1 to 2 GB |
| Left for the chat model | about 3 GB |

- Largest chat model: about 3B to 4B parameters at 4-bit, on the CPU. A 7B model does not fit next to the rest of the stack.
- Answers stream slower than on a GPU. The eval in #72 measures the speed.
- On a spinning disk, models load slowly. `lsblk -d -o NAME,ROTA` shows `1` for a spinning disk.
- Open (M1, #7): the final model size, after the numbers are measured.

## Hosting and database

| Topic | Demo | Notes |
|---|---|---|
| Front-end hosting | Vercel | Preview build per pull request |
| Back-end hosting | IONOS VPS | Docker Compose. One host |
| Database | Supabase Postgres | One project for the demo |
| Event bus | NATS on the VPS | Planned, milestone M1 |
| Edge | Traefik and a web application firewall on the VPS | Planned, milestone M1 |
| Telemetry | OpenTelemetry stack on the VPS | Planned, milestone M1 |
| Models | Local models on the VPS | CPU only. About 3B to 4B at 4-bit, see [The VPS](#the-vps) |
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
| Server provider | Another EU cloud, built with OpenTofu, one VM per environment | One IONOS VPS | Decided 2026-10-21: one IONOS VPS |
| Environments on the VPS | One VM each | dev only | Whether stg and prd share the 8 GB VPS |
| Database | Postgres on the server, with its own backups | Supabase | Which one is used for prd |
| Front ends | Served from the server behind the edge | Vercel | Which one is used for prd |
| Mascot host | Its own VM with no network egress | Not placed | Whether the VPS can isolate it |

- A decision here changes [architecture.md](architecture.md). Update both in one pull request.

## Rules

- All data stays in the EU.
- No personal data in the demo. Demo data is synthetic.
- An AI call needs a signed-in user. The demo uses a demo org with a strict rate limit.
