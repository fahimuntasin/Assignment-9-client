"use client";

import { useState } from "react";

const FALLBACK = "data:image/svg+xml," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="#f4f4f5"/>
    <g transform="translate(200,140)" fill="#d4d4d8">
      <circle cx="0" cy="-20" r="14"/>
      <circle cx="-22" cy="-18" r="11"/>
      <circle cx="22" cy="-18" r="11"/>
      <circle cx="-30" cy="2" r="10"/>
      <circle cx="30" cy="2" r="10"/>
      <ellipse cx="0" cy="26" rx="28" ry="22"/>
      <circle cx="0" cy="26" r="18" fill="#f4f4f5"/>
    </g>
    <text x="200" y="210" text-anchor="middle" fill="#a1a1aa" font-size="14" font-family="sans-serif">No image available</text>
  </svg>`
);

export default function ImageWithFallback({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return <img src={FALLBACK} alt={alt} className={className} />;
  }

  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
}
