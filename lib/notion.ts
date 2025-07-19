import { Client } from '@notionhq/client';
import type { Post, Tag } from '@/types/blog';
import type {
  PageObjectResponse,
  UserObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';
import { POST_CONTENT } from '@/contants';
import { unstable_cache } from 'next/cache';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const n2m = new NotionToMarkdown({ notionClient: notion });

/**
 * 게시글 목록 조회
 */
import { cache } from 'react';

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

  return response.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map(getPostMetadata);
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
function getPostMetadata(page: PageObjectResponse): Post {
  const { properties } = page;

  const getCoverImage = (cover: PageObjectResponse['cover']) => {
    if (!cover) return '';

    switch (cover.type) {
      case 'external':
        return cover.external.url;
      case 'file':
        return cover.file.url;
      default:
        return '';
    }
  };

  return {
    id: page.id,
    title: properties.Title.type === 'title' ? (properties.Title.title[0]?.plain_text ?? '') : '',
    description:
      properties.Description.type === 'rich_text'
        ? (properties.Description.rich_text[0]?.plain_text ?? '')
        : '',
    coverImage: getCoverImage(page.cover),
    tags:
      properties.Tags.type === 'multi_select'
        ? properties.Tags.multi_select.map((tag) => tag.name)
        : [],
    author:
      properties.Author.type === 'people'
        ? ((properties.Author.people[0] as UserObjectResponse)?.name ?? '')
        : '',
    authorImage:
      properties.Author.type === 'people'
        ? ((properties.Author.people[0] as UserObjectResponse)?.avatar_url ?? '')
        : '',
    createdAt: properties.CreatedAt.type === 'date' ? (properties.CreatedAt.date?.start ?? '') : '',
    modifiedAt: page.last_edited_time,
    slug:
      properties.Slug.type === 'rich_text'
        ? (properties.Slug.rich_text[0]?.plain_text ?? page.id)
        : page.id,
  };
}

/**
 * 게시글 상세 조회
 */
export const getPostBySlug = (slug: string) => {
  const cacheKey = POST_CONTENT(slug);

  return unstable_cache(
    async (
      slug: string
    ): Promise<{
      markdown: string;
      post: Post;
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

      const mdBlocks = await n2m.pageToMarkdown(response.results[0].id);
      const { parent } = n2m.toMarkdownString(mdBlocks);
      return {
        markdown: parent,
        post: getPostMetadata(response.results[0] as PageObjectResponse),
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
