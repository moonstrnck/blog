'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tag } from '@/types/blog';
import { usePostState } from '@/store/use-post-state';

interface Props {
  tags: Tag[];
}

export default function TagSection({ tags }: Props) {
  const { selectedTag, setSelectedTag } = usePostState();

  return (
    <div className="sticky top-[var(--sticky-top)] order-1 my-3 md:order-none md:my-0">
      <h5 className="text-muted-foreground mb-3 hidden h-14 items-center text-sm font-medium md:block"></h5>
      <div className="flex flex-wrap justify-center gap-2 md:justify-start">
        {tags.map((tag) => (
          <Badge
            variant="secondary"
            key={tag.id}
            className={cn(
              selectedTag === tag.id &&
                'bg-[var(--point-background)] text-[var(--point-foreground)] dark:bg-[var(--point-background)] dark:text-[var(--point-foreground)]',
              'cursor-pointer rounded-full transition-all duration-300 hover:bg-[var(--point-background)] hover:text-[var(--point-foreground)]'
            )}
            onClick={() => setSelectedTag(tag.id)}
          >
            {tag.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
