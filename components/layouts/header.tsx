import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50">
      <div className="container flex h-[var(--header-height)] items-center px-4">
        <Link href="/" className="text-xl font-semibold">
          <span className="font-bold">Blog</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Link href="/" className="hover:text-primary font-medium">
            Posts
          </Link>
          {/* <Link href="/about" className="hover:text-primary font-medium">
            About
          </Link> */}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
