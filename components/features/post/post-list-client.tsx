'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import PostCard from './post-card';
import { usePostFilter } from '@/store/use-post-filter';
import type { Post } from '@/types/blog';

interface Props {
  posts: Post[];
}

export default function PostListClient({ posts }: Props) {
  const { selectedTag, sortOrder } = usePostFilter();

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

  return (
    <>
      {filteredAndSortedPosts.map((post, i) => (
        <Link href={`/posts/${post.slug}`} key={post.id}>
          <PostCard post={post} isLast={i === filteredAndSortedPosts.length - 1} />
        </Link>
      ))}
    </>
  );
}
