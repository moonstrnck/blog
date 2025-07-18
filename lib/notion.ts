import { Client } from '@notionhq/client';
import type { Post, TagFilterItem } from '@/types/blog';
import type {
  PageObjectResponse,
  UserObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const n2m = new NotionToMarkdown({ notionClient: notion });

interface GetPublishedPostsPrams {
  tag?: string;
  sort?: string;
  pageSize?: number;
  startCursor?: string;
}

interface GetPublishedPostsResponse {
  posts: Post[];
  hasNextPage: boolean;
  nextCursor: string | null;
}

export const getPublishedPosts = async ({
  tag,
  sort,
  pageSize = 5,
  startCursor,
}: GetPublishedPostsPrams): Promise<GetPublishedPostsResponse> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'Status',
      select: {
        equals: 'Published',
      },
      and: [
        {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
        ...(tag && tag !== 'all'
          ? [
              {
                property: 'Tags',
                multi_select: {
                  contains: tag,
                },
              },
            ]
          : []),
      ],
    },
    sorts: [
      {
        property: 'Date',
        direction: sort === 'latest' ? 'descending' : 'ascending',
      },
    ],
    page_size: pageSize,
    start_cursor: startCursor,
  });

  const posts = response.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map(getPostMetadata);

  return {
    posts,
    hasNextPage: response.has_more,
    nextCursor: response.next_cursor,
  };
};

export const getTags = async (): Promise<TagFilterItem[]> => {
  const { posts } = await getPublishedPosts({ pageSize: 100 });

  const tagCount = posts.reduce(
    (acc, post) => {
      post.tags?.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  const tags: TagFilterItem[] = Object.entries(tagCount).map(([name, count]) => ({
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
};

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
    date: properties.Date.type === 'date' ? (properties.Date.date?.start ?? '') : '',
    modifiedDate: page.last_edited_time,
    slug:
      properties.Slug.type === 'rich_text'
        ? (properties.Slug.rich_text[0]?.plain_text ?? page.id)
        : page.id,
  };
}

export const getPostBySlug = async (
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
};

export const getPrevNextPosts = async (
  currentSlug: string
): Promise<{
  prevPost: Post | null;
  nextPost: Post | null;
}> => {
  const { posts: allPosts } = await getPublishedPosts({ pageSize: 100 });

  const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { prevPost: null, nextPost: null };
  }

  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return { prevPost, nextPost };
};
