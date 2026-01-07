"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

// Decorative video banner section displayed above the hero.
// Non-DB: purely presentational. Adjust styling as needed.
export function HeaderVideoSection() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!overlayRef.current) return;
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const poster = "/pile-logo.png";
  return (
    <section className="relative w-full h-[55vh] min-h-[420px] overflow-hidden hidden md:block">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src="/video/header.mp4" type="video/mp4" />
      </video>
      {/* Layered overlays for readability and visual depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-background/80" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />

      {/* Top fade to blend with content above (when placed below Hero) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />

      {/* Bottom fade to softly transition into hero */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
