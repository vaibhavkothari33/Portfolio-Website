import Link from 'next/link';
import { Blog } from '@/types/blog';

const BlogCard: React.FC<Blog> = ({ 
  title, 
  slug, 
  date, 
  tags = [] 
}) => {
  return (
    <div className="bg-neutral-800 p-6 rounded-lg mb-4">
      <Link href={`/blogs/${slug}`} className="hover:text-blue-400">
        <h2 className="text-2xl font-bold">{title}</h2>
      </Link>
      <div className="text-neutral-400 mt-2">
        <span>{date}</span>
        {tags.length > 0 && (
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
    </div>
  );
};

export default BlogCard;