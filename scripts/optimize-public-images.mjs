#!/usr/bin/env node
/**
 * Сжатие ассетов в public/: hero (PNG) → WebP и удаление PNG; прочие PNG → пережим.
 * Повторный запуск: hero уже .webp — пропустите или добавьте новые имена в heroPngs.
 * Запуск: node scripts/optimize-public-images.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..', 'public')

const heroPngs = [
  'images/hero-bg.png',
  'images/cta-hero.png',
  'images/about-hero.png',
  'images/blog-hero.png',
  'images/blog-slug-hero.png',
  'images/kontakty-hero.png',
  'images/privacy-hero.png',
  'images/uslugi-hero.png',
  'images/uslugi-slug-hero.png',
]

async function webpHero(relative) {
  const input = path.join(root, relative)
  if (!fs.existsSync(input)) {
    console.warn('skip missing', relative)
    return
  }
  const outRel = relative.replace(/\.png$/i, '.webp')
  const output = path.join(root, outRel)
  const before = fs.statSync(input).size
  await sharp(input)
    .webp({ quality: 80, effort: 6, smartSubsample: true })
    .toFile(output)
  const after = fs.statSync(output).size
  fs.unlinkSync(input)
  console.log(`${relative} → ${outRel}  ${(before / 1024).toFixed(1)}KB → ${(after / 1024).toFixed(1)}KB`)
}

async function crunchPng(relative) {
  const input = path.join(root, relative)
  if (!fs.existsSync(input)) return
  const before = fs.statSync(input).size
  const buf = await sharp(input)
    .png({ compressionLevel: 9, effort: 10, adaptiveFiltering: true })
    .toBuffer()
  if (buf.length < before) {
    fs.writeFileSync(input, buf)
    console.log(`png ${relative}  ${(before / 1024).toFixed(1)}KB → ${(buf.length / 1024).toFixed(1)}KB`)
  } else {
    console.log(`png ${relative}  keep (${(before / 1024).toFixed(1)}KB)`)
  }
}

async function main() {
  for (const rel of heroPngs) {
    await webpHero(rel)
  }

  const otherPngs = [
    'og.png',
    'Icon.png',
    'apple-icon.png',
    'icon-192.png',
    'icon-512.png',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'icon-dark-32x32.png',
    'icon-light-32x32.png',
    'placeholder-logo.png',
  ]

  for (const rel of otherPngs) {
    await crunchPng(rel)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
