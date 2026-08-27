import sharp from 'sharp'
import path from 'node:path'
import fs from 'node:fs/promises'

const root = process.cwd()
const outDir = path.join(root, 'public', 'images')
const src = path.join(root, '_research', 'photos_raw', 'photo_08.jpg')

await fs.access(src)
const meta = await sharp(src).rotate().metadata()
const w = meta.width ?? 768
const h = meta.height ?? 1024
console.log('source', src, w, 'x', h)

/* 16:9 crop biased to car + mechanic work (skip excess ceiling) */
const targetRatio = 16 / 9
let cw = w
let ch = Math.round(w / targetRatio)
if (ch > h) {
  ch = h
  cw = Math.round(h * targetRatio)
}
const left = Math.max(0, Math.round((w - cw) / 2))
const top = Math.max(0, Math.min(h - ch, Math.round(h * 0.42)))

for (const width of [768, 1280, 1920]) {
  const base = sharp(src)
    .rotate()
    .extract({ left, top, width: cw, height: ch })
    .resize({ width, withoutEnlargement: false })
    .modulate({ brightness: 1.06, saturation: 0.92 })
    .linear(1.04, 2)

  await base.clone().webp({ quality: 78 }).toFile(path.join(outDir, `hero-${width}.webp`))
  await base.clone().avif({ quality: 52 }).toFile(path.join(outDir, `hero-${width}.avif`))
  await base.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(outDir, `hero-${width}.jpg`))
  const st = await fs.stat(path.join(outDir, `hero-${width}.webp`))
  console.log(`hero-${width}.webp`, Math.round(st.size / 1024), 'KB')
}

console.log('hero from photo_08 (engine bay / lift work)')
