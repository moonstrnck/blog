'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sort = searchParams.get('sort') || 'latest';

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Select value={sort} defaultValue="latest" onValueChange={handleSort}>
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
  );
}
