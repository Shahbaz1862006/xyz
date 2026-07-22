/**
 * One-off image sourcing script — RUN LOCALLY WITH NODE ONLY.
 *
 *   node scripts/fetch-images.mjs "<output-dir>"
 *
 * It queries Pexels + Pixabay for a small, fixed set of art-directed search
 * terms and downloads a few landscape candidates per term into <output-dir>
 * (a scratch folder OUTSIDE public/). It does NOT wire anything into the app.
 *
 * IMPORTANT: this file is never imported by the Next.js app, so the API keys
 * (read from .env.local) are never bundled into client-side code. Keys have no
 * NEXT_PUBLIC_ prefix, so Next would not expose them even if it did.
 */
import { readFileSync, mkdirSync, createWriteStream, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { Readable } from 'node:stream'

/* ── load keys from .env.local (no external deps) ── */
function loadEnv() {
  const env = {}
  try {
    const raw = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m) env[m[1]] = m[2].trim()
    }
  } catch {
    console.error('Could not read .env.local — aborting.')
    process.exit(1)
  }
  return env
}

const { PEXELS_API_KEY, PIXABAY_API_KEY } = loadEnv()
if (!PEXELS_API_KEY || !PIXABAY_API_KEY) {
  console.error('Missing PEXELS_API_KEY or PIXABAY_API_KEY in .env.local')
  process.exit(1)
}

const OUT_DIR = process.argv[2] || './.image-candidates'
mkdirSync(OUT_DIR, { recursive: true })

/* ── art-directed search terms (personal, human, calm) ── */
const TERMS = [
  'hand holding phone payment',
  'smartphone tap payment close up',
  'person sending money phone',
  'hands typing phone soft light',
]
const PER_TERM = 3 // candidates per source per term

const slug = (s) => s.replace(/[^a-z0-9]+/gi, '-').toLowerCase()

async function download(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`download ${res.status}`)
  await new Promise((resolve, reject) => {
    const file = createWriteStream(dest)
    Readable.fromWeb(res.body).pipe(file)
    file.on('finish', resolve)
    file.on('error', reject)
  })
}

async function pexels(term) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(term)}&per_page=${PER_TERM}&orientation=landscape`
  const res = await fetch(url, { headers: { Authorization: PEXELS_API_KEY } })
  if (!res.ok) { console.warn(`  pexels ${term}: HTTP ${res.status}`); return [] }
  const data = await res.json()
  return (data.photos || []).map((p, i) => ({
    file: `pexels_${slug(term)}_${i + 1}.jpg`,
    dl: p.src.large2x || p.src.large,
    credit: `Pexels · ${p.photographer} · ${p.url}`,
  }))
}

async function pixabay(term) {
  const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(term)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${Math.max(PER_TERM, 3)}`
  const res = await fetch(url)
  if (!res.ok) { console.warn(`  pixabay ${term}: HTTP ${res.status}`); return [] }
  const data = await res.json()
  return (data.hits || []).slice(0, PER_TERM).map((h, i) => ({
    file: `pixabay_${slug(term)}_${i + 1}.jpg`,
    dl: h.largeImageURL || h.webformatURL,
    credit: `Pixabay · ${h.user} · ${h.pageURL}`,
  }))
}

const manifest = []
for (const term of TERMS) {
  console.log(`\n▶ ${term}`)
  for (const src of [pexels, pixabay]) {
    let cands = []
    try { cands = await src(term) } catch (e) { console.warn(`  ${src.name} error: ${e.message}`) }
    for (const c of cands) {
      try {
        await download(c.dl, join(OUT_DIR, c.file))
        manifest.push({ term, file: c.file, credit: c.credit })
        console.log(`  ✓ ${c.file}`)
      } catch (e) {
        console.warn(`  ✗ ${c.file}: ${e.message}`)
      }
    }
  }
}

writeFileSync(join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2))
console.log(`\nDone. ${manifest.length} candidates in ${OUT_DIR}`)
