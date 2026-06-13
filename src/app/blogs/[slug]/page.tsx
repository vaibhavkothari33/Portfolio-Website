import { BlogPostContent } from "@/components/ui/blog-post-content";
import { getAllBlogs, getBlogBySlug, getReadingTime } from "@/lib/blogs";
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return { title: "Post not found" };

  return {
    title: `${blog.title} | Vaibhav Kothari`,
    description: blog.content.slice(0, 160).replace(/\s+/g, " ").trim(),
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) notFound();

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-3xl border-x border-neutral-800">
        <div className="border-b border-neutral-800 px-4 py-6 md:px-8 md:py-8">
          <Link
            href="/blogs"
            className="mb-6 inline-flex items-center text-sm text-neutral-400 transition-colors hover:text-white"
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

          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[11px] text-neutral-500 md:text-xs">
            <span>{blog.date}</span>
            <span aria-hidden>·</span>
            <span>{getReadingTime(blog.content)}</span>
          </div>

          {blog.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full border border-dashed border-neutral-700 bg-neutral-900/80 px-2 py-0.5 text-[10px] font-medium text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {blog.image && (
          <div className="relative mx-4 mt-6 h-52 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/60 md:mx-8 md:h-72">
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
