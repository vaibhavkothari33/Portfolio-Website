"use client";

import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import Image from "next/image";
import "../../../styles/globals.css";

type Blog = {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
};

const blogs: Blog[] = [
  {
    id: "1",
    title: "Understanding React Hooks",
    content: `
# Understanding React Hooks

React Hooks are a game changer in functional components. They allow you to manage state and lifecycle without writing a class. Here's an overview:

## Why Hooks?
Hooks eliminate the need for class-based components. They simplify state and side effects.

### Common Hooks:
1. \`useState\`: Manage state in a functional component.
2. \`useEffect\`: Handle side effects like API calls.
3. \`useContext\`: Access global context values.
   
\`\`\`jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
      <p>Count: {count}</p>
    </div>
  );
}
\`\`\`

Learn more about [React Hooks](https://reactjs.org/docs/hooks-intro.html).
      `,
    image: "/Fitex.png",
    date: "January 20, 2025",
  },
];

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;

  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return (
      <div className="bg-white text-black dark:bg-neutral-950 dark:text-white py-20">
        <HeroHighlight>
          <div className="text-center text-2xl font-bold">
            <Highlight>Blog Not Found</Highlight>
          </div>
        </HeroHighlight>
      </div>
    );
  }

  return (
    <div className="bg-white text-black dark:bg-neutral-950 dark:text-white py-20 px-4 md:px-20">
      <HeroHighlight>
        <div className="max-w-4xl mx-auto">
          {/* Blog Title */}
          <div className="text-4xl font-bold mb-4 text-center">
            <Highlight>{blog.title}</Highlight>
          </div>
          {/* Blog Image */}
          <div className="w-full h-64 relative mb-6">
            <Image
              src={blog.image}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
          {/* Blog Metadata */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
            Published on <span className="font-semibold">{blog.date}</span>
          </div>
          {/* Blog Content */}
          <div className="prose dark:prose-invert max-w-full">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
          </div>
        </div>
      </HeroHighlight>
    </div>
  );
}
