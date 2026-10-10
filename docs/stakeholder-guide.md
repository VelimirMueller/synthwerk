# Stakeholder guide

Synthwerk in five minutes, for people who decide and do not build.

## What it is

- Synthwerk is a set of small services for AI chat, image recognition and page building.
- You run all of it yourself. Your data stays on your servers.
- One developer can add AI chat to a website in minutes and grow it into a full product.

## What is true today

| Area | State | Proof |
|---|---|---|
| Shared CI and templates | Released, v1 | [synthwerk-blueprint](https://github.com/VelimirMueller/synthwerk-blueprint) |
| Design tokens | Released, 0.2.0 | [synthwerk-sdk](https://github.com/VelimirMueller/synthwerk-sdk) |
| Image recognition | Working. The eval set scores 93.1 % | [synthwerk-vision](https://github.com/VelimirMueller/synthwerk-vision) |
| Sign-in, chat, admin, health | Planned, rewrite | [roadmap.md](roadmap.md) |
| Public demo | Planned, milestone M4 | [infrastructure.md](infrastructure.md) |

- No service is deployed yet. The first full local stack is milestone M1.

## Why it is different

- **Self-hosted.** No closed service holds the data.
- **Modular.** Each part is a separate repo. Use one part or all parts.
- **Local-first.** Development needs no paid AI provider.
- **Safe by design.** No anonymous AI. Access is decided by the user's token, not by a prompt.
- **German and EU law first.** Legal pages, consent and data location are part of the plan.

## When things arrive

| Milestone | Date (estimate) | You can see |
|---|---|---|
| M1 | 2026-11-20 | The stack starts on one machine. A live health view is green |
| M2 | 2027-01-29 | A signed-in user chats with an AI on a test page |
| M3 | 2027-02-26 | The first version runs in production |
| M4 | 2027-04-09 | A public site with a live demo |
| M5 | 2027-05-07 | Paid plans and app templates |
| M6 | 2027-06-04 | Cluster-ready. Card scan works |

- Dates are estimates. The plan has one buffer of two weeks at the end of the year.

## How to follow the work

| Question | Where |
|---|---|
| What is in progress | [Ticket board](https://github.com/VelimirMueller/synthwerk/projects) |
| What changed | [release-notes.md](release-notes.md) |
| What is planned | [roadmap.md](roadmap.md) |
| What it will do | [feature-catalogue.md](feature-catalogue.md) |
| Who it is for | [use-cases.md](use-cases.md) |
| How it looks | [design-system.md](design-system.md) |

## Risks

| Risk | Answer |
|---|---|
| One person builds it | Small repos, shared CI, each part works alone |
| The scope is large | The MVP is epics E0 to E4. All other parts come later |
| Hosting is not final | The demo stack is decided. The production choice is open, see [infrastructure.md](infrastructure.md) |
| Dates slip | Each milestone has a testable proof. The board shows the state |

## Terms

- Open source under the [MIT license](../LICENSE).
- The operator of the public site is a private person, not a company.
