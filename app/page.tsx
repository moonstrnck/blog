import PostSection from './_components/post-section';
import TagSection from './_components/tag-section';

export default function Home() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-[1fr_280px] gap-6">
        <PostSection />
        <aside className="h-full">
          <TagSection />
        </aside>
      </div>
    </div>
  );
}
