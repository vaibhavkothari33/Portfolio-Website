import { MetadataRoute } from 'next'
import { siteMetadata } from './metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/projects',
    '/blogs',
    '/contact',
  ].map((route) => ({
    url: `${siteMetadata.siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Add blog posts routes here if you have them
  // const posts = await getBlogPosts()
  // const blogRoutes = posts.map((post) => ({
  //   url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
  //   lastModified: post.date,
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))

  return [...routes]
} 