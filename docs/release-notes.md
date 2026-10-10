# Release notes

What changed across the Synthwerk repos, newest first. Written for readers who do not read commits.

- The changes of this repo alone are in [CHANGELOG.md](../CHANGELOG.md).
- Each service repo keeps its own changelog.

## 2026-10-10

- **Docs.** This repo now holds the docs index: use cases, features, roadmap, design system, infrastructure, CI/CD and guides.
- **Look.** All eight repos carry the new README look with indigo art.
- **Tokens.** `@synthwerk/tokens` can switch the accent family with `data-group`. The default look is unchanged.
- **Demo stack decided.** Front ends on Vercel, back end on one VPS, database on Supabase.

## 2026-10-09

- **synthwerk-blueprint v1.0.0 and v1.0.1.** Reusable CI workflows for TypeScript, Go, Python, container images and feature docs. Repos call them at `@v1`.
- **@synthwerk/tokens 0.1.0 and 0.2.0.** Colours, themes, type and wordmark as CSS variables, Tailwind theme and JSON.
- **synthwerk-vision on Python 3.14.** The eval score is unchanged at 93.1 %.
- **New names.** The former prototype repos are now `synthwerk-identity`, `-llm`, `-vision`, `-widgets` and `-studio`. Old addresses redirect.
- **This repo published.** The map of all repos, with the ecosystem diagram and the roadmap.

## How a release is written

- One entry per date. Newest first.
- One bullet per change. Start with the repo or the topic in bold.
- Say what a user or developer can do now. Leave out how it was built.
- Link the release tag when one exists.
