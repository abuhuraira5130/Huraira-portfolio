"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-destructive">Oops!</h1>
          <p className="text-xl text-muted-foreground">Something went wrong</p>
        </div>
        <p className="text-muted-foreground">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  )
}
