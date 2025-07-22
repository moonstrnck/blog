import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { formatDate } from '@/lib/date';
import { readingTime } from 'reading-time-estimator';
import type { Post } from '@/types/blog';

interface PostHeaderProps {
  post: Post;
  markdown: string;
}

export default function PostHeader({ post, markdown }: PostHeaderProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="flex gap-2">
          {post.tags?.map((tag) => (
            <Badge variant="secondary" className="rounded-full text-xs font-normal" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {post.authorImage && (
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={post.authorImage}
              alt={post.author}
              className="h-10 w-10 rounded-full object-cover"
            />
          </Avatar>
        )}
        <div>
          <p className="font-medium text-foreground">{post.author}</p>
          <div className="flex items-center gap-2">
            <span>{formatDate(post.createdAt || '')}</span>
            {post.modifiedAt && post.modifiedAt !== post.createdAt && (
              <>
                <span>·</span>
                <span>Updated {formatDate(post.modifiedAt)}</span>
              </>
            )}
            <div className="flex items-center gap-2">
              <span>·</span>
              <span>{readingTime(markdown, 100).text}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}