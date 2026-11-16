# Security review 2026-11

Result: no high finding. 10 medium findings: 4 are fixed in open PRs, 6 are open with a fix plan. 34 low findings: 2 fixed, 32 accepted with a reason.

- Issue: [synthwerk#59](https://github.com/VelimirMueller/synthwerk/issues/59).
- Date: 2026-11-16.
- Scope: edge and WAF, token scopes, mascot isolation, secrets, dependencies.
- Code state: `main` of every repo, `develop` of synthwerk-pulse, as of 2026-11-16 12:00 UTC.
- The code merged on 2026-11-16 got the most time.
- That code: lead capture, public site, widget host, iframe mode, past conversations, AI tools, pulse alerts, public numbers, live demo limits.

## Counts

| Severity | Found | Fixed (PR open) | Open, fix planned | Accepted |
|---|---|---|---|---|
| High | 0 | 0 | 0 | 0 |
| Medium | 10 | 4 | 6 | 0 |
| Low | 34 | 2 | 0 | 32 |

"Fixed" means a PR is open, reviewed and green. The fix is live only after the merge and the next image pin.

## Method

- Each area was read route by route: authentication, authorisation, tenant isolation and origin binding.
- The review also checked CORS, postMessage, CSRF, SSRF, injection, rate limits and body limits.
- It also checked secrets, container hardening, NATS rights and WAF rules.
- Secrets: `gitleaks git --log-opts=--remotes=origin` on 13 repos. GitHub secret scanning alerts: 0 open in every repo.
- Go: `govulncheck ./...` in identity, llm, pulse, infra and contracts.
- Node: `pnpm audit --prod` in studio, widgets, sdk and contracts.
- Python: `pip-audit` on the runtime lock of vision and mascot.
- GitHub: open Dependabot alerts and code scanning alerts of every repo.
- The report gives no exploit steps. It names no secret value.

## Findings

Severity: high = remote, real impact without conditions. Medium = needs a condition, or a gap with a plausible abuse. Low = hardening.

### Medium

| ID | Area | Severity | Finding | Status | PR |
|---|---|---|---|---|---|
| SR-01 | Dependencies (identity, llm, pulse, infra) | medium | Go 1.27.3 (infra 1.27.1) and `x/net` 0.58/0.59 have reachable HTTP/1 and HTTP/2 server advisories. Examples: GO-2026-6859, GO-2026-6617. pulse also has a `klauspost/compress` panic (GO-2026-6865). | fixed: Go 1.27.4, `x/net` 0.60.0, `compress` 1.20.2. `govulncheck` is clean. | [identity#29](https://github.com/VelimirMueller/synthwerk-identity/pull/29), [llm#41](https://github.com/VelimirMueller/synthwerk-llm/pull/41), [pulse#9](https://github.com/VelimirMueller/synthwerk-pulse/pull/9), [infra#35](https://github.com/VelimirMueller/synthwerk-infra/pull/35) |
| SR-02 | Studio CSRF | medium | Nuxt below 4.6.4 lets a leading `//` skip path checks in server middleware. The CSRF middleware checked only paths that start with `/api/`. Session routes still checked `x-csrf-token`. | fixed: Nuxt 4.6.4. The guard checks every unsafe request on every path. | [studio#50](https://github.com/VelimirMueller/synthwerk-studio/pull/50) |
| SR-03 | Dependencies (vision) | medium | Runtime packages `filelock` 4.0.9 and `opentelemetry-api` 1.45.1 have open advisories. `nltk` (dev only) too. | fixed: filelock 4.2.10, OpenTelemetry 1.45.2, nltk 3.10.4. `pip-audit` is clean. | [vision#46](https://github.com/VelimirMueller/synthwerk-vision/pull/46) |
| SR-04 | Infra bootstrap | medium | `scripts/init-env.sh` fills every empty password, also the test user password. A dev or prd stack then gets `operator.test` with the platform operator role. | fixed: the bootstrap stops when the password is set outside `local` and `ci`. | [infra#37](https://github.com/VelimirMueller/synthwerk-infra/pull/37) |
| SR-05 | NATS rights | medium | llm and pulse share one NATS user with all rights. identity, llm and pulse trust an event by its subject only. A compromised llm or pulse can forge audit rows, user erasure and usage numbers. | open, fix planned: own users for llm and pulse with least privilege, like studio and identity. | - |
| SR-06 | Database rights | medium | pulse connects to Postgres as the superuser. pulse also serves a public route without a token. A pulse bug can then reach every database. | open, fix planned: own `pulse` role and schema in `init.sql`. | - |
| SR-07 | Edge and studio | medium | The public site, the lead form and the live demo bypass the edge: no WAF, no edge rate limit. Behind a proxy, the lead limit key is the proxy address, or the last `X-Forwarded-For` entry from any peer. | open, fix planned: studio router behind the edge, and a trusted-proxy list instead of the boolean `NUXT_SITE_TRUST_FORWARDED_FOR`. Needs the studio host name. | - |
| SR-08 | Studio leads | medium | The per-page limit (60 an hour) and the per-org pending cap (1000) are shared by all visitors. Two clients can keep a lead form at 429. The page key is counted before the page check. | open, fix planned: count after the live page check, key on the page id, own limiter per key family, cap only recent pending rows. | - |
| SR-09 | llm CORS | medium | Preflights with new origins need no token. "No" answers share the cache with "yes" answers and evict them. When all 8 lookups are busy, a known customer origin is refused too. | open, fix planned: separate bounded cache for "no", serve a stale "yes" when busy. | - |
| SR-10 | Vision limits | medium | Classification and upload have no limit per caller. One widget token holder can fill the org upload quota (1 GiB, 10000 files) or keep the classifier busy. | open, fix planned: token bucket per org and user on both routes. | - |

### Low

| ID | Area | Severity | Finding | Status | PR |
|---|---|---|---|---|---|
| SR-11 | Dependencies (llm) | low | `moby/go-archive` and `moby/sys/user` advisories. They are test-only, through testcontainers. | fixed | [llm#41](https://github.com/VelimirMueller/synthwerk-llm/pull/41) |
| SR-12 | Repo settings | low | Dependabot alerts were off in synthwerk-mascot and synthwerk-e2e. | fixed: turned on 2026-11-16 (repo setting, no PR) | - |
| SR-13 | Dependencies (studio) | low | `pnpm audit --prod` still lists glob, minimatch, node-forge and deepmerge. | accepted: build-time and dev-server packages of nitropack. They are not in the `.output` runtime. | - |
| SR-14 | Dependencies (widgets, sdk) | low | happy-dom and minimatch advisories. | accepted: test-only. Dependabot PRs widgets#52 and sdk#27 bump them. | - |
| SR-15 | Code scanning (widgets) | low | Polynomial regex in the vendored `safeHref` (`@synthwerk/ui-vue`). | accepted: runs in the browser on one link value. A long value only slows that page. | - |
| SR-16 | Secrets | low | gitleaks hits: the known legacy DB password (tag `legacy-final`, rotated by decision), test fixture keys, OpenAPI examples, file hashes, a Figma file key. | accepted: no live secret. The legacy password is burned. | - |
| SR-17 | identity roles | low | Operator and admin routes do not check `amr` themselves. | accepted: the server-side MFA gate is on by default. Zitadel then issues no token without MFA. | - |
| SR-18 | identity internal route | low | `GET /internal/v1/widget-origins` has no token. Only the edge rule that refuses `/identity/internal/` protects it. | accepted: the answer is yes or no only. The stack test checks the refusal. Follow-up: own listener. | - |
| SR-19 | identity origins | low | The origin allow-list is global. A tenant can list any https origin without proof of ownership. | accepted: llm uses it for CORS only. Widget calls need a bearer token bound to one origin. | - |
| SR-20 | Token audience | low | Widget tokens and user tokens share the audience `synthwerk-api`. | accepted: the issuers differ. llm and vision pin the issuer per route. | - |
| SR-21 | Public health | low | `/identity`, `/llm`, `/pulse` and mascot `readyz` show version, commit and check names. The Zitadel host serves `/debug/*`. | accepted: no secret, no tenant data. Follow-up: deny `readyz` and `/debug/` at the edge. | - |
| SR-22 | SDK templates | low | Template sign-out keeps the identity provider session. | accepted: documented in the template. Follow-up: `signoutRedirect`. | - |
| SR-23 | Edge client address | low | `entryPoints.web` trusts no forwarded headers. Behind a front proxy, all clients share one rate-limit bucket. | accepted: no front proxy exists. The planned deploy publishes the edge itself. A proxy needs `trustedIPs`. | - |
| SR-24 | Zitadel PATs | low | The IAM owner PAT and the login client PAT expire in 2099. | accepted for local. Known follow-up: shorter dates on the dev host. | - |
| SR-25 | Container hardening | low | database, bus, telemetry and ollama have no `cap_drop` or `read_only`. Most services have no memory, CPU or pids limit. Zitadel and its login UI run as uid 0. | accepted: internal networks, no published ports. Follow-up before the dev host. | - |
| SR-26 | Edge test parts | low | The stub backend and the test issuer key set are routed on the edge. | accepted: public key only. Follow-up: move to a test profile. | - |
| SR-27 | Widget frame origin | low | The chat frame page shares its origin with the APIs. llm trusts that origin for every app. | accepted: the frame has no HTML sink and a strict CSP. Follow-up: own widget host name. | - |
| SR-28 | CI supply chain | low | Reusable workflows of own repos are pinned by tag, not by SHA. One helper image has no digest. | accepted: own repos. Third-party actions are pinned by SHA. | - |
| SR-29 | Mailpit | low | The Mailpit UI has no auth and shows invite codes and lead links. | accepted: local and CI only, bound to 127.0.0.1. | - |
| SR-30 | Studio headers | low | The public site sends no CSP or HSTS. The analytics script loads without SRI on the admin origin. | accepted: no analytics URL is set today. Follow-up with the site host. | - |
| SR-31 | Studio demo | low | The demo in-flight gate (2) is global. One user can hold both slots. | accepted: limits per user stay. Follow-up: one slot per user. | - |
| SR-32 | Studio health stream | low | No cap on open health streams per session. | accepted: only org owners, admins and operators. | - |
| SR-33 | Studio logs | low | The provider `error` value goes into a log line with newlines kept. | accepted: 64 characters, own state cookie needed. Follow-up: log the code only. | - |
| SR-34 | Studio OIDC client | low | No algorithm list in `jwtVerify`, no timeouts on IdP fetches. | accepted: jose limits the algorithm to the key type. | - |
| SR-35 | Studio leads (privacy) | low | A confirmed lead cannot withdraw consent by link. | accepted: needs the owner (legal text, GDPR Art. 7(3)). Org admins can delete a lead. | - |
| SR-36 | Studio errors | low | 503 answers name config variables to signed-in users. | accepted: signed-in users only, no values. | - |
| SR-37 | llm answers | low | No `max_tokens` goes to the provider. One answer can pass the daily quota. | accepted: the stream timeout (120 s) and the tool rounds limit it. | - |
| SR-38 | llm growth | low | No limit on new conversations per user. Reads load all messages. | accepted: the token quota limits growth. | - |
| SR-39 | llm fairness | low | One global provider slot pool, no share per org. | accepted: 2 streams per user. Follow-up with the prd model host. | - |
| SR-40 | llm secrets | low | `DATABASE_URL` and `NATS_URL` with passwords come from env only. | accepted: env of an internal container. Follow-up: `_FILE` variants. | - |
| SR-41 | Mascot limits | low | The limit key is the full IP address, so each IPv6 address is a new client. The global limit is 60 a minute. | accepted: availability only. The mascot has no model and no tools. | - |
| SR-42 | Vision uploads | low | FastAPI parses the multipart body before the token check. | accepted: the edge caps request bodies at 1 MiB. Note: vision allows 5 MB, so uploads above 1 MiB fail at the edge. | - |
| SR-43 | Vision images | low | Base images use floating tags (`python:3.14-slim`, `uv:0.11`). | accepted: Dependabot watches the docker ecosystem. Follow-up: digests. | - |
| SR-44 | pulse stream | low | One org admin can take all 50 stream slots. A stream outlives its token by up to 1 h. | accepted: viewer roles only. Follow-up: cap per org. | - |

## Checked and OK

- Edge: Traefik ignores incoming `X-Forwarded-*`, has no dashboard, and drops PII from logs and spans.
- WAF: Coraza fails closed. Every CRS exclusion is limited to one host, path or argument.
- Routes: the widget, frame, vision and mascot routes use anchored regexes. Admin and internal routes are not routed.
- Networks: `app`, `data`, `zitadel-hooks` and `mascot` are internal. Every published port binds to 127.0.0.1.
- Mascot: own network with an isolated gateway, no egress, read-only, no capabilities, retrieval only (no model, no tools).
- NATS: the users `studio` and `identity` have least privilege and own inbox prefixes.
- Tokens (identity, llm, vision): RS256 or ES256 only, `kid` and `exp` required, issuer and audience checked, ID tokens refused, JWKS refetch limited.
- Widget tokens: ES256, 1 to 15 min, `synthwerk:origin` from the allow-list. A widget token cannot buy another one.
- Origin binding (llm): the data filter uses the signed origin claim, never the `Origin` header. A widget token of origin A cannot read conversations of origin B.
- AI tools: no arguments, scope from the token, the admin tool needs a user token and an active membership. Tool results hold only the caller's own data.
- Tenant isolation: identity checks token org, role and stored membership. llm forces RLS. Studio takes the org from the session, never from the path.
- postMessage (iframe mode): exact `targetOrigin` on both sides, `event.source` and `event.origin` checked. The frame refuses a token whose origin claim is not its parent.
- XSS: no `v-html`, `innerHTML` or `eval` in widgets or studio. Links pass `safeHref` (http, https, mailto only).
- Studio session: `__Host-` cookie, HttpOnly, Secure, SameSite=Lax, new id per sign-in, PKCE, constant-time state check.
- Studio leads: random 32-byte token, only its hash stored, single use, 72 h. Same answer for every valid form. No mail header injection.
- Studio stats proxy: URL from config only, no redirects, 5 s timeout, field allow-list.
- Body limits: every studio write route is capped. llm 64 KiB, identity 1 to 64 KiB, edge 1 MiB.
- SQL: parameters everywhere in identity, llm, pulse, studio and vision.
- pulse public numbers: aggregates only, cached 60 s, one refresh at a time. Alert trace fields only for operators.
- Widget host: GET and HEAD on versioned bundles only, uid 101, read-only, sha384 check of every bundle against `releases.json`.
- Images: distroless or slim non-root images with `.dockerignore` allow-lists. No `.env` in an image.
- Workflows: no `pull_request_target`, `permissions: {}` by default, inputs through `env:` only.

## Merge order

1. Dependency PRs, any order: identity#29, llm#41, pulse#9, infra#35, vision#46.
2. studio#50 and infra#37, any order.
3. After the merges: pin the new identity, llm and pulse images in synthwerk-infra.

## Open work

- SR-05 to SR-10 need their own PRs. They were not started in this round.
- SR-07 needs the owner: the public host name of studio.
- SR-35 needs the owner: the withdraw text for leads.
- Follow-ups of accepted low findings go to issues when the dev host gets a deploy path.
