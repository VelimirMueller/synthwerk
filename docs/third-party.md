# Third-party tools

<img alt="11 THIRD-PARTY TOOLS. EVERYTHING WE DID NOT WRITE." src="../assets/docs/divider-thirdparty-v2.svg" width="100%">

Every outside tool and service that Synthwerk uses or plans to use.

- **In use** means a Synthwerk repo uses it today.
- **Planned** means the plan names it. It can change before its milestone.

## Hosted services

| Service | Purpose | State | Data it sees |
|---|---|---|---|
| GitHub | Code, Actions, ticket board, releases | in use | Source code |
| Figma | Design system, roadmap board | in use | Design files |
| Vercel | Front-end hosting for the demo | planned | Front-end code, request logs |
| Supabase | Postgres for the demo | planned | Synthetic demo data |
| Supabase Storage | Object storage for uploads (#77) | planned, decided 2026-10-29 | Uploaded images |
| IONOS | VPS for the back end and models. Hosts prd (#8) | in use for dev, prd decided 2026-10-29 | Demo traffic, later all prd traffic |
| Resend | Email: invites, double opt-in (#73) | planned, decided 2026-10-29 | Mail addresses, mail text, delivery logs |
| Hosted LLM provider | Chat answers in production | planned, choice per environment | Prompts of signed-in users |
| Payment provider | Checkout and paid plans | planned, milestone M5 | Billing data |

- A provider that processes personal data needs a data processing agreement before go-live.
- Development needs none of the paid services.

### Region, DPA and price

| Service | Region | DPA | Price |
|---|---|---|---|
| Resend | Sends from Ireland (`eu-west-1`). Account data and logs stay in the US | Yes, with EU SCCs and the EU-U.S. Data Privacy Framework | Free: 3,000 mails per month, 100 per day. Pro: 20 USD per month |
| Supabase Storage | EU region, same project as the database (#15) | Yes, accept it before real data | Free: 1 GB, 50 MB per file, 5 GB egress. Pauses after 1 week with no activity |

- Sources: resend.com/pricing, resend.com/legal/dpa, resend.com/docs/dashboard/domains/regions, supabase.com/pricing. Read on 2026-10-29.
- The details are in [infrastructure.md](infrastructure.md#decisions-of-2026-10-29).

## Run on our hosts

| Tool | Purpose | State |
|---|---|---|
| Zitadel | Sign-in, passkeys, MFA | planned |
| NATS JetStream | Event bus | planned |
| PostgreSQL | Database | planned |
| `multilingual-e5-small` | Embedding model for the mascot index (#78). Ships in the mascot image with a flat vector file. No index library. MIT license | in use, `synthwerk-mascot` |
| Traefik | Edge and TLS | planned |
| Coraza | Web application firewall | planned |
| OpenTelemetry | Traces, metrics, logs | planned |
| Ollama | Local models in development | planned |
| ONNX Runtime | Vision models and the mascot embedding model on the CPU | in use, `synthwerk-vision`, `synthwerk-mascot` |
| Umami | Analytics, only after opt-in consent | planned |
| Docker Compose | Run the stack on one host | planned |
| OpenTofu | Build hosts and repo settings | planned |

## Build tools

| Tool | Purpose | State |
|---|---|---|
| Biome | Format and lint for TypeScript | in use |
| Vitest | Tests for TypeScript | in use |
| pnpm | Package manager | in use |
| Ruff | Format and lint for Python | in use |
| uv | Python packages and environments | in use |
| Renovate | Dependency updates, 7-day wait | in use, preset in the blueprint |
| Playwright | End-to-end tests, social preview render | in use for the render, planned for tests |
| Vue, Nuxt | Widgets and studio | planned |
| TanStack Query | Data layer of the SDK adapters | planned |
| Go | contracts, pulse. Later identity and llm | in use |

## Fonts

| Font | Use | License |
|---|---|---|
| Inter | Headings and body | SIL OFL 1.1 |
| Space Mono | Labels, ASCII art, short `$` commands | SIL OFL 1.1 |
| JetBrains Mono | Code, logs and diffs | SIL OFL 1.1 |

- The font files and their license texts are in `assets/fonts/`.
- The files are the Latin `woff2` subsets from Fontsource. JetBrains Mono: `@fontsource/jetbrains-mono` 5.3.0, weights 400 and 700.

## Rules

- Each tool has one purpose. Two tools for one purpose need a reason.
- A new hosted service needs a line in this file before it is used.
- Licenses of shipped dependencies must allow use under the [MIT license](../LICENSE).
