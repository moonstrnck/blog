import { MDXRemote, MDXRemoteOptions } from 'next-mdx-remote-client/rsc';
import { components } from '@/components/mdx';
import { plugins } from '@/lib/mdx';

interface PostContentsProps {
  markdown: string;
}

export default function PostContents({ markdown }: PostContentsProps) {
  // https://github.com/talatkuyuk/next-mdx-remote-client-in-app-router/blob/main/app/articles/%5Bslug%5D/page.tsx
  const options: MDXRemoteOptions = {
    disableImports: true,
    parseFrontmatter: true,
    vfileDataIntoScope: 'toc',
    mdxOptions: {
      ...plugins,
    },
  };

  return (
    <div className="prose prose-slate prose-sm dark:prose-invert prose-headings:scroll-mt-[var(--header-height)] max-w-none">
      <MDXRemote source={markdown} options={options} components={components} />
    </div>
  );
}
