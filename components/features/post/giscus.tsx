'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function CommentsByGiscus() {
  const { theme } = useTheme();

  return (
    <Giscus
      repo="moonstrnck/blog"
      repoId="R_kgDOPJuCyg"
      category="Comments"
      categoryId="DIC_kwDOPJuCys4CtRKH"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme === 'dark' ? 'noborder_dark' : 'noborder_light'}
      lang="en"
    />
  );
}
