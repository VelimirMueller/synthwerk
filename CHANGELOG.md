# Changelog

All notable changes to this repo. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This repo has no versions. Entries are grouped by date.

Changes across all Synthwerk repos are in [docs/release-notes.md](docs/release-notes.md).

This file started on 2026-10-10. The earlier entries are taken from the merged pull requests #1 to #5, so they list files that were already on `main`, for example `docs/architecture.md`.

## 2026-10-21

### Fixed

- `docs/README.md`: the Figma library is built from code, and `@synthwerk/ui-vue` 0.1.0 is built. Both rows said planned.
- `docs/third-party.md`: Figma is in use.

## 2026-10-13

### Added

- CI: the `checks` workflow runs `check-ascii.py` and `check-links.sh` on `README.md` and `docs/*.md`, plus ruff and Biome on the scripts, for every pull request.
- JetBrains Mono, the code font of the tokens: font files and OFL text in `assets/fonts/`, a row in `docs/third-party.md`, a line in `docs/design-system.md`.

### Changed

- `@synthwerk/ui-vue` 0.1.0 (`synthwerk-ui`) is built: the roadmap (D3), the feature catalogue and the design system say so. The package name and the epic stay open (M2).
- The design-flow image shows Figma and `synthwerk-ui` as built.
- `check-links.sh` takes many files. A file without synthwerk links passes.

### Fixed

- `docs/CLAUDE-PROJECT.md`: the instructions block is wrapped to 80 columns, so `check-ascii.py` passes.

## 2026-10-12

### Changed

- Milestone M0 Clean slate is done: the roadmap, the README status and the status images say so.
- README images move to `v4` and docs images to `v2`. Only the status, roadmap and now panels have new content.

### Fixed

- README says `@synthwerk/tokens` 0.2.0. `docs/CLAUDE-PROJECT.md` names the demo stack and says the SDK is planned.

## 2026-10-11

### Added

- [docs/CLAUDE-PROJECT.md](docs/CLAUDE-PROJECT.md): steps and paste-ready instructions for a Claude project about Synthwerk.

## 2026-10-10

### Added

- Docs index in [docs/README.md](docs/README.md) with pages for use cases, feature catalogue, roadmap, design system, infrastructure, CI/CD, getting started, developer guide, stakeholder guide, third-party tools and release notes.
- A header image and a panel in dark and light on each docs page. The spec is `brand/docs-kit.json`.
- [CONTRIBUTING.md](CONTRIBUTING.md) and this changelog.
- Ticket board layout in [docs/project-board.md](docs/project-board.md).
- `docs/architecture.md` with the full ecosystem diagrams.
- Art hero image at the top of the README.

### Changed

- README in the v2 look: hero, divider images and panels in dark and light.
- Art graded to indigo.
- Milestones M1 to M6 are marked as planned.

## 2026-10-09

### Added

- First version of the repo: banner, ecosystem map, repo status, roadmap, MIT license.
- `MAINTAINING.md` with the manual GitHub steps.
- ASCII kit in `assets/ascii/` and the checks `scripts/check-ascii.py` and `scripts/check-links.sh`.
- Presence style guide in `docs/presence-style.md`.

### Changed

- Overview restyled to the website look.

### Fixed

- `scripts/check-links.sh` reports an API error separately from a broken link.
