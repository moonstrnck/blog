import PostCard from '@/components/features/post/post-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { Post } from '@/types/blog';

interface Props {
  posts: Post[];
  selectedTag: string;
}

export default function PostSection({ posts, selectedTag }: Props) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          {selectedTag === 'all' ? 'Posts' : `#${selectedTag}`}
        </h2>
        <Select defaultValue="latest">
          <SelectTrigger className="w-[80px] cursor-pointer border-none p-0 shadow-none focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent
            align="end"
            className="min-w-[100px] border-none bg-[var(--primary-foreground)] shadow-none"
          >
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        {posts.map((post, i) => (
          <Link href={`/post/${post.slug}`} key={post.id}>
            <PostCard post={post} isLast={i === posts.length - 1} />
          </Link>
        ))}
      </div>
    </div>
  );
}
