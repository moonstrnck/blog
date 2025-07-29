import { Separator } from '@/components/ui/separator';
import { getPostBySlug, getPrevNextPosts, getAllPublishedPosts } from '@/lib/notion';
import CommentsByGiscus from '@/components/features/post/giscus';
import PostHeader from './_components/post-header';
import PostContents from './_components/post-contents';
import PostNav from './_components/post-nav';
import { OnThisPage, OnThisPageMobile } from './_components/table-of-contents-link';

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_240px] md:gap-8">
        <section>
          <PostHeader post={post} markdown={markdown} />
          <Separator className="mt-6 mb-6 md:mb-12" />
          <OnThisPageMobile markdown={markdown} />
          <PostContents markdown={markdown} />
          <Separator className="my-12" />
          <PostNav prevPost={prevPost} nextPost={nextPost} />
          <CommentsByGiscus />
        </section>
        <aside className="relative hidden h-full md:block">
          <OnThisPage markdown={markdown} />
        </aside>
      </div>
    </article>
  );
}
