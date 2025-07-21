import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PostState {
  selectedTag: string;
  sortOrder: 'latest' | 'oldest';
  currentPage: number;
  setSelectedTag: (tag: string) => void;
  setSortOrder: (order: 'latest' | 'oldest') => void;
  setCurrentPage: (page: number) => void;
}

export const usePostState = create<PostState>()(
  persist(
    (set) => ({
      selectedTag: 'all',
      sortOrder: 'latest',
      currentPage: 1,
      setSelectedTag: (tag) => set({ selectedTag: tag, currentPage: 1 }),
      setSortOrder: (order) => set({ sortOrder: order }),
      setCurrentPage: (page) => set({ currentPage: page }),
    }),
    {
      name: 'post-state-storage',
    }
  )
);
