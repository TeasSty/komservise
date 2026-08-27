/**
 * Hero pipeline: Mark II engine bay → sharp 2× upscale + tone/crop → hero-* variants
 * Source: workshop sedan, open hood (legalization / swap), 440×280 → 880×560
 */
import sharp from 'sharp'
import path from 'node:path'
import fs from 'node:fs/promises'

const root = process.cwd()
const outDir = path.join(root, 'public', 'images')
const enhancedDir = path.join(root, '_research', 'photos_enhanced')
const rawSrc = path.join(root, '_research', 'photos_raw', 'photo_mark2_engine.jpg')
const enhancedSrc = path.join(enhancedDir, 'photo_mark2_engine_enhanced.jpg')

await fs.access(rawSrc)
const rawMeta = await sharp(rawSrc).rotate().metadata()
console.log('raw source', path.basename(rawSrc), `${rawMeta.width}x${rawMeta.height}`)

await fs.mkdir(enhancedDir, { recursive: true })
await sharp(rawSrc)
  .rotate()
  .resize({
    width: (rawMeta.width ?? 440) * 2,
    height: (rawMeta.height ?? 280) * 2,
    kernel: sharp.kernel.lanczos3,
  })
  .median(3)
  .sharpen({ sigma: 0.85, m1: 0.55, m2: 0.35 })
  .jpeg({ quality: 94, mozjpeg: true })
  .toFile(enhancedSrc)

const src = enhancedSrc
const meta = await sharp(src).rotate().metadata()
const w = meta.width ?? 880
const h = meta.height ?? 560
console.log('enhanced source (sharp 2× lanczos3 + median + sharpen)', `${w}x${h}`)

/** Cinematic grade — lifted shadows, clean contrast, no fake flares */
const tone = (pipeline) =>
  pipeline
    .modulate({ brightness: 1.04, saturation: 1.03 })
    .linear(1.06, -6)
    .gamma(1.02)
    .sharpen({ sigma: 0.55, m1: 0.48, m2: 0.32 })

async function writeVariants(pipeline, prefix, widths) {
  for (const width of widths) {
    const base = pipeline.clone().resize({ width, withoutEnlargement: false })
    await base.clone().webp({ quality: 78 }).toFile(path.join(outDir, `${prefix}-${width}.webp`))
    await base.clone().avif({ quality: 52 }).toFile(path.join(outDir, `${prefix}-${width}.avif`))
    await base.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(outDir, `${prefix}-${width}.jpg`))
    const st = await fs.stat(path.join(outDir, `${prefix}-${width}.webp`))
    console.log(`${prefix}-${width}.webp`, Math.round(st.size / 1024), 'KB')
  }
}

/* Desktop 16:9 — front quarter, open hood, engine bay */
const targetRatio = 16 / 9
let cw = w
let ch = Math.round(w / targetRatio)
if (ch > h) {
  ch = h
  cw = Math.round(h * targetRatio)
}
const left = 0
const top = Math.max(0, Math.min(h - ch, Math.round(h * 0.04)))

const desktop = tone(
  sharp(src).rotate().extract({ left, top, width: cw, height: ch }),
)

await writeVariants(desktop, 'hero', [768, 1280, 1920])
console.log('desktop crop', { left, top, cw, ch })

/* Mobile portrait — hood, grille, license plate; room for headline below */
const mLeft = 0
const mTop = Math.round(h * 0.02)
const mBottom = Math.round(h * 0.98)
const mch = mBottom - mTop
let mcw = Math.round(mch * (9 / 16))
if (mcw > w) mcw = w

const mobile = tone(
  sharp(src).rotate().extract({ left: mLeft, top: mTop, width: mcw, height: mch }),
)

await writeVariants(mobile, 'hero-mobile', [480, 768])
console.log('mobile crop', { left: mLeft, top: mTop, cw: mcw, ch: mch })
console.log('hero from photo_mark2_engine (open hood / legalization, sharp 2×)')
