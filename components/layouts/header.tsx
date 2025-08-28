'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import Logo from '@/assets/logo/logo.svg';

export default function Header() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <header
      ref={ref}
      className={`bg-background/50 transition-smooth sticky top-0 z-50 backdrop-blur-md backdrop-saturate-180 transition-transform duration-400 ${
        isVisible ? 'translate-y-0' : '-translate-y-full delay-100'
      }`}
    >
      <div className="container flex h-[var(--header-height)] items-center px-4">
        <Link href="/" className="flex items-center gap-x-2 text-xl font-medium">
          &lt;
          <Logo width={120} className="text-foreground" />
          /&gt;
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Link
            href="/"
            className="hover:text-point transition-smooth font-medium transition-colors duration-200"
          >
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
