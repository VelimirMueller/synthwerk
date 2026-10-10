# Getting started

What you can run today, in about 10 minutes.

- **Today:** the map, the shared CI, the design tokens and the vision service work.
- **Not yet:** `docker compose up` for the full stack arrives with milestone M1.

## You need

- `git` and the GitHub CLI `gh`, signed in.
- Python 3 for the checks in this repo.
- Node.js 24 or later and `pnpm` for the tokens.
- [uv](https://docs.astral.sh/uv/) for the vision service.

## 1. Get the map

```bash
gh repo clone VelimirMueller/synthwerk
cd synthwerk
python3 scripts/check-ascii.py   # exit 0: all rules pass
scripts/check-links.sh           # exit 0: all links resolve
```

- Read the [README](../README.md) for the repo list.
- Read [architecture.md](architecture.md) for the full diagram.

## 2. Use the design tokens

```bash
gh repo clone VelimirMueller/synthwerk-sdk
cd synthwerk-sdk
pnpm install
pnpm test
```

- The package is `@synthwerk/tokens`. It is not on npm yet. Use it from the repo.
- It gives CSS variables, a Tailwind theme, JSON, and a first-paint script that prevents a theme flash.
- The rules are in [design-system.md](design-system.md).

## 3. Run the vision service

```bash
gh repo clone VelimirMueller/synthwerk-vision
cd synthwerk-vision
```

- Follow the quick start in the [synthwerk-vision README](https://github.com/VelimirMueller/synthwerk-vision#readme).
- It labels images on the CPU and calls no external API.

## 4. Adopt the shared CI

- Follow the [blueprint README](https://github.com/VelimirMueller/synthwerk-blueprint#readme).
- Your repo calls the workflows at `@v1`.

## Where to go next

| You want to | Read |
|---|---|
| Change code in a repo | [developer-guide.md](developer-guide.md) |
| Send a change | [CONTRIBUTING.md](../CONTRIBUTING.md) |
| See what is planned | [roadmap.md](roadmap.md) |
| Decide if Synthwerk fits | [stakeholder-guide.md](stakeholder-guide.md) |
