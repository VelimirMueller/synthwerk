# Third-party tools

Every outside tool and service that Synthwerk uses or plans to use.

- **In use** means a Synthwerk repo uses it today.
- **Planned** means the plan names it. It can change before its milestone.

## Hosted services

| Service | Purpose | State | Data it sees |
|---|---|---|---|
| GitHub | Code, Actions, ticket board, releases | in use | Source code |
| Figma | Design system, roadmap board | planned | Design files |
| Vercel | Front-end hosting for the demo | planned | Front-end code, request logs |
| Supabase | Postgres for the demo | planned | Synthetic demo data |
| IONOS | VPS for the demo back end and models | planned | Demo traffic |
| Hosted LLM provider | Chat answers in production | planned, choice per environment | Prompts of signed-in users |
| Payment provider | Checkout and paid plans | planned, milestone M5 | Billing data |

- A provider that processes personal data needs a data processing agreement before go-live.
- Development needs none of the paid services.

## Run on our hosts

| Tool | Purpose | State |
|---|---|---|
| Zitadel | Sign-in, passkeys, MFA | planned |
| NATS JetStream | Event bus | planned |
| PostgreSQL | Database | planned |
| Traefik | Edge and TLS | planned |
| Coraza | Web application firewall | planned |
| OpenTelemetry | Traces, metrics, logs | planned |
| Ollama | Local models in development | planned |
| ONNX Runtime | Vision models on the CPU | in use, `synthwerk-vision` |
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
| Go | identity, llm, pulse | planned |

## Fonts

| Font | Use | License |
|---|---|---|
| Inter | Headings and body | SIL OFL 1.1 |
| Space Mono | Labels, code, ASCII art | SIL OFL 1.1 |

- The font files and their license texts are in `assets/fonts/`.

## Rules

- Each tool has one purpose. Two tools for one purpose need a reason.
- A new hosted service needs a line in this file before it is used.
- Licenses of shipped dependencies must allow use under the [MIT license](../LICENSE).
