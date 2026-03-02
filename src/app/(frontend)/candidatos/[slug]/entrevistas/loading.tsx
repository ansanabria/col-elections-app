import { Skeleton } from '@/components/ui/skeleton'

export default function EntrevistasLoading() {
  return (
    <div>
      {/* Back link */}
      <div className="mb-4">
        <Skeleton className="h-5 w-48" />
      </div>

      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2">
        <Skeleton className="h-4 w-20" />
        <span className="text-muted-foreground">/</span>
        <Skeleton className="h-4 w-32" />
        <span className="text-muted-foreground">/</span>
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Header */}
      <header className="mb-10 border-b border-border pb-8">
        <Skeleton className="mb-2 h-3 w-28" />
        <Skeleton className="mb-2 h-9 w-64" />
        <Skeleton className="h-4 w-40" />
      </header>

      {/* YouTube-like video grid — 3 columns on large, 2 on small */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-lg border border-border bg-card"
          >
            {/* Video thumbnail placeholder */}
            <Skeleton className="aspect-video w-full rounded-none" />

            {/* Card body */}
            <div className="space-y-2 p-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
