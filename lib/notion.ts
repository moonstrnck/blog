'server-only';

import { Client } from '@notionhq/client';
import type { Post, Tag } from '@/types/blog';
import type {
  PageObjectResponse,
  UserObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';
import type { MdBlock } from 'notion-to-md/build/types';
import { POST_CONTENTS } from '@/contants';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import { uploadNotionImageToCloudinary } from './cloudinary';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const n2m = new NotionToMarkdown({ notionClient: notion });

/**
 * 게시글 목록 조회
 */

export const getAllPublishedPosts = cache(async () => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'Status',
      select: {
        equals: 'Published',
      },
    },
    sorts: [
      {
        property: 'CreatedAt',
        direction: 'descending',
      },
    ],
  });

  const pages = response.results.filter((page): page is PageObjectResponse => 'properties' in page);

  const posts = await Promise.all(
    pages.map(async (page) => {
      return await getPostMetadata(page);
    })
  );

  return posts;
});

/**
 * 태그 목록 조회
 */
export const getAllTags = cache(async (): Promise<Tag[]> => {
  const posts = await getAllPublishedPosts();

  const tagCount = posts.reduce(
    (acc, post) => {
      post.tags?.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  const tags: Tag[] = Object.entries(tagCount).map(([name, count]) => ({
    id: name,
    name,
    count,
  }));

  tags.unshift({
    id: 'all',
    name: 'All',
    count: posts.length,
  });

  const [allTag, ...restTags] = tags;
  const sortedTags = restTags.sort((a, b) => a.name.localeCompare(b.name));

  return [allTag, ...sortedTags];
});

/**
 * 게시글 메타데이터 조회
 */
async function getPostMetadata(page: PageObjectResponse): Promise<Post> {
  const { properties } = page;

  const slug =
    properties.Slug.type === 'rich_text'
      ? (properties.Slug.rich_text[0]?.plain_text ?? page.id)
      : page.id;

  const authorName =
    properties.Author.type === 'people'
      ? ((properties.Author.people[0] as UserObjectResponse)?.name ?? '')
      : '';

  // 커버 이미지 처리
  const getCoverImage = async (cover: PageObjectResponse['cover']) => {
    if (!cover) return '';

    let coverUrl = '';
    switch (cover.type) {
      case 'external':
        coverUrl = cover.external.url;
        break;
      case 'file':
        coverUrl = cover.file.url;
        break;
      default:
        return '';
    }

    if (coverUrl) {
      return await uploadNotionImageToCloudinary(coverUrl, 'blog/cover', `cover-${slug}`);
    }
  };

  // 작성자 이미지 처리
  const getAuthorImage = async () => {
    if (properties.Author.type !== 'people' || !properties.Author.people[0]) {
      return '';
    }

    const authorImageUrl = (properties.Author.people[0] as UserObjectResponse)?.avatar_url ?? '';

    if (authorImageUrl) {
      const sanitizedAuthorName = authorName.toLowerCase().replace(/\s+/g, '-');
      return await uploadNotionImageToCloudinary(
        authorImageUrl,
        'blog/author',
        sanitizedAuthorName
      );
    }

    return authorImageUrl;
  };

  const [coverImage, authorImage] = await Promise.all([
    getCoverImage(page.cover),
    getAuthorImage(),
  ]);

  return {
    id: page.id,
    title: properties.Title.type === 'title' ? (properties.Title.title[0]?.plain_text ?? '') : '',
    description:
      properties.Description.type === 'rich_text'
        ? (properties.Description.rich_text[0]?.plain_text ?? '')
        : '',
    coverImage,
    tags:
      properties.Tags.type === 'multi_select'
        ? properties.Tags.multi_select.map((tag) => tag.name)
        : [],
    author: authorName,
    authorImage,
    createdAt: properties.CreatedAt.type === 'date' ? (properties.CreatedAt.date?.start ?? '') : '',
    modifiedAt: page.last_edited_time,
    slug,
  };
}

/**
 * 마크다운 블록 내 이미지 Block 처리 + paragraph 줄내림 처리
 */
async function processNotionBlocks(blocks: MdBlock[], slug: string): Promise<MdBlock[]> {
  let imageIndex = 0;
  const processedBlocks = [];

  for (const block of blocks) {
    if (block.type === 'image') {
      const imageUrlMatch = block.parent.match(/!\[([^\]]*)\]\(([^)]+)\)/);

      if (imageUrlMatch) {
        const [, , originalUrl] = imageUrlMatch;

        const cloudinaryUrl = await uploadNotionImageToCloudinary(
          originalUrl,
          `blog/${slug}`,
          `${imageIndex}`
        );

        const updatedParent = block.parent.replace(originalUrl, cloudinaryUrl);

        processedBlocks.push({
          ...block,
          parent: updatedParent,
        });

        imageIndex++;
      } else {
        processedBlocks.push(block);
      }
    } else {
      processedBlocks.push(block);
    }
  }

  return processedBlocks;
}

/**
 * 게시글 상세 조회
 */
export const getPostBySlug = (slug: string) => {
  const cacheKey = POST_CONTENTS(slug);

  return unstable_cache(
    async (
      slug: string
    ): Promise<{
      markdown: string;
      post: Post | null;
    }> => {
      const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID!,
        filter: {
          and: [
            {
              property: 'Slug',
              rich_text: {
                equals: slug,
              },
            },
            {
              property: 'Status',
              select: {
                equals: 'Published',
              },
            },
          ],
        },
      });

      if (!response.results[0]) {
        return {
          markdown: '',
          post: null,
        };
      }

      const mdBlocks = await n2m.pageToMarkdown(response.results[0].id);
      const processedBlocks = await processNotionBlocks(mdBlocks, slug);
      const { parent } = n2m.toMarkdownString(processedBlocks);

      return {
        markdown: parent,
        post: await getPostMetadata(response.results[0] as PageObjectResponse),
      };
    },
    [cacheKey],
    {
      tags: [cacheKey],
    }
  )(slug);
};

/**
 * 이전, 다음 게시글 조회
 */
export const getPrevNextPosts = async (
  currentSlug: string
): Promise<{
  prevPost: Post | null;
  nextPost: Post | null;
}> => {
  const allPosts = await getAllPublishedPosts();

  const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { prevPost: null, nextPost: null };
  }

  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return { prevPost, nextPost };
};
