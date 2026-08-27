import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve('C:\\Users\\popoo\\Desktop\\автосервис комсервис')
const srcDir = path.join(root, '_research', 'photos_raw')
const outDir = path.join(root, 'public', 'images')

const jobs = [
  { file: 'photo_01.jpg', name: 'facade', widths: [640, 1280, 1920], aspect: null },
  { file: 'photo_02.jpg', name: 'welding', widths: [480, 960, 1440], aspect: null },
  { file: 'photo_03.jpg', name: 'bay-03', widths: [480, 960], aspect: null },
  { file: 'photo_04.jpg', name: 'bay-04', widths: [480, 960], aspect: null },
  { file: 'photo_05.jpg', name: 'bay-05', widths: [480, 960], aspect: null },
  { file: 'photo_06.jpg', name: 'shop-cat', widths: [480, 960], aspect: null },
  { file: 'photo_07.jpg', name: 'bay-07', widths: [480, 960], aspect: null },
  { file: 'photo_08.jpg', name: 'engine-work', widths: [480, 960, 1440], aspect: null },
  { file: 'photo_09.jpg', name: 'bay-09', widths: [480, 960], aspect: null },
  { file: 'photo_10.jpg', name: 'bay-10', widths: [480, 960], aspect: null },
  { file: 'photo_11.jpg', name: 'logo-src', widths: [128, 256], aspect: 1 },
  { file: 'photo_12.jpg', name: 'service-ac', widths: [400, 800], aspect: null },
  { file: 'photo_13.jpg', name: 'service-oil', widths: [400, 800], aspect: null },
  { file: 'photo_14.jpg', name: 'service-chassis', widths: [400, 800], aspect: null },
  { file: 'photo_15.jpg', name: 'service-diag', widths: [400, 800], aspect: null },
]

await fs.mkdir(outDir, { recursive: true })

/** Hero: red Niva with open hood (photo_02) — bright, clear mobile crop */
{
  const input = path.join(srcDir, 'photo_02.jpg')
  const meta = await sharp(input).rotate().metadata()
  const w = meta.width ?? 1080
  const h = meta.height ?? 1440
  const targetRatio = 16 / 9
  let cw = w
  let ch = Math.round(w / targetRatio)
  if (ch > h) {
    ch = h
    cw = Math.round(h * targetRatio)
  }
  const left = Math.max(0, Math.round((w - cw) / 2))
  const top = Math.max(0, Math.min(h - ch, Math.round(h * 0.17)))

  for (const width of [768, 1280, 1920]) {
    const base = sharp(input)
      .rotate()
      .extract({ left, top, width: cw, height: ch })
      .modulate({ brightness: 1.08, saturation: 1.02 })
      .linear(1.02, 4)
      .resize({ width, withoutEnlargement: false })
    await base.clone().webp({ quality: 78 }).toFile(path.join(outDir, `hero-${width}.webp`))
    await base.clone().avif({ quality: 55 }).toFile(path.join(outDir, `hero-${width}.avif`))
    await base.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(outDir, `hero-${width}.jpg`))
  }
  console.log('hero done (photo_02 red Niva / open hood)')
}

for (const job of jobs) {
  const input = path.join(srcDir, job.file)
  try {
    await fs.access(input)
  } catch {
    console.warn('missing', job.file)
    continue
  }

  for (const width of job.widths) {
    let pipeline = sharp(input).rotate()
    if (job.aspect === 1) {
      pipeline = pipeline.resize(width, width, { fit: 'cover' })
    } else {
      pipeline = pipeline.resize({ width, withoutEnlargement: true })
    }
    const stem = `${job.name}-${width}`
    await pipeline.clone().webp({ quality: 80 }).toFile(path.join(outDir, `${stem}.webp`))
    await pipeline.clone().avif({ quality: 55 }).toFile(path.join(outDir, `${stem}.avif`))
    await pipeline.clone().jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(outDir, `${stem}.jpg`))
  }
  console.log('ok', job.name)
}

console.log('All images optimized → public/images')
