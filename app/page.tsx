import { getTags } from '@/lib/notion';
import PostSection from './_components/post-section';
import TagSection from './_components/tag-section';

interface HomeProps {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { tag, sort } = await searchParams;
  const selectedTag = tag || 'all';
  const selectedSort = sort || 'latest';

  const tags = await getTags();

  return (
    <div className="container py-8">
      <div className="grid grid-cols-[1fr_240px] gap-8">
        <PostSection selectedTag={selectedTag} selectedSort={selectedSort} />
        <aside className="h-full">
          <TagSection tags={tags} selectedTag={selectedTag} />
        </aside>
      </div>
    </div>
  );
}
