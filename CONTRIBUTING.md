# Contributing

Thank you for your interest. This page says how to send a change to a Synthwerk repo.

## Before you start

- Read the [developer guide](docs/developer-guide.md).
- Look for an open task on the [ticket board](https://github.com/VelimirMueller/synthwerk/projects).
- For a large change, open an issue first and describe the problem. Wait for an answer before you write code.

## Send a change

1. Fork the repo and create a branch from `main`: `feat/<topic>`, `fix/<topic>` or `docs/<topic>`.
2. Make one change per pull request. Keep it small.
3. Add or change tests for changed behaviour.
4. Run the checks that the README of the repo names.
5. Open a pull request.

## Pull request

Use these headings in the description:

- **What changed.** The result, in one or two bullets.
- **Why.** The problem this solves.
- **How to verify.** The commands or steps, and the expected result.
- **Risk.** What can break.

## Commit messages

- Use the form `type(scope): summary`. Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`.
- Write the summary in the imperative: `add`, `fix`, `remove`.
- One line of 72 characters or fewer. Add a body only when the reason is not obvious.

## Writing

- Short sentences. One fact per bullet. The result comes first.
- State what is true today. Mark a plan as planned and name its milestone.
- No marketing words.

## Look

- READMEs, banners and ASCII art follow the [presence style guide](docs/presence-style.md).
- Colours and components follow the [design system](docs/design-system.md).
- Do not edit a generated SVG by hand. [MAINTAINING.md](MAINTAINING.md) names the script.

## Checks in this repo

```bash
python3 scripts/check-ascii.py   # exit 0: all rules pass
scripts/check-links.sh           # exit 0: all links resolve
```

## Security

- Do not open a public issue for a security problem.
- Use **Security → Report a vulnerability** in the affected repo.
- Never commit a secret. If a secret is committed, treat it as leaked and rotate it.

## License

- Your contribution is licensed under the [MIT license](LICENSE) of the repo.
