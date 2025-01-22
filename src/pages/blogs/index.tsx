"use client";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import Image from "next/image";
import Link from "next/link";
import "../../../styles/globals.css";

type Blog = {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
};

const blogs: Blog[] = [
  {
    id: "1",
    title: "Understanding React Hooks",
    description: "A deep dive into React Hooks and how to use them effectively.",
    image: "/Fitex.png",
    date: "January 20, 2025",
  },
  {
    id: "1",
    title: "Understanding React Hooks",
    description: "A deep dive into React Hooks and how to use them effectively.",
    image: "/Fitex.png",
    date: "January 20, 2025",
  },
  {
    id: "1",
    title: "Understanding React Hooks",
    description: "A deep dive into React Hooks and how to use them effectively.",
    image: "/Fitex.png",
    date: "January 20, 2025",
  },
];

export default function BlogsPage() {
  return (
    <HeroHighlight>
      <div className="text-center mt-[-100px] flex flex-col items-center gap-6">
        <div className="text-5xl mb-5 font-bold text-black dark:text-white">
          My <Highlight>Blog</Highlight> Posts
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {blogs.map((blog) => (
            <Link href={`/blogs/${blog.id}`} key={blog.id}>
              <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-4 transition-transform hover:scale-105">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                  width={150}
                  height={150}
                />
                <h2 className="text-xl font-bold mt-4 text-black dark:text-white">
                  {blog.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  {blog.description}
                </p>
                <p className="text-blue-500 dark:text-blue-400 mt-2">
                  {blog.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </HeroHighlight>
  );
}
