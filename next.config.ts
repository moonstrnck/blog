import type { NextConfig } from 'next';
import remarkGfm from 'remark-gfm';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    // .svg?url → 일반 이미지로 사용
    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: /url/,
      type: 'asset',
    });

    // .svg → 컴포넌트로 사용
    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: { not: [/url/] },
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below

  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        hostname: 'www.notion.so',
      },
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    // @ts-ignore
    remarkPlugins: [['remarkGfm']],
    // @ts-ignore
    rehypePlugins: [['rehype-slug']],
  },
});

export default withMDX(nextConfig);
