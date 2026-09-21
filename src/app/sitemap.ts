import { MetadataRoute } from 'next'
import { SITE_URL } from './metadata.config'
import { getAllBlogs } from "@/lib/blogs";

/**
 * `sample-post` is a template kept in the repo for reference. The blog index
 * filters it out, so listing it here advertised an orphan page with no inbound
 * link — the exact shape Google classifies as thin content.
 */
const EXCLUDED_BLOG_SLUGS = new Set(["sample-post"]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // A fresh `new Date()` on every build told crawlers every URL changed every
  // deploy. Once that proves false, lastmod stops being trusted for the whole
  // site, so static routes now carry a fixed date and posts carry their own.
  const staticLastModified = new Date("2026-09-01").toISOString()

  // Core pages with high priority
  const mainRoutes = [
    {
      url: SITE_URL,
      lastModified: staticLastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: staticLastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Secondary pages. `/contact` was listed here but no such route exists —
  // contact is a section on the home page, so the sitemap was advertising a
  // 404 to crawlers.
  const secondaryRoutes = [
    '/blogs',
    '/experience',
    '/links',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: staticLastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Dynamic blog posts, each stamped with its own publish date.
  const blogRoutes = getAllBlogs()
    .filter((blog) => !EXCLUDED_BLOG_SLUGS.has(blog.slug))
    .map((blog) => ({
      url: `${SITE_URL}/blogs/${blog.slug}`,
      lastModified: blog.date
        ? new Date(blog.date).toISOString()
        : staticLastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  return [...mainRoutes, ...secondaryRoutes, ...blogRoutes]
}
