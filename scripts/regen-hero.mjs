import sharp from 'sharp'
import path from 'node:path'
import fs from 'node:fs/promises'

const root = process.cwd()
const outDir = path.join(root, 'public', 'images')
/** Red Niva with open hood — bright, clear focal point, works on mobile */
const src = path.join(root, '_research', 'photos_raw', 'photo_02.jpg')

await fs.access(src)
const meta = await sharp(src).rotate().metadata()
const w = meta.width ?? 1080
const h = meta.height ?? 1440
console.log('source', path.basename(src), w, 'x', h)

const tone = (pipeline) =>
  pipeline.modulate({ brightness: 1.08, saturation: 1.02 }).linear(1.02, 4)

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

/* Desktop 16:9 — red car hood + engine bay, skip floor clutter */
const targetRatio = 16 / 9
let cw = w
let ch = Math.round(w / targetRatio)
if (ch > h) {
  ch = h
  cw = Math.round(h * targetRatio)
}
const left = Math.max(0, Math.round((w - cw) / 2))
const top = Math.max(0, Math.min(h - ch, Math.round(h * 0.17)))

const desktop = tone(
  sharp(src).rotate().extract({ left, top, width: cw, height: ch }),
)

await writeVariants(desktop, 'hero', [768, 1280, 1920])
console.log('desktop crop', { left, top, cw, ch })

/* Mobile portrait — center on open hood / red front, room for text at bottom */
const mTop = Math.round(h * 0.1)
const mBottom = Math.round(h * 0.8)
const mch = mBottom - mTop
let mcw = Math.round(mch * 0.68)
if (mcw > w) mcw = w
const mLeft = Math.max(0, Math.round((w - mcw) * 0.12))

const mobile = tone(
  sharp(src).rotate().extract({ left: mLeft, top: mTop, width: mcw, height: mch }),
)

await writeVariants(mobile, 'hero-mobile', [480, 768])
console.log('mobile crop', { left: mLeft, top: mTop, cw: mcw, ch: mch })
console.log('hero from photo_02 (red Niva / open hood)')
