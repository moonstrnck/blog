import Link from 'next/link';
import PostCard from './post-card';

import { getPublishedPosts } from '@/lib/notion';

interface Props {
  selectedTag: string;
  selectedSort: string;
}

export default async function PostList({ selectedTag, selectedSort }: Props) {
  const { posts } = await getPublishedPosts({ tag: selectedTag, sort: selectedSort });

  return (
    <>
      {posts.map((post, i) => (
        <Link href={`/posts/${post.slug}`} key={post.id}>
          <PostCard post={post} isLast={i === posts.length - 1} />
        </Link>
      ))}
    </>
  );
}
