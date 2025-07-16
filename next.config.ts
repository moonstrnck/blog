import type { NextConfig } from 'next';
import remarkGfm from 'remark-gfm';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  /* config options here */

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
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    // @ts-ignore
    remarkPlugins: [['remarkGfm']],
  },
});

export default withMDX(nextConfig);
