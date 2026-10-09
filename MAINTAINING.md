# Maintaining this repo

## Manual steps (GitHub has no API for them)

| Step | Where | When |
|---|---|---|
| Upload `assets/social-preview.png` | Repo **Settings → General → Social preview** | After the first push, and after each change of the image |
| Pin `synthwerk` and up to 5 `synthwerk-*` repos | Profile page → **Customize your pins** | After the first push |

- The PNG must stay below 1 MB and at 1280 × 640.

## Change the images

- Do not change a banner file in place. GitHub caches raw images. Add a new file name and update the links.
- SVGs contain no `<text>` and no external references. All text is outlined to paths.
- Regenerate the social preview after a change of `assets/social/social-preview.svg`:

```sh
npm i --no-save playwright@1.64.0
npx playwright install chromium
node scripts/render-social.mjs
```

## Check the links

```sh
scripts/check-links.sh            # checks README.md
scripts/check-links.sh other.md   # checks another file
```

- The script calls `gh api` with GET only. It needs a signed-in `gh`.
- A 404 for the repo `synthwerk` itself is allowed until the repo is published.
- Update the repo table when a repo is created or changes status. Then run the check.
