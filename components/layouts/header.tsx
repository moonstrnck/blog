import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export default function Header() {
  return (
    <header className="bg-background/50 sticky top-0 z-50 backdrop-blur-md">
      <div className="container flex h-[var(--header-height)] items-center px-4">
        <Link href="/" className="text-xl font-semibold">
          <span className="block h-10 w-36 rounded-md bg-[url('/images/logo.png')] bg-cover bg-position-[top_30%_center] bg-no-repeat"></span>
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
