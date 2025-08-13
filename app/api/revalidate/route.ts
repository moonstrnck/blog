import { POST_CONTENTS } from '@/contants';
import { revalidatePath, revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { revalidateKey, pageId, slug } = (await request.json()) as {
    revalidateKey: string;
    pageId: string;
    slug: string;
  };

  if (revalidateKey !== process.env.REVALIDATE_KEY) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: 'Invalid revalidate key.',
    });
  }

  if (!pageId || !slug) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: 'Missing pageId or slug.',
    });
  }

  const slugPattern = /^[a-z0-9-]+$/;
  if (!slugPattern.test(slug)) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: 'Invalid slug format.',
    });
  }

  try {
    revalidateTag(POST_CONTENTS(slug));
    revalidatePath('/', 'page');

    return Response.json({
      revalidated: true,
      now: Date.now(),
      revalidatedPageId: pageId,
      revalidatedPaths: [`/posts/${slug}`, '/'],
    });
  } catch (error) {
    console.error('Revalidation error:', error);

    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: 'Failed to revalidate due to server error.',
    });
  }
}
