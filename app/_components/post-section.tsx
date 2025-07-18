import SortSelect from './client/sort-select';
import PostList from '@/components/features/post/post-list';

interface Props {
  selectedTag: string;
  selectedSort: string;
}

export default function PostSection({ selectedTag, selectedSort }: Props) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          {selectedTag === 'all' ? 'Posts' : `#${selectedTag}`}
        </h2>
        <SortSelect />
      </div>
      <PostList selectedTag={selectedTag} selectedSort={selectedSort} />
    </div>
  );
}
