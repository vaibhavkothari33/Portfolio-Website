import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Blog } from '@/types/blog';
import { CodeBlock } from '@/components/ui/CodeBlock';
import "../../../styles/globals.css";

const BlogPost: React.FC<Blog> = ({ 
  title, 
  content, 
  date, 
  tags,
  image,
  slug
}) => {
  const getReadingTime = (text: string) => {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
  };

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

  type TocItem = { id: string; text: string; level: number };
  const toc: TocItem[] = (content.match(/^#{2,3}\s.+$/gm) || []).map((line) => {
    const level = line.startsWith('###') ? 3 : 2;
    const textVal = line.replace(/^#{2,3}\s/, '').trim();
    return { id: slugify(textVal), text: textVal, level };
  });

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/blogs" 
          className="text-blue-400 hover:text-blue-500 mb-4 inline-block"
        >
          ← Back to Blogs
        </Link>
        
        <article>
          {/* Debug: Display slug */}
          <div className="text-xs text-gray-500 mb-4">
            Slug: {slug}
          </div>

          {/* Add image if available */}
          {image && (
            <div className="mb-8 w-full h-96 relative">
              <Image 
                src={image} 
                alt={title}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          )}

          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <div className="text-neutral-400 mb-6">
            <span>{date}</span>
            <span className="mx-2">·</span>
            <span>{getReadingTime(content)}</span>
            {tags && tags.length > 0 && (
              <div className="flex space-x-2 mt-2">
                {tags.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-blue-900 text-blue-300 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          {toc.length > 0 && (
            <div className="mb-8 rounded-lg border border-neutral-800 bg-neutral-900/60 p-4">
              <div className="text-sm font-semibold text-neutral-300 mb-2">On this page</div>
              <ul className="space-y-1 text-sm text-neutral-400">
                {toc.map((item) => (
                  <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
                    <a href={`#${item.id}`} className="hover:text-neutral-200">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2({ children }) {
                  const textStr = String(children);
                  const id = slugify(textStr);
                  return (
                    <h2 id={id} className="group scroll-mt-24">
                      <a href={`#${id}`} className="no-underline">
                        {children}
                      </a>
                    </h2>
                  );
                },
                h3({ children }) {
                  const textStr = String(children);
                  const id = slugify(textStr);
                  return (
                    <h3 id={id} className="group scroll-mt-24">
                      <a href={`#${id}`} className="no-underline">
                        {children}
                      </a>
                    </h3>
                  );
                },
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                  return (
                    <CodeBlock language={match ? match[1] : 'plaintext'}>
                      {String(children)}
                    </CodeBlock>
                  );
                },
                img({src, alt, title}) {
                  if (!src) return null;
                  return (
                    <figure className="my-6">
                      <Image
                        src={src}
                        alt={alt || ''}
                        width={1200}
                        height={630}
                        className="rounded-lg object-cover"
                      />
                      {title && (
                        <figcaption className="mt-2 text-center text-sm text-neutral-400">
                          {title}
                        </figcaption>
                      )}
                    </figure>
                  );
                },
                table({ children }) {
                  return (
                    <div className="my-6 overflow-x-auto">
                      <table className="w-full">{children}</table>
                    </div>
                  );
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="border-l-4 border-neutral-700 pl-4 italic text-neutral-300">
                      {children}
                    </blockquote>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogsDirectory = path.join(process.cwd(), 'src/content/blogs');
  const fileNames = fs.readdirSync(blogsDirectory);

  const paths = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => ({
      params: {
        slug: fileName.replace('.md', '')
      }
    }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }

  try {
    const blogsDirectory = path.join(process.cwd(), 'src/content/blogs');
    const fullPath = path.join(blogsDirectory, `${params.slug}.md`);
    
    // Add a check to verify file exists
    if (!fs.existsSync(fullPath)) {
      console.error(`File not found: ${fullPath}`);
      return {
        notFound: true,
      };
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    return {
      props: {
        slug: params.slug,
        title: data.title || '',
        content: content || '',
        date: data.date || '',
        tags: data.tags || [],
        image: data.image || '',
      }
    };
  } catch (error) {
    console.error('Error loading blog post:', error);
    return {
      notFound: true,
    };
  }
};

export default BlogPost;