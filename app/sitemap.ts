import { MetadataRoute } from 'next';
import { getAllPublishedPosts } from '@/lib/notion';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPublishedPosts();

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://shmoon.dev/${post.slug}`,
    lastModified: new Date(post.modifiedAt || post.createdAt || new Date()),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://shmoon.dev',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://shmoon.dev/posts',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...postUrls,
  ];
}
