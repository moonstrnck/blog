import HeaderSection from './client/header-section';
import PostList from '@/components/features/post/post-list';

export default function PostSection() {
  return (
    <div className="space-y-8">
      <HeaderSection />
      <PostList />
    </div>
  );
}
