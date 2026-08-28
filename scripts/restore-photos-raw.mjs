/**
 * Restore _research/photos_raw from dist (highest-res) + fresh VK captures.
 */
import fs from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve('C:\\Users\\popoo\\Desktop\\автосервис комсервис')
const dist = path.join(root, 'dist', 'images')
const raw = path.join(root, '_research', 'photos_raw')

const fromDist = [
  ['photo_02.jpg', 'welding-1440.jpg'],
  ['photo_03.jpg', 'bay-03-960.jpg'],
  ['photo_06.jpg', 'shop-cat-960.jpg'],
  ['photo_07.jpg', 'bay-07-960.jpg'],
  ['photo_08.jpg', 'engine-work-1440.jpg'],
  ['photo_09.jpg', 'bay-09-960.jpg'],
  ['photo_10.jpg', 'bay-10-960.jpg'],
  ['photo_14.jpg', 'service-chassis-800.jpg'],
  ['photo_15.jpg', 'service-diag-800.jpg'],
]

await fs.mkdir(raw, { recursive: true })

for (const [dest, src] of fromDist) {
  await fs.copyFile(path.join(dist, src), path.join(raw, dest))
  console.log('dist →', dest)
}
