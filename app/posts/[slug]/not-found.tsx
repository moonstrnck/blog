import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col items-center gap-4 text-center">
        <div className="text-muted-foreground flex items-center gap-2 text-6xl font-bold">404</div>
        <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
        <p className="text-muted-foreground">
          The Page you are looking for does not exist, had its name changed, or is temporarily
          unavailable.
        </p>
        <Button asChild className="mt-4">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
