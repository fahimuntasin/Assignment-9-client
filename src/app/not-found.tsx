import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, Cat, Dog, Bird } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Floating pets background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <Cat className="absolute top-[20%] left-[8%] h-8 w-8 text-emerald-500/10 animate-[bounce_3s_ease-in-out_infinite]" />
        <Dog className="absolute top-[60%] right-[10%] h-10 w-10 text-emerald-500/10 animate-[bounce_4s_ease-in-out_infinite_1s]" />
        <Bird className="absolute bottom-[15%] left-[15%] h-6 w-6 text-emerald-500/10 animate-[bounce_3.5s_ease-in-out_infinite_0.5s]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute text-emerald-500/8"
              style={{
                transform: `rotate(${i * 30}deg) translateX(${40 + i * 15}px)`,
                opacity: 0.3 - i * 0.05,
              }}
            >
              <Dog size={12 + i * 4} />
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-md w-full backdrop-blur-2xl bg-background/30 border border-white/10 rounded-3xl p-10 text-center shadow-2xl">
        {/* Animated decorative paw prints */}
        <div className="absolute -top-3 -right-3">
          <Cat className="h-10 w-10 text-emerald-400/20 animate-[bounce_2s_ease-in-out_infinite]" />
        </div>
        <div className="absolute -bottom-3 -left-3">
          <Dog className="h-10 w-10 text-emerald-400/20 rotate-12 animate-[bounce_2.5s_ease-in-out_infinite_0.5s]" />
        </div>
        <div className="absolute top-1/2 -right-2">
          <Bird className="h-6 w-6 text-emerald-400/15 animate-[bounce_2.2s_ease-in-out_infinite_1s]" />
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 bg-emerald-400/10 blur-2xl rounded-full" />
          {/* Sad dog/cat face */}
          <svg viewBox="0 0 100 100" className="relative h-20 w-20 mx-auto text-emerald-500">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
            <circle cx="35" cy="40" r="4" fill="currentColor" opacity="0.8" />
            <circle cx="65" cy="40" r="4" fill="currentColor" opacity="0.8" />
            <ellipse cx="50" cy="55" rx="3" ry="2" fill="currentColor" opacity="0.4" />
            <path d="M35 70 Q50 60 65 70" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            <path d="M25 30 Q30 20 40 25" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            <path d="M75 30 Q70 20 60 25" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          </svg>
        </div>

        <h1 className="text-7xl font-black mb-2 bg-gradient-to-b from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
          404
        </h1>
        <div className="h-1 w-16 mx-auto bg-gradient-to-r from-emerald-400/50 to-emerald-600/50 rounded-full mb-6" />

        <h2 className="text-xl font-semibold mb-2">Oops! Page lost</h2>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          Looks like this page wandered off like a curious cat.
          Let&apos;s get you back to the pet family.
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
