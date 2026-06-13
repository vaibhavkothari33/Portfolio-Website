import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Blog } from "@/types/blog";
import { getReadingTime } from "@/lib/blog-utils";

export function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 transition-colors hover:border-neutral-700"
    >
      <div className="relative h-40 w-full overflow-hidden border-b border-neutral-800 bg-neutral-950/60 md:h-44">
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-xs text-neutral-600">
            No cover image
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-500">
            Article
          </p>
          <span className="text-[11px] tabular-nums text-neutral-600">
            {String(index + 1).padStart(3, "0")}
          </span>
        </div>

        <h2 className="mb-2 text-base font-semibold leading-snug text-white transition-colors group-hover:text-neutral-200 md:text-lg">
          {blog.title}
        </h2>

        <div className="mb-3 flex items-center gap-2 font-mono text-[10px] text-neutral-500 md:text-[11px]">
          <span>{blog.date}</span>
          <span aria-hidden>·</span>
          <span>{getReadingTime(blog.content)}</span>
        </div>

        {blog.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5">
            {blog.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="inline-flex rounded-full border border-dashed border-neutral-700 bg-neutral-900/80 px-2 py-0.5 text-[10px] font-medium text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-neutral-400 transition-colors group-hover:text-white">
          Read post
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
