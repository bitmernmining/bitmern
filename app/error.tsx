"use client"

import { Button } from "@/components/ui/button"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-heading text-6xl font-bold text-foreground/10">Error</p>
      <h1 className="mt-4 text-2xl font-semibold">Something Went Wrong</h1>
      <p className="mt-2 text-foreground/60 max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <div className="mt-8">
        <Button size="lg" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  )
}
