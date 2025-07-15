import { getPublishedPosts, getTags } from '@/lib/notion';
import PostSection from './_components/post-section';
import TagSection from './_components/tag-section';

interface HomeProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { tag } = await searchParams;
  const selectedTag = tag || 'all';
  const [posts, tags] = await Promise.all([getPublishedPosts(selectedTag), getTags()]);
  return (
    <div className="container py-8">
      <div className="grid grid-cols-[1fr_240px] gap-8">
        <PostSection posts={posts} selectedTag={selectedTag} />
        <aside className="h-full">
          <TagSection tags={tags} selectedTag={selectedTag} />
        </aside>
      </div>
    </div>
  );
}
