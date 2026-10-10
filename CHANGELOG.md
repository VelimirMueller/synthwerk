# Changelog

All notable changes to this repo. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This repo has no versions. Entries are grouped by date.

Changes across all Synthwerk repos are in [docs/release-notes.md](docs/release-notes.md).

This file started on 2026-10-10. The earlier entries are taken from the merged pull requests #1 to #5, so they list files that were already on `main`, for example `docs/architecture.md`.

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
