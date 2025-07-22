import { Separator } from '@/components/ui/separator';
import { getPostBySlug, getPrevNextPosts, getAllPublishedPosts } from '@/lib/notion';
import CommentsByGiscus from '@/components/features/post/giscus';
import PostHeader from './_components/post-header';
import PostContents from './_components/post-contents';
import PostNav from './_components/post-nav';
import OnThisPage from './_components/table-of-contents-link';

export async function generateStaticParams() {
  const posts = await getAllPublishedPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const { markdown, post } = await getPostBySlug(slug);
  const { prevPost, nextPost } = await getPrevNextPosts(slug);

  return (
    <article className="container py-12">
      <div className="grid grid-cols-[1fr_240px] gap-8">
        <section>
          <PostHeader post={post} markdown={markdown} />
          <Separator className="mt-6 mb-12" />
          <PostContents markdown={markdown} />
          <Separator className="my-12" />
          <PostNav prevPost={prevPost} nextPost={nextPost} />
          <CommentsByGiscus />
        </section>
        <aside className="relative h-full">
          <OnThisPage markdown={markdown} />
        </aside>
      </div>
    </article>
  );
}
