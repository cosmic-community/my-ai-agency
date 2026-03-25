export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-accent-cyan/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent-cyan animate-spin" />
        </div>
        <p className="text-dark-200 text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  )
}