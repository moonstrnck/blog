import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Post } from '@/types/blog';

interface PostNavProps {
  prevPost: Post | null;
  nextPost: Post | null;
}

export default function PostNav({ prevPost, nextPost }: PostNavProps) {
  return (
    <nav className="grid grid-cols-2 gap-8">
      {prevPost ? (
        <Link href={`/posts/${prevPost.slug}`}>
          <Card className="group hover:bg-muted/50 shadow-none transition-colors">
            <CardHeader className="space-y-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <ChevronLeft className="h-4 w-4" />
                <span className="line-clamp-1">{prevPost.title}</span>
              </CardTitle>
              <CardDescription className="line-clamp-2 text-xs">
                {prevPost.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ) : (
        <div />
      )}
      {nextPost ? (
        <Link href={`/posts/${nextPost.slug}`}>
          <Card className="group hover:bg-muted/50 shadow-none transition-colors">
            <CardHeader className="space-y-2">
              <CardTitle className="flex items-center justify-end gap-2 text-sm font-medium text-right">
                <span className="line-clamp-1">{nextPost.title}</span>
                <ChevronRight className="h-4 w-4" />
              </CardTitle>
              <CardDescription className="line-clamp-2 text-xs text-right">
                {nextPost.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}