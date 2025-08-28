import { MetadataRoute } from 'next'
import { siteMetadata } from './metadata'
import fs from 'fs'
import path from 'path'

async function getBlogSlugs() {
  const blogsDirectory = path.join(process.cwd(), 'src/content/blogs')
  const filenames = fs.readdirSync(blogsDirectory)
  return filenames.map(filename => filename.replace(/\.md$/, ''))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Core pages with high priority
  const mainRoutes = [
    {
      url: siteMetadata.siteUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${siteMetadata.siteUrl}/projects`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Secondary pages
  const secondaryRoutes = [
    '/blogs',
    '/contact',
  ].map((route) => ({
    url: `${siteMetadata.siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Dynamic blog posts
  const blogSlugs = await getBlogSlugs()
  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${siteMetadata.siteUrl}/blogs/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...mainRoutes, ...secondaryRoutes, ...blogRoutes]
}