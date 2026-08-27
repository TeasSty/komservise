import sharp from 'sharp'
import path from 'node:path'
import fs from 'node:fs/promises'

const outDir = path.join(process.cwd(), 'public', 'images')

const jobs = [
  { name: 'welding', widths: [480, 960] },
  { name: 'engine-work', widths: [480, 960] },
  { name: 'bay-07', widths: [480, 960] },
  { name: 'bay-09', widths: [480, 960] },
  { name: 'bay-10', widths: [480, 960] },
  { name: 'shop-cat', widths: [480, 960] },
  { name: 'service-oil', widths: [400, 800] },
  { name: 'service-diag', widths: [400, 800] },
  { name: 'service-chassis', widths: [400, 800] },
  { name: 'service-ac', widths: [400, 800] },
]

for (const job of jobs) {
  for (const width of job.widths) {
    const jpgPath = path.join(outDir, `${job.name}-${width}.jpg`)
    try {
      await fs.access(jpgPath)
    } catch {
      continue
    }
    const buf = await fs.readFile(jpgPath)
    const base = sharp(buf).resize({ width, withoutEnlargement: true })
    await base.clone().webp({ quality: 68 }).toFile(path.join(outDir, `${job.name}-${width}.webp`))
    await base.clone().avif({ quality: 42 }).toFile(path.join(outDir, `${job.name}-${width}.avif`))
    await base.clone().jpeg({ quality: 72, mozjpeg: true }).toFile(jpgPath)
    const webp = await fs.stat(path.join(outDir, `${job.name}-${width}.webp`))
    console.log(`${job.name}-${width}.webp`, Math.round(webp.size / 1024), 'KB')
  }
}

console.log('lightbox assets recompressed')
