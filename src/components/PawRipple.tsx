"use client";

import { useState, useCallback } from "react";
import { PawPrint } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Ripple = { id: number; x: number; y: number };

export default function PawRipple({ children, className }: { children: React.ReactNode; className?: string }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 1000);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className || ""}`} onClick={handleClick}>
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{ left: ripple.x - 12, top: ripple.y - 12 }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <PawPrint size={24} className="text-emerald-500/30" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
