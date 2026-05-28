"use client";

import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";

export function PawLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          >
            <PawPrint
              size={20 + i * 4}
              className="text-emerald-500/40"
              style={{ transform: `rotate(${i * 15 - 15}deg)` }}
            />
          </motion.div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
    </div>
  );
}
