"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function LoadingBar() {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Start loading when route changes
    setIsLoading(true)
    setProgress(10)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 90) return prev + Math.random() * 30
        return prev
      })
    }, 200)

    // Complete loading
    const timeout = setTimeout(() => {
      setProgress(100)
      setIsLoading(false)
    }, 500)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [pathname, searchParams])

  return (
    <>
      {isLoading && (
        <div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-50 transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            opacity: progress === 100 ? 0 : 1,
          }}
        />
      )}
    </>
  )
}
