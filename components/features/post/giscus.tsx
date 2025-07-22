'use client';

import Giscus from '@giscus/react';

export default function CommentsByGiscus() {
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
      theme="noborder_light"
      lang="en"
    />
  );
}
