import { BlogPostContent } from "@/components/ui/blog-post-content";
import { getAllBlogs, getBlogBySlug, getReadingTime } from "@/lib/blogs";
import { OG_IMAGE, PERSON_ID, SITE_URL } from "@/app/metadata.config";
import { IconArrowLeft } from "@tabler/icons-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogs().map((blog) => ({ slug: blog.slug }));
}

/**
 * The description previously took a raw 160-char slice, so posts that open
 * with a heading shipped "# Welcome to..." straight into the search snippet.
 * Strip the markdown syntax and cut on a word boundary instead.
 */
function toSummary(markdown: string, limit = 155): string {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, " ") // fenced code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> their text
    .replace(/^\s{0,3}#{1,6}\s+/gm, " ") // ATX headings
    .replace(/[*_`>#|-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= limit) return plain;
  const cut = plain.slice(0, limit);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/** Blog images may be site-relative or fully external; OG needs absolute. */
function toAbsolute(url: string | undefined): string {
  if (!url) return OG_IMAGE;
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return { title: "Post not found" };

  const description = toSummary(blog.content);
  const image = toAbsolute(blog.image);

  return {
    title: `${blog.title} | Vaibhav Kothari`,
    description,
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: {
      type: "article",
      title: blog.title,
      description,
      url: `/blogs/${slug}`,
      publishedTime: blog.date || undefined,
      authors: ["Vaibhav Kothari"],
      tags: blog.tags,
      images: [{ url: image, alt: blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) notFound();

  const url = `${SITE_URL}/blogs/${slug}`;

  /**
   * BlogPosting tied back to the site-wide Person node by @id. Each post that
   * carries the author reference is another page reinforcing the same entity,
   * which is what a common-name query is decided on.
   */
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: blog.title,
        description: toSummary(blog.content),
        image: toAbsolute(blog.image),
        datePublished: blog.date || undefined,
        dateModified: blog.date || undefined,
        keywords: blog.tags,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        inLanguage: "en",
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blogs` },
          { "@type": "ListItem", position: 3, name: blog.title, item: url },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-canvas text-strong">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="mx-auto max-w-3xl border-x border-line">
        <div className="border-b border-line px-4 py-6 md:px-8 md:py-8">
          <Link
            href="/blogs"
            className="mb-6 inline-flex items-center text-sm text-dim transition-colors hover:text-strong"
          >
            <IconArrowLeft className="mr-2 h-4 w-4" stroke={1.75} />
            All posts
          </Link>

          <p className="mb-3 inline-flex items-center gap-2 border border-red-500/40 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-red-500">
            <span aria-hidden>✕</span> Article
          </p>

          <h1 className="text-2xl font-bold leading-tight tracking-tight md:text-3xl lg:text-4xl">
            {blog.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[11px] text-subtle md:text-xs">
            <span>{blog.date}</span>
            <span aria-hidden>·</span>
            <span>{getReadingTime(blog.content)}</span>
            <span aria-hidden>·</span>
            {/* A visible byline is what lets the author markup above be
                corroborated on the page rather than asserted only in JSON-LD. */}
            <span>
              by{" "}
              <Link href="/" className="text-dim transition-colors hover:text-strong">
                Vaibhav Kothari
              </Link>
            </span>
          </div>

          {blog.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full border border-dashed border-line-strong bg-surface/80 px-2 py-0.5 text-[10px] font-medium text-dim"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {blog.image && (
          <div className="relative mx-4 mt-6 h-52 overflow-hidden rounded-xl border border-line bg-well md:mx-8 md:h-72">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <article className="px-4 py-8 md:px-8 md:py-10">
          <BlogPostContent content={blog.content} />
        </article>
      </div>
    </div>
  );
}
