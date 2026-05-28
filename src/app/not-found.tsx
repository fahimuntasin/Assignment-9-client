import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, PawPrint, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-md w-full backdrop-blur-2xl bg-background/30 border border-white/10 rounded-3xl p-10 text-center shadow-2xl">
        {/* Decorative paw prints */}
        <div className="absolute -top-4 -right-4 text-emerald-500/10">
          <PawPrint className="h-16 w-16" />
        </div>
        <div className="absolute -bottom-4 -left-4 text-emerald-500/10 rotate-45">
          <PawPrint className="h-12 w-12" />
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 bg-emerald-400/10 blur-2xl rounded-full" />
          <PawPrint className="relative h-16 w-16 mx-auto text-emerald-500" />
        </div>

        <h1 className="text-7xl font-black mb-2 bg-gradient-to-b from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
          404
        </h1>
        <div className="h-1 w-16 mx-auto bg-gradient-to-r from-emerald-400/50 to-emerald-600/50 rounded-full mb-6" />

        <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="plastic" size="lg" className="gap-2 w-full sm:w-auto">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/pets">
            <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
              <Search className="h-4 w-4" />
              Browse Pets
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
