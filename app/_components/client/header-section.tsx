'use client';

import SortSelect from './sort-select';
import { usePostState } from '@/store/use-post-state';

export default function HeaderSection() {
  const { selectedTag } = usePostState();

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold tracking-tight">
        {selectedTag === 'all' ? 'Posts' : `#${selectedTag}`}
      </h2>
      <SortSelect />
    </div>
  );
}
