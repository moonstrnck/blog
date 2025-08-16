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
      <div className="flex flex-col gap-4">
        <h1 className="post-header-title text-2xl md:text-4xl">{post.title}</h1>
        <div className="flex gap-2">
          {post.tags?.map((tag) => (
            <Badge variant="secondary" className="rounded-full text-xs font-normal" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="text-muted-foreground flex gap-2 text-sm">
        <div className="flex items-center gap-1">
          {post.authorImage && (
            <Avatar className="h-5 w-5">
              <AvatarImage className="rounded-full" src={post.authorImage} />
            </Avatar>
          )}
          <span>{post.author}</span>
        </div>
        {post.createdAt && (
          <div className="flex items-center gap-2">
            <span>·</span>
            <time className="text-muted-foreground">{formatDate(post.createdAt)}</time>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span>·</span>
          <span>{readingTime(markdown, 100).text}</span>
        </div>
      </div>
    </div>
  );
}
