import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve('C:\\Users\\popoo\\Desktop\\автосервис комсервис')
const srcDir = path.join(root, '_research', 'photos_raw')
const vkDir = path.join(root, '_research', 'photos_vk')
const outDir = path.join(root, 'public', 'images')

/** Curated VK + restored raw — one stem per section, no stock/AI dupes */
const jobs = [
  // Work areas
  { file: 'photo_02.jpg', name: 'welding', widths: [480, 960, 1440], aspect: null },
  { file: 'photo_07.jpg', name: 'bay-07', widths: [480, 960], aspect: null },
  { file: 'photo_08.jpg', name: 'engine-work', widths: [480, 960, 1440], aspect: null },
  { file: 'photo_15.jpg', name: 'service-diag', widths: [400, 800], aspect: null },
  { file: '../photos_vk/vk_08.jpg', name: 'exhaust-work', widths: [480, 960], aspect: null },
  { file: '../photos_vk/vk_05.jpg', name: 'motorsport-tune', widths: [480, 960], aspect: null },

  // Legalization
  { file: '../photos_vk/vk_04.jpg', name: 'offroad-uaz', widths: [480, 960], aspect: null },

  // Gallery (unique stems)
  { file: 'photo_06.jpg', name: 'shop-cat', widths: [480, 960], aspect: null },
  { file: 'photo_09.jpg', name: 'bay-09', widths: [480, 960], aspect: null },
  { file: 'photo_10.jpg', name: 'bay-10', widths: [480, 960], aspect: null },
  { file: '../photos_vk/vk_02.jpg', name: 'exhaust-under', widths: [480, 960], aspect: null },
  { file: '../photos_vk/vk_07.jpg', name: 'cooling-mod', widths: [480, 960], aspect: null },
  { file: 'photo_03.jpg', name: 'bay-03', widths: [480, 960], aspect: null },
  { file: '../photos_vk/vk_09.jpg', name: 'exhaust-tip', widths: [480, 960], aspect: null },
  { file: '../photos_vk/vk_03.jpg', name: 'project-lada', widths: [480, 960], aspect: null },

  // Logo (if present)
  { file: 'photo_11.jpg', name: 'logo-src', widths: [128, 256], aspect: 1 },
]

await fs.mkdir(outDir, { recursive: true })
console.log('hero: run `npm run regen:hero` (photo_14 mechanic)')

const tone = (p) => p.modulate({ brightness: 1.02, saturation: 1.02 }).sharpen({ sigma: 0.35 })

for (const job of jobs) {
  const input = path.join(srcDir, job.file)
  try {
    await fs.access(input)
  } catch {
    console.warn('missing', job.file)
    continue
  }

  for (const width of job.widths) {
    let pipeline = tone(sharp(input).rotate())
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
