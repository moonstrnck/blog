import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const Tags = ['All', 'HTML', 'CSS', 'JavaScript', 'React', 'Next.js'];

export default function TagSection() {
  return (
    <div className="h-full">
      <h5 className="text-muted-foreground mb-3 flex h-14 items-center text-sm font-medium"></h5>
      <div className="flex flex-wrap gap-2">
        {Tags.map((tag) => (
          <Badge asChild variant="secondary" key={tag}>
            <Link href={`/?tag=${tag}`}>{tag}</Link>
          </Badge>
        ))}
      </div>
    </div>
  );
}
