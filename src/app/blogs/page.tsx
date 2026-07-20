import { BlogCard } from "@/components/ui/blog-card";
import { getAllBlogs } from "@/lib/blogs";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Vaibhav Kothari",
  description: "Technical writing on web development, backend, React, and hackathons.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "Blog | Vaibhav Kothari",
    description: "Technical writing on web development, backend, React, and hackathons.",
    url: "/blogs",
  },
};

export default function BlogsPage() {
  const blogs = getAllBlogs().filter((blog) => blog.slug !== "sample-post");

  return (
    <div className="min-h-screen bg-canvas text-strong">
      <div className="mx-auto max-w-5xl border-x border-line">
        <div className="border-b border-line px-4 py-8 md:px-8 md:py-10">
          <Link
            href="/"
            className="mb-8 inline-flex items-center text-sm text-dim transition-colors hover:text-strong"
          >
            <IconArrowLeft className="mr-2 h-4 w-4" stroke={1.75} />
            Back to Home
          </Link>

          <p className="mb-3 inline-flex items-center gap-2 border border-brand/40 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-brand md:px-3 md:py-1 md:text-[11px]">
            <span aria-hidden>✕</span> Writing
          </p>
          <h1 className="text-2xl font-bold leading-tight tracking-tight md:text-3xl">
            Blog
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-dim">
            Notes from hackathons, deep dives into tools I use, and lessons learned
            while building products.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 md:gap-6 md:p-8">
          {blogs.length === 0 ? (
            <p className="col-span-full py-12 text-center text-subtle">
              No posts yet — check back soon.
            </p>
          ) : (
            blogs.map((blog, index) => (
              <BlogCard key={blog.slug} blog={blog} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
