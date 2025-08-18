import Image from 'next/image';
import Link from 'next/link';
import type { MDXComponents } from 'next-mdx-remote-client/rsc';

import Pre from './pre';
import { Blockquote } from './blockquote';

export const components: MDXComponents = {
  strong: (props: React.ComponentPropsWithoutRef<'strong'>) => (
    <strong className="custom-strong" {...props} />
  ),
  wrapper: (props: React.ComponentPropsWithoutRef<'div'>) => {
    return <div id="mdx-layout">{props.children}</div>;
  },
  a: (props: React.ComponentPropsWithoutRef<'a'>) => <a {...props} target="_blank" />,
  Image,
  Link,
  pre: Pre,
  blockquote: Blockquote,
};
