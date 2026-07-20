import Link from 'next/link';
import { Blog } from '@/types/blog';

const BlogCard: React.FC<Blog> = ({ 
  title, 
  slug, 
  date, 
  tags = [] 
}) => {
  return (
    <div className="bg-elevated p-6 rounded-lg mb-4">
      {/* blue was this component's local accent, not a third-party brand
          colour, so it maps onto the themeable brand role */}
      <Link href={`/blogs/${slug}`} className="hover:text-brand">
        <h2 className="text-2xl font-bold">{title}</h2>
      </Link>
      <div className="text-dim mt-2">
        <span>{date}</span>
        {tags.length > 0 && (
          <div className="flex space-x-2 mt-2">
            {tags.map(tag => (
              <span 
                key={tag} 
                className="bg-brand-soft text-brand px-2 py-1 rounded-full text-xs"
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