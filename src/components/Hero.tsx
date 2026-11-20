"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useParallax } from "./useParallax";

const SLIDES = [
  { src: "/images/portfolio/maternity-miracle-01.jpg", pos: "center 30%" },
  { src: "/images/portfolio/editorial-motion-blur.jpg", pos: "center 35%" },
  { src: "/images/portfolio/family-woodland-autumn.jpg", pos: "center 25%" },
  { src: "/images/portfolio/maternity-shore-04.jpg", pos: "center 40%" },
  { src: "/images/portfolio/editorial-monochrome-suits.jpg", pos: "center 30%" },
];

interface HeroProps {
  onExploreClick: () => void;
}

/** Full-screen crossfading slideshow with a centered title — Tim Tadder's opening frame. */
export default function Hero({ onExploreClick }: HeroProps) {
  const [active, setActive] = useState(0);
  const { containerRef, targetRef } = useParallax(0.35);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-[100svh] w-full overflow-hidden bg-black"
    >
      <div ref={targetRef} className="absolute inset-x-0 -top-[12%] h-[124%] will-change-transform">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              preload={i === 0}
              sizes="100vw"
              className={`object-cover ${i === active ? "hero-kenburns" : ""}`}
              style={{ objectPosition: slide.pos }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display font-extralight uppercase text-white text-[clamp(1.9rem,6vw,4.5rem)] tracking-[0.12em] leading-tight">
          - Galleries by Nik -
        </h1>
        <p className="mt-4 font-display font-light uppercase tracking-[0.4em] text-[11px] sm:text-xs text-white/80">
          Maternity · Editorial · Milestones
        </p>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-24 inset-x-0 z-10 flex justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}`}
            className={`h-[2px] transition-all duration-500 cursor-pointer ${
              i === active ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <button
        onClick={onExploreClick}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/90 hover:text-white cursor-pointer"
      >
        <span className="font-display uppercase text-[11px] tracking-[0.3em]">Scroll</span>
        <ChevronDown size={22} strokeWidth={1} className="animate-bounce" />
      </button>
    </section>
  );
}
