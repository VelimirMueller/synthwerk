// Renders assets/social/social-preview.svg to assets/social-preview.png (1280 × 640).
// Needs Playwright with Chromium: npm i --no-save playwright@1.64.0 && npx playwright install chromium
// Run from the repo root: node scripts/render-social.mjs
import { statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = new URL('../', import.meta.url)
const src = new URL('assets/social/social-preview.svg', root)
const out = fileURLToPath(new URL('assets/social-preview.png', root))

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 640 }, deviceScaleFactor: 1 })
  await page.goto(src.href)
  await page.screenshot({ path: out })
} finally {
  await browser.close()
}

const bytes = statSync(out).size
if (bytes >= 1_000_000) throw new Error(`${out} is ${bytes} bytes. GitHub accepts less than 1 MB.`)
console.log(`wrote ${out} (${bytes} bytes)`)
