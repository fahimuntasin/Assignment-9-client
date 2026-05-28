"use client";

import { PawPrint } from "lucide-react";
import { motion } from "framer-motion";

const paws = [
  { top: "10%", left: "5%", size: 24, opacity: 0.03, rotate: -15 },
  { top: "25%", right: "8%", size: 32, opacity: 0.04, rotate: 20 },
  { top: "50%", left: "3%", size: 20, opacity: 0.03, rotate: -30 },
  { top: "70%", right: "5%", size: 28, opacity: 0.04, rotate: 10 },
  { top: "85%", left: "10%", size: 18, opacity: 0.03, rotate: -5 },
  { top: "15%", left: "45%", size: 16, opacity: 0.015, rotate: 45 },
  { top: "40%", left: "90%", size: 22, opacity: 0.03, rotate: -20 },
  { top: "60%", left: "50%", size: 14, opacity: 0.015, rotate: 35 },
  { top: "90%", left: "80%", size: 20, opacity: 0.025, rotate: -10 },
  { top: "5%", left: "70%", size: 16, opacity: 0.02, rotate: 60 },
  { top: "45%", left: "15%", size: 12, opacity: 0.02, rotate: -45 },
  { top: "75%", left: "35%", size: 10, opacity: 0.015, rotate: 25 },
];

export default function PawBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {paws.map((paw, i) => (
        <motion.div
          key={i}
          className="absolute text-foreground"
          style={{
            top: paw.top,
            left: paw.left,
            right: paw.right,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: paw.opacity, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <PawPrint
            size={paw.size}
            className="text-current"
            style={{
              transform: `rotate(${paw.rotate}deg)`,
              opacity: 1,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
