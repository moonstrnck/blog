'use client';

import { Button } from '@/components/ui/button';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col items-center gap-4 text-center">
        <div className="text-muted-foreground text-6xl font-bold">500</div>
        <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="text-muted-foreground">
          The server encountered an error. Please try again later.
        </p>
        <Button onClick={() => reset()} className="mt-4">
          Try again
        </Button>
      </div>
    </div>
  );
}
