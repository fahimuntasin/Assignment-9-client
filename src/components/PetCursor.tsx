"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function PetCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  const springX = useSpring(0, { stiffness: 100, damping: 20 });
  const springY = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  useEffect(() => {
    springX.set(mousePos.x);
    springY.set(mousePos.y);
  }, [mousePos.x, mousePos.y, springX, springY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <circle cx="8" cy="8" r="2" />
        <circle cx="16" cy="8" r="2" />
        <ellipse cx="12" cy="16" rx="6" ry="4" />
        <circle cx="12" cy="12" r="1.5" opacity="0.5" />
      </svg>
    </motion.div>
  );
}
