import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { getPostBySlug, getPrevNextPosts, getAllPublishedPosts } from '@/lib/notion';
import { formatDate } from '@/lib/date';
import { MDXRemote, MDXRemoteOptions } from 'next-mdx-remote-client/rsc';
import { compile } from '@mdx-js/mdx';
import { plugins, tocPlugins } from '@/lib/mdx';
import { readingTime } from 'reading-time-estimator';
import { components } from '@/components/mdx';
import TableOfContentsLink from './_components/table-of-contents-link';
import { TocEntry } from '@/types/blog';

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

  const { data } = await compile(markdown, {
    rehypePlugins: [...tocPlugins],
  });

  const options: MDXRemoteOptions = {
    disableImports: true, // import statements in MDX don't work in pages router
    parseFrontmatter: true,
    scope: {
      readingTime: readingTime(markdown, 100).text,
      props: { foo: 'props in scope is working' },
    },
    vfileDataIntoScope: 'toc', // the "remark-flexible-toc" plugin produces vfile.data.toc
    mdxOptions: {
      // format,
      ...plugins,
      // remarkRehypeOptions: format === 'md' ? remarkRehypeOptions : undefined,
    },
  };

  return (
    <article className="container py-12">
      <div className="grid grid-cols-[1fr_240px] gap-8">
        <section>
          {/* 블로그 헤더 */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">{post.title}</h1>
              <div className="flex gap-2">
                {post.tags?.map((tag) => (
                  <Badge variant="secondary" className="rounded-full text-xs font-normal" key={tag}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="text-muted-foreground flex gap-2 text-sm">
              <div className="flex items-center gap-1">
                {post.authorImage && (
                  <Avatar className="h-4 w-4">
                    <AvatarImage className="rounded-full" src={post.authorImage} />
                  </Avatar>
                )}
                <span>{post.author}</span>
              </div>
              {post.createdAt && (
                <div className="flex items-center gap-2">
                  <span>·</span>
                  <time className="text-muted-foreground">{formatDate(post.createdAt)}</time>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span>·</span>
                <span>{readingTime(markdown, 100).text}</span>
              </div>
            </div>
          </div>
          <Separator className="mt-6 mb-12" />
          {/* 블로그 본문 */}
          <div className="prose prose-slate prose-sm dark:prose-invert prose-headings:scroll-mt-[var(--header-height)] max-w-none">
            <MDXRemote source={markdown} options={options} components={components} />
          </div>
          <Separator className="my-12" />
          {/* 이전/다음 포스트 네비게이션 */}
          <nav className="grid grid-cols-2 gap-8">
            {prevPost ? (
              <Link href={`/posts/${prevPost.slug}`}>
                <Card className="group hover:bg-muted/50 shadow-none transition-colors">
                  <CardHeader className="space-y-2">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="line-clamp-1">{prevPost.title}</span>
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {prevPost.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link href={`/posts/${nextPost.slug}`} className="text-right">
                <Card className="group hover:bg-muted/50 shadow-none transition-colors">
                  <CardHeader className="space-y-2">
                    <CardTitle className="flex items-center justify-end gap-2 text-sm font-medium">
                      <span className="line-clamp-1 text-sm">{nextPost.title}</span>
                      <ChevronRight className="h-4 w-4" />
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {nextPost.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </section>
        <aside className="relative h-full">
          <div className="sticky top-[var(--sticky-top)]">
            <div className="space-y-4 rounded-md p-6">
              <h3 className="text-md font-medium">On this page</h3>
              <nav className="space-y-3 text-sm">
                {data?.toc?.map((item: TocEntry) => (
                  <TableOfContentsLink key={item.id} item={item} />
                ))}
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
