import { getAllPublishedPosts } from '@/lib/notion';
import PostListClient from './post-list-client';

export default async function PostList() {
  const posts = await getAllPublishedPosts();

  if (posts.length === 0) {
    return <NoPosts />;
  }

  return <PostListClient posts={posts} />;
}

const NoPosts = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 text-6xl">🧐</div>
      <h3 className="mb-2 text-xl font-semibold">아직 게시글이 없어요</h3>
    </div>
  );
};
