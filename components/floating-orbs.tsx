"use client"

export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute top-40 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-20 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />
    </div>
  )
}
