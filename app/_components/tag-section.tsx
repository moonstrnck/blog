'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tag } from '@/types/blog';
import { usePostFilter } from '@/store/use-post-filter';

interface Props {
  tags: Tag[];
}

export default function TagSection({ tags }: Props) {
  const { selectedTag, setSelectedTag } = usePostFilter();

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
              'hover:text-secondary-foreground rounded-full transition-colors duration-200 cursor-pointer'
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
