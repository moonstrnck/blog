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
    <div className="h-full">
      <h5 className="text-muted-foreground mb-3 flex h-14 items-center text-sm font-medium"></h5>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            variant="secondary"
            key={tag.id}
            className={cn(
              selectedTag === tag.id && 'bg-primary text-primary-foreground',
              'hover:text-secondary-foreground cursor-pointer rounded-full transition-colors duration-200'
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
