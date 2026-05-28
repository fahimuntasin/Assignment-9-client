export function PetCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <div className="aspect-[4/3] bg-gradient-to-r from-muted via-muted/50 to-muted animate-[shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%]" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gradient-to-r from-muted via-muted/50 to-muted animate-[shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] rounded w-2/3" />
        <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted animate-[shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] rounded w-1/2" />
        <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted animate-[shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] rounded w-3/4" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
          <div className="w-24 h-16 bg-gradient-to-r from-muted via-muted/50 to-muted animate-[shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted animate-[shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] rounded w-1/3" />
            <div className="h-3 bg-gradient-to-r from-muted via-muted/50 to-muted animate-[shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] rounded w-1/4" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-20 bg-gradient-to-r from-muted via-muted/50 to-muted animate-[shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] rounded-lg" />
            <div className="h-8 w-16 bg-gradient-to-r from-muted via-muted/50 to-muted animate-[shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%] rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
