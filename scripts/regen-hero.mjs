import sharp from 'sharp'
import path from 'node:path'
import fs from 'node:fs/promises'

const root = process.cwd()
const outDir = path.join(root, 'public', 'images')
const vkDir = path.join(root, '_research', 'photos_vk')

// Black car on lift — strong workshop presence; crop toward body/headlight
const src = path.join(vkDir, 'vk_31.jpg')
await fs.access(src)

const buf = await fs.readFile(src)
const meta = await sharp(buf).metadata()
const w = meta.width ?? 1080
const h = meta.height ?? 1440
const targetRatio = 16 / 9

let cw = w
let ch = Math.round(w / targetRatio)
if (ch > h) {
  ch = h
  cw = Math.round(h * targetRatio)
}

// Bias to upper car body / headlight area
const left = Math.max(0, Math.round((w - cw) / 2))
const top = Math.max(0, Math.min(h - ch, Math.round(h * 0.08)))

console.log('source', src, { w, h, left, top, cw, ch })

for (const width of [768, 1280, 1920]) {
  const base = sharp(buf)
    .extract({ left, top, width: cw, height: ch })
    .resize({ width, withoutEnlargement: false })
    .modulate({ brightness: 0.76, saturation: 0.7 })
    .linear(1.12, -16)

  await base.clone().webp({ quality: 78 }).toFile(path.join(outDir, `hero-${width}.webp`))
  await base.clone().avif({ quality: 52 }).toFile(path.join(outDir, `hero-${width}.avif`))
  await base.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(outDir, `hero-${width}.jpg`))
}

console.log('hero cinematic grade done from vk_31')
