import HeaderSection from './client/header-section';
import PostList from '@/components/features/post/post-list';

export default function PostSection() {
  return (
    <div className="order-2 space-y-2 md:order-none md:space-y-8">
      <HeaderSection />
      <PostList />
    </div>
  );
}
