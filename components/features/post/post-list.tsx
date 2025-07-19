import { getAllPublishedPosts } from '@/lib/notion';
import PostListClient from './post-list-client';

export default async function PostList() {
  const posts = await getAllPublishedPosts();

  return <PostListClient posts={posts} />;
}
