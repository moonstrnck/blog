'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePostState } from '@/store/use-post-state';

export default function SortSelect() {
  const { sortOrder, setSortOrder } = usePostState();

  const handleSort = (value: 'latest' | 'oldest') => {
    setSortOrder(value);
  };

  return (
    <Select value={sortOrder} defaultValue="latest" onValueChange={handleSort}>
      <SelectTrigger className="dark:bg-background dark:hover:bg-background w-[80px] cursor-pointer border-none p-0 shadow-none focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none">
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
