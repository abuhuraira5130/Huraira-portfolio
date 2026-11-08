export default function SectionDivider() {
  return (
    <div className="relative h-20 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
      <div className="relative bg-background px-4">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
      </div>
    </div>
  )
}
