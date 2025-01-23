import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { marked } from 'marked';
import { Blog } from '@/types/blog';
import "../../../styles/globals.css";

const BlogPost: React.FC<Blog> = ({ 
  title, 
  content, 
  date, 
  tags,
  image,
  slug
}) => {
  // Convert markdown to HTML
  const htmlContent = marked(content);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
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
          <div className="text-neutral-400 mb-4">
            <span>{date}</span>
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
          
          <div 
            className="prose prose-invert"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
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