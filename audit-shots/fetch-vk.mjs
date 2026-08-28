import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, '_research', 'photos_vk')
const rawDir = path.join(root, '_research', 'photos_raw')

await fs.mkdir(outDir, { recursive: true })
await fs.mkdir(rawDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()

const bodies = new Map()

page.on('response', async (res) => {
  const url = res.url()
  const type = res.headers()['content-type'] ?? ''
  if (res.status() !== 200) return
  if (!type.includes('image')) return
  if (!(url.includes('userapi') || url.includes('vkuserphoto') || url.includes('mycdn'))) return
  try {
    const buf = Buffer.from(await res.body())
    if (buf.length < 20000) return
    const key = url.split('?')[0]
    const prev = bodies.get(key)
    if (!prev || buf.length > prev.length) bodies.set(key, buf)
  } catch {
    /* ignore */
  }
})

for (const url of [`https://vk.ru/komservise`, `https://vk.ru/albums-229780192`]) {
  console.log('goto', url)
  await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 })
  await page.waitForTimeout(2000)
  for (let i = 0; i < 15; i++) {
    await page.mouse.wheel(0, 2000)
    await page.waitForTimeout(600)
  }
}

await browser.close()

const sorted = [...bodies.entries()].sort((a, b) => b[1].length - a[1].length)
console.log('captured', sorted.length, 'images')

const manifest = []
let i = 0
for (const [url, buf] of sorted) {
  i += 1
  const name = `vk_${String(i).padStart(2, '0')}.jpg`
  const dest = path.join(outDir, name)
  await fs.writeFile(dest, buf)
  const meta = await sharp(buf).metadata()
  manifest.push({ file: name, bytes: buf.length, width: meta.width, height: meta.height, url })
  console.log('ok', name, meta.width, 'x', meta.height, Math.round(buf.length / 1024), 'KB')
}

await fs.writeFile(path.join(root, '_research', 'vk_fetch', 'manifest.json'), JSON.stringify({ count: manifest.length, photos: manifest }, null, 2))
console.log('done', manifest.length)
