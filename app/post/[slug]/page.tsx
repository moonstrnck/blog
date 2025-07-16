import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { getPostBySlug } from '@/lib/notion';
import { formatDate } from '@/lib/date';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import withSlugs from 'rehype-slug';
import withToc from '@stefanprobst/rehype-extract-toc';
import withTocExport from '@stefanprobst/rehype-extract-toc/mdx';
import { compile } from '@mdx-js/mdx';

interface TocEntry {
  value: string;
  depth: number;
  id?: string;
  children?: Array<TocEntry>;
}

function TableOfContentsLink({ item }: { item: TocEntry }) {
  return (
    <div className="space-y-2">
      <Link
        key={item.id}
        href={`#${item.id?.replace('user-content-', '')}`}
        className={`hover:text-foreground text-muted-foreground block font-medium transition-colors`}
      >
        {item.value}
      </Link>
      {item.children && item.children.length > 0 && (
        <div className="space-y-2 pl-4">
          {item.children.map((subItem) => (
            <TableOfContentsLink key={subItem.id} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const { markdown, post } = await getPostBySlug(slug);

  const { data } = await compile(markdown, {
    rehypePlugins: [
      withSlugs,
      rehypeSanitize,
      rehypeRaw,
      rehypeSlug,
      rehypePrettyCode,
      withToc,
      withTocExport,
      /** Optionally, provide a custom name for the export. */
      // [withTocExport, { name: 'toc' }],
    ],
  });

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
              {post.date && (
                <div className="flex items-center gap-2">
                  <span>·</span>
                  <time className="text-muted-foreground">{formatDate(post.date)}</time>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span>·</span>
                <span>5 min read</span>
              </div>
            </div>
          </div>
          <Separator className="mt-6 mb-12" />
          {/* 블로그 본문 */}
          <div className="prose prose-slate prose-sm dark:prose-invert prose-headings:scroll-mt-[var(--header-height)] max-w-none">
            <MDXRemote
              source={markdown}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSanitize, rehypePrettyCode, rehypeRaw, rehypeSlug],
                },
              }}
            />
          </div>
          <Separator className="my-12" />
          {/* 이전/다음 포스트 네비게이션 */}
          <nav className="grid grid-cols-2 gap-8">
            <Link href="/blog/previous-post">
              <Card className="group hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-medium">
                    <ChevronLeft className="h-4 w-4" />
                    <span>시작하기</span>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    Next.js를 시작하는 방법부터 프로젝트 구조, 기본 설정까지 상세히 알아봅니다.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/blog/next-post" className="text-right">
              <Card className="group hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center justify-end gap-2 text-base font-medium">
                    <span>심화 가이드</span>
                    <ChevronRight className="h-4 w-4" />
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    Next.js의 고급 기능들을 활용하여 더 나은 웹 애플리케이션을 만드는 방법을
                    소개합니다.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </nav>
        </section>
        <aside className="relative h-full">
          <div className="sticky top-[var(--sticky-top)]">
            <div className="border-border space-y-4 rounded-md border p-6">
              <h3 className="text-md font-medium">Table of Contents</h3>
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
