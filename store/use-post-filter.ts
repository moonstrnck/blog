import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PostFilterState {
  selectedTag: string;
  sortOrder: 'latest' | 'oldest';
  setSelectedTag: (tag: string) => void;
  setSortOrder: (order: 'latest' | 'oldest') => void;
}

export const usePostFilter = create<PostFilterState>()(
  persist(
    (set) => ({
      selectedTag: 'all',
      sortOrder: 'latest',
      setSelectedTag: (tag) => set({ selectedTag: tag }),
      setSortOrder: (order) => set({ sortOrder: order }),
    }),
    {
      name: 'post-filter-storage',
    }
  )
);