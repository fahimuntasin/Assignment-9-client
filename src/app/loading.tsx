import { PawPrint } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <PawPrint className="h-12 w-12 animate-bounce text-primary" />
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-[bounce_1s_infinite] [animation-delay:0ms]" />
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-[bounce_1s_infinite] [animation-delay:150ms]" />
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-[bounce_1s_infinite] [animation-delay:300ms]" />
        </div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
