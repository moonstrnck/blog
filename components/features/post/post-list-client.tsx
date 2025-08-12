'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import PostCard from './post-card';
import PostPagination from './post-pagination';
import { usePostState } from '@/store/use-post-state';
import type { Post } from '@/types/blog';
import { POST_PER_PAGE } from '@/contants';

interface Props {
  posts: Post[];
}

export default function PostListClient({ posts }: Props) {
  const { selectedTag, sortOrder, currentPage, setCurrentPage } = usePostState();

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts;

    if (selectedTag !== 'all') {
      filtered = posts.filter((post) => post.tags?.includes(selectedTag));
    }

    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();

      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
    });

    return sorted;
  }, [posts, selectedTag, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedPosts.length / POST_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POST_PER_PAGE;
    const endIndex = startIndex + POST_PER_PAGE;
    return filteredAndSortedPosts.slice(startIndex, endIndex);
  }, [filteredAndSortedPosts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="space-y-8">
        {paginatedPosts.map((post, i) => (
          <Link href={`/posts/${post.slug}`} key={post.id}>
            <PostCard post={post} isLast={i === paginatedPosts.length - 1} />
          </Link>
        ))}
      </div>

      <PostPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
