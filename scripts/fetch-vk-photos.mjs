import fs from 'node:fs/promises'
import path from 'node:path'

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36'
const GROUP_ID = 229780192
const root = path.resolve(process.cwd())
const outDir = path.join(root, '_research', 'photos_vk')
const metaPath = path.join(root, '_research', 'vk_fetch', 'manifest.json')

function decodeJsonString(s) {
  return s.replace(/\\u002F/g, '/').replace(/\\\//g, '/').replace(/\\"/g, '"')
}

function extractPhotoUrls(html) {
  const urls = new Set()

  // sizes arrays with url fields
  for (const m of html.matchAll(/"url":"(https:\\\/\\\/[^"]+)"/g)) {
    const url = decodeJsonString(m[1])
    if (url.includes('userapi') || url.includes('vkuserphoto') || url.includes('mycdn')) urls.add(url)
  }

  // plain escaped urls
  for (const m of html.matchAll(/https:\\\/\\\/sun[^"\\]+/g)) {
    urls.add(decodeJsonString(m[0]))
  }

  return [...urls].filter((u) => /\/(impf|photo|images)\//.test(u) || u.includes('userapi') || u.includes('vkuserphoto'))
}

async function fetchPage(url) {
  const r = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'text/html', 'Accept-Language': 'ru-RU,ru;q=0.9' },
  })
  if (!r.ok) throw new Error(`${url} ${r.status}`)
  return r.text()
}

async function download(url, dest) {
  const r = await fetch(url, { headers: { 'User-Agent': UA, Referer: 'https://vk.ru/' } })
  if (!r.ok) throw new Error(`GET ${r.status}`)
  const buf = Buffer.from(await r.arrayBuffer())
  await fs.writeFile(dest, buf)
  return buf.length
}

await fs.mkdir(outDir, { recursive: true })
await fs.mkdir(path.dirname(metaPath), { recursive: true })

const pages = [
  `https://vk.ru/komservise`,
  `https://vk.ru/wall-${GROUP_ID}`,
  `https://vk.ru/albums-${GROUP_ID}`,
  `https://vk.ru/album-229780192_00`, // wall album sometimes
]

const allUrls = new Set()
for (const page of pages) {
  try {
    const html = await fetchPage(page)
    const found = extractPhotoUrls(html)
    found.forEach((u) => allUrls.add(u.split('&')[0]))
    console.log(page, '→', found.length, 'urls, total', allUrls.size)
  } catch (e) {
    console.warn(page, e.message)
  }
}

// Try wall offsets via vk.ru
for (const offset of [0, 20, 40, 60, 80]) {
  try {
    const html = await fetchPage(`https://vk.ru/wall-${GROUP_ID}?offset=${offset}`)
    const found = extractPhotoUrls(html)
    found.forEach((u) => allUrls.add(u.split('&')[0]))
    console.log('offset', offset, 'total', allUrls.size)
  } catch (e) {
    console.warn('offset', offset, e.message)
  }
}

const list = [...allUrls]
console.log('unique urls:', list.length)

const manifest = []
let n = 0
for (const url of list) {
  n += 1
  const name = `vk_${String(n).padStart(2, '0')}.jpg`
  const dest = path.join(outDir, name)
  try {
    const bytes = await download(url, dest)
    if (bytes < 8000) {
      await fs.unlink(dest)
      console.warn('skip tiny', name, bytes)
      continue
    }
    manifest.push({ file: name, bytes, url })
    console.log('ok', name, Math.round(bytes / 1024), 'KB')
  } catch (e) {
    console.warn('fail', name, e.message)
  }
}

await fs.writeFile(metaPath, JSON.stringify({ group_id: GROUP_ID, count: manifest.length, photos: manifest }, null, 2))
console.log(`saved ${manifest.length} photos`)
