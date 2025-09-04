import { Github, AtSign } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto flex flex-col items-center gap-2 pt-4 pb-8">
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/moonstrnck"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Github className="text-muted-foreground group-hover:text-foreground transition-smooth h-4 w-4 duration-200" />
          </Link>
          <Link
            href="mailto:moonstrnck@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <AtSign className="text-muted-foreground group-hover:text-foreground transition-smooth h-4 w-4 duration-200" />
          </Link>
        </div>
        <p className="text-muted-foreground text-sm">shmoon • © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
