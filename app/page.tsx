import { getAllTags } from '@/lib/notion';
import PostSection from './_components/post-section';
import TagSection from './_components/tag-section';

export default async function Home() {
  const tags = await getAllTags();

  return (
    <div className="container py-18">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_240px]">
        <PostSection />
        <aside className="relative h-full">
          <TagSection tags={tags} />
        </aside>
      </div>
    </div>
  );
}
