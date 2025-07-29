'use client';

import SortSelect from './sort-select';
import { usePostState } from '@/store/use-post-state';

export default function HeaderSection() {
  const { selectedTag } = usePostState();

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
        {selectedTag === 'all' ? 'Posts' : `#${selectedTag}`}
      </h2>
      <SortSelect />
    </div>
  );
}
