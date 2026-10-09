# Maintaining this repo

## Manual steps (GitHub has no API for them)

| Step | Where | When |
|---|---|---|
| Upload `assets/social-preview.png` | Repo **Settings → General → Social preview** | After the first push, and after each change of the image |
| Pin `synthwerk` and up to 5 `synthwerk-*` repos | Profile page → **Customize your pins** | After the first push |

- The PNG must stay below 1 MB and at 1280 × 640.

## Change the images

- The look is defined in [docs/presence-style.md](docs/presence-style.md) (decision D-41).
- Do not change a banner file in place. GitHub caches raw images. Make a new version and update the links.
- Do not edit the SVGs by hand. `scripts/make-banner.py` writes them. All text is outlined to paths. The SVGs contain no `<text>`, no fonts and no external references.
- The fonts for the outlines are in `assets/fonts/` (Space Mono and Inter, SIL OFL 1.1).

Make a new banner version (dark, light and the social-preview SVG):

```sh
python3 -m pip install fonttools brotli
python3 scripts/make-banner.py --version v3
```

- Then change `v2` to `v3` in `README.md` and in `scripts/render-social.mjs`. Remove the old files.

Render the social-preview PNG from `assets/social/social-preview-v2.svg`:

```sh
npm i --no-save playwright@1.64.0
npx playwright install chromium
node scripts/render-social.mjs
```

## Change the ASCII art

- The ASCII kit is in `assets/ascii/`. The README uses copies of these files in `text` code blocks.
- After a change to the kit, copy the change into `README.md`.
- Make a block wordmark with `python3 scripts/ascii-wordmark.py WORD.`
- Check widths and characters:

```sh
python3 scripts/check-ascii.py                          # README.md and assets/ascii
python3 scripts/check-ascii.py docs/presence-style.md   # another file
```

- Exit 0: all rules pass. Exit 1: a rule fails. The output gives the file, the block and the row.

## Check the links

```sh
scripts/check-links.sh            # checks README.md
scripts/check-links.sh other.md   # checks another file
```

- The script calls `gh api` with GET only. It needs a signed-in `gh`.
- Exit 0: all links resolve. Exit 1: a link is broken. Exit 2: an API call failed (auth, rate limit, network).
- A 404 for the repo `synthwerk` itself is allowed until the repo is published.
- Update the repo table when a repo is created or changes status. Then run the check.
