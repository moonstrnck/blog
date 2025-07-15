import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TagFilterItem } from '@/types/blog';
import Link from 'next/link';

interface Props {
  tags: TagFilterItem[];
  selectedTag: string;
}

export default function TagSection({ tags, selectedTag }: Props) {
  return (
    <div className="h-full">
      <h5 className="text-muted-foreground mb-3 flex h-14 items-center text-sm font-medium"></h5>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            asChild
            variant="secondary"
            key={tag.id}
            className={cn(
              selectedTag === tag.id && 'bg-primary text-primary-foreground',
              'hover:text-secondary-foreground rounded-full transition-colors duration-200'
            )}
          >
            <Link href={`/?tag=${tag.id}`}>{tag.name}</Link>
          </Badge>
        ))}
      </div>
    </div>
  );
}
