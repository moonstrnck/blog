import { type PluggableList } from 'unified';
import { nodeTypes } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import withToc from '@stefanprobst/rehype-extract-toc';
import withTocExport from '@stefanprobst/rehype-extract-toc/mdx';
import rehypePreLanguage from 'rehype-pre-language';
import withSlugs from 'rehype-slug';

const remarkPlugins: PluggableList = [remarkGfm];

const rehypePlugins: PluggableList = [
  // rehypeSanitize,
  [rehypeRaw, { passThrough: nodeTypes }], // to allow HTML elements in "md" format, "passThrough" is for "mdx" works as well
  [rehypePrettyCode, { theme: 'slack-dark' }],
  rehypePreLanguage,
  rehypeSlug,

  withToc,
  withTocExport,
];

const recmaPlugins: PluggableList = [];

export const tocPlugins: PluggableList = [
  withSlugs,
  withToc,
  withTocExport,
  // rehypeSanitize,
];

export const plugins = {
  remarkPlugins,
  rehypePlugins,
  recmaPlugins,
};

export const remarkRehypeOptions = {};
