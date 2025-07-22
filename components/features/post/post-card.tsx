import { Card, CardTitle, CardDescription, CardHeader, CardContent } from '@/components/ui/card';
import { Post } from '@/types/blog';
import { formatDate } from '@/lib/date';
import Image from 'next/image';

interface Props {
  post: Post;
  isLast: boolean;
}

export default function PostCard({ post, isLast }: Props) {
  return (
    <>
      <Card
        className={`bg-background group animate-in fade-in slide-in-from-bottom-10 rounded-none border-t-0 border-r-0 border-l-0 py-8 shadow-none duration-700 ease-in-out ${!isLast ? 'border-border border-b' : 'border-none'}`}
      >
        <div className="flex w-full gap-8">
          <div className="flex w-full flex-col gap-4">
            <CardHeader className="p-0">
              <CardTitle>{post.title}</CardTitle>
              {post.description && <CardDescription>{post.description}</CardDescription>}
            </CardHeader>
            <CardContent className="mt-[auto] p-0">
              <div className="text-muted-foreground flex items-center gap-x-4 text-sm">
                <div className="flex items-center gap-x-4">
                  {post.createdAt && (
                    <time className="text-muted-foreground text-xs">
                      {formatDate(post.createdAt)}
                    </time>
                  )}
                  <div className="flex items-center gap-x-2">
                    {post.tags?.map((tag) => (
                      <span key={tag} className="text-primary text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
          <div className="h-[100px] w-[150px] shrink-0 overflow-hidden rounded-md">
            <Image
              src={post.coverImage || '/images/default-cover.png'}
              alt={post.title || ''}
              width={150}
              height={100}
              priority={false}
              className="h-[100px] w-[150px] rounded-md object-cover object-center transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
      </Card>
    </>
  );
}
