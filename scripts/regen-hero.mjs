import sharp from 'sharp'
import path from 'node:path'
import fs from 'node:fs/promises'

const root = process.cwd()
const outDir = path.join(root, 'public', 'images')
const src = path.join(
  process.env.USERPROFILE || '',
  '.cursor',
  'projects',
  'c-Users-popoo-Desktop',
  'assets',
  'hero-car-cinematic.png',
)

await fs.access(src)
const buf = await fs.readFile(src)
console.log('source', src, (await sharp(buf).metadata()).width)

for (const width of [768, 1280, 1920]) {
  const base = sharp(buf)
    .resize({ width, height: Math.round((width * 9) / 16), fit: 'cover', position: 'centre' })
    .modulate({ brightness: 0.92, saturation: 0.85 })

  await base.clone().webp({ quality: 76 }).toFile(path.join(outDir, `hero-${width}.webp`))
  await base.clone().avif({ quality: 48 }).toFile(path.join(outDir, `hero-${width}.avif`))
  await base.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(outDir, `hero-${width}.jpg`))
  const st = await fs.stat(path.join(outDir, `hero-${width}.webp`))
  console.log(`hero-${width}.webp`, Math.round(st.size / 1024), 'KB')
}

console.log('hero from cinematic car done')
