import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import type { MDXComponents } from 'next-mdx-remote-client/rsc';

import Pre from './pre';

export const components: MDXComponents = {
  strong: (props: React.ComponentPropsWithoutRef<'strong'>) => (
    <strong className="custom-strong" {...props} />
  ),
  wrapper: (props: React.ComponentPropsWithoutRef<'div'>) => {
    return <div id="mdx-layout">{props.children}</div>;
  },
  Image,
  Link,
  pre: Pre,
};
