import Link from 'next/link';
import { TocEntry } from '@/types/blog';
import { compile } from '@mdx-js/mdx';
import { tocPlugins } from '@/lib/mdx';

function TableOfContentsLink({ item }: { item: TocEntry }) {
  return (
    <div className="space-y-2">
      <Link
        key={item.id}
        href={`#${item.id?.replace('user-content-', '')}`}
        className={`hover:text-foreground text-muted-foreground block font-medium transition-colors`}
      >
        {item.value}
      </Link>
      {item.children && item.children.length > 0 && (
        <div className="space-y-2 pl-4">
          {item.children.map((subItem) => (
            <TableOfContentsLink key={subItem.id} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
}

async function OnThisPage({ markdown }: { markdown: string }) {
  const { data } = await compile(markdown, {
    rehypePlugins: [...tocPlugins],
  });
  const toc = data?.toc;

  if (!toc) return null;

  return (
    <div className="sticky top-[var(--sticky-top)]">
      <div className="space-y-4 rounded-md p-6">
        <h3 className="text-md font-medium">On this page</h3>
        <nav className="space-y-3 text-sm">
          {toc.map((item: TocEntry) => (
            <TableOfContentsLink key={item.id} item={item} />
          ))}
        </nav>
      </div>
    </div>
  );
}

export default OnThisPage;
