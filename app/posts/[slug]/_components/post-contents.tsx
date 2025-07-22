import { MDXRemote, MDXRemoteOptions } from 'next-mdx-remote-client/rsc';
import { components } from '@/components/mdx';
import { plugins } from '@/lib/mdx';

interface PostContentsProps {
  markdown: string;
}

export default function PostContents({ markdown }: PostContentsProps) {
  const options: MDXRemoteOptions = {
    disableImports: true, // import statements in MDX don't work in pages router
    parseFrontmatter: true,
    // scope: {
    //   readingTime: readingTime(markdown, 100).text,
    //   props: { foo: 'props in scope is working' },
    // },
    vfileDataIntoScope: 'toc', // the "remark-flexible-toc" plugin produces vfile.data.toc
    mdxOptions: {
      // format,
      ...plugins,
      // remarkRehypeOptions: format === 'md' ? remarkRehypeOptions : undefined,
    },
  };

  return (
    <div className="prose prose-slate prose-sm dark:prose-invert prose-headings:scroll-mt-[var(--header-height)] max-w-none">
      <MDXRemote source={markdown} options={options} components={components} />
    </div>
  );
}
