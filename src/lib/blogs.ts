import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Blog } from "@/types/blog";
import { getReadingTime, slugifyHeading } from "@/lib/blog-utils";

export { getReadingTime, slugifyHeading };

const BLOGS_DIRECTORY = path.join(process.cwd(), "src/content/blogs");

function normalizeString(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (value == null) return "";
  return String(value).trim();
}

function normalizeTags(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map((tag) => normalizeString(tag)).filter(Boolean);
  }
  const single = normalizeString(value);
  return single ? [single] : [];
}

export function parseBlogMarkdown(fileContents: string, slug: string): Blog {
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: normalizeString(data.title) || slug,
    content: typeof content === "string" ? content : String(content ?? ""),
    date: normalizeString(data.date),
    tags: normalizeTags(data.tags),
    image: normalizeString(data.image) || undefined,
  };
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOGS_DIRECTORY)) return [];

  return fs
    .readdirSync(BLOGS_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getBlogBySlug(slug: string): Blog | null {
  const fullPath = path.join(BLOGS_DIRECTORY, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  return parseBlogMarkdown(fileContents, slug);
}

export function getAllBlogs(): Blog[] {
  return getBlogSlugs()
    .map((slug) => getBlogBySlug(slug))
    .filter((blog): blog is Blog => blog !== null)
    .sort((a, b) => {
      const dateA = Date.parse(a.date) || 0;
      const dateB = Date.parse(b.date) || 0;
      return dateB - dateA;
    });
}
