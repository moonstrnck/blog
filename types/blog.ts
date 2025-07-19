export interface Tag {
  id: string;
  name: string;
  count: number;
}

export interface Post {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  tags?: string[];
  author?: string;
  authorImage?: string;

  createdAt?: string;
  modifiedAt?: string;

  slug: string;
}
export interface TocEntry {
  value: string;
  depth: number;
  id?: string;
  children?: Array<TocEntry>;
}
