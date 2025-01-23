import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Blog } from '@/types/blog';
import "../../../styles/globals.css";

interface BlogsPageProps {
  blogs: Blog[];
}

const BlogsPage: React.FC<BlogsPageProps> = ({ blogs = [] }) => {
  if (blogs.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <p>No blogs found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          My Tech Blog
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map(blog => (
            <Link 
              href={`/blogs/${blog.slug}`} 
              key={blog.slug} 
              className="bg-neutral-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
            >
              {blog.image && (
                <div className="h-48 w-full relative">
                  <Image 
                    src={blog.image} 
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                <div className="text-neutral-400">
                  <span>{blog.date}</span>
                  <div className="flex space-x-2 mt-2">
                    {blog.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="bg-blue-900 text-blue-300 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const blogsDirectory = path.join(process.cwd(), 'src/content/blogs');
    const fileNames = fs.readdirSync(blogsDirectory);

    const blogs = fileNames.map(fileName => {
      const slug = fileName.replace('.md', '');
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      const { data, content } = matter(fileContents);

      return {
        slug,  // Use the filename as the slug consistently
        title: data.title || '',
        content: content || '',
        date: data.date || '',
        tags: data.tags || [],
        image: data.image || '',
      } as Blog;
    });

    return {
      props: {
        blogs
      }
    };
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return {
      props: {
        blogs: []
      }
    };
  }
};

export default BlogsPage;