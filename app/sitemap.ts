import type { MetadataRoute } from 'next'
import { getAllBlogSlugs } from '@/lib/blog-data'
import { getAllServiceSlugs } from '@/lib/services-data'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://inpb.pro'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPaths = [
    '',
    '/about',
    '/blog',
    '/uslugi',
    '/kontakty',
    '/privacy',
    '/feedback',
  ]

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${baseUrl}${path || '/'}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/uslugi' || path === '/kontakty' ? 0.9 : 0.7,
  }))

  const serviceEntries: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) => ({
    url: `${baseUrl}/uslugi/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const blogEntries: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticEntries, ...serviceEntries, ...blogEntries]
}
