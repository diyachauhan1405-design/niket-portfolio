"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FEATURED_SERIES,
  PORTFOLIO_ITEMS,
  PortfolioItem,
} from "@/data/portfolioData";
import { useParallax } from "./useParallax";
import LightboxModal from "./LightboxModal";

interface PanelProps {
  title: string;
  kicker: string;
  cover: string;
  position?: string;
  onOpen: () => void;
}

/** One edge-to-edge, full-viewport panel whose photo drifts behind the scroll. */
function ParallaxPanel({ title, kicker, cover, position = "center", onOpen }: PanelProps) {
  const { containerRef, targetRef } = useParallax(0.3);

  return (
    <div
      ref={containerRef}
      onClick={onOpen}
      className="group relative h-[100svh] w-full overflow-hidden bg-black cursor-pointer"
    >
      <div ref={targetRef} className="absolute inset-x-0 -top-[18%] h-[136%] will-change-transform">
        <Image
          src={cover}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.03]"
          style={{ objectPosition: position }}
        />
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-700" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-display font-extralight uppercase text-white text-[clamp(1.6rem,5vw,3.6rem)] tracking-[0.08em] leading-tight">
          - {title} -
        </h2>
        <span className="mt-4 font-display uppercase text-[11px] tracking-[0.35em] text-white/0 group-hover:text-white/85 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          {kicker} · View series
        </span>
      </div>
    </div>
  );
}

const POSITIONS: Record<string, string> = {
  "series-maternity": "center 30%",
  "series-editorial": "center 35%",
  "series-panoramas": "center 30%",
  "series-milestones": "center 30%",
};

// A 4:1 panorama would be cropped to a sliver at full-screen, so use a
// portrait frame from the same series for that panel.
const COVER_OVERRIDES: Record<string, string> = {
  "series-panoramas": "/images/portfolio/celebration-quad-chapter18.jpg",
};

interface ParallaxPanelsProps {
  onOpenContact?: () => void;
}

export default function ParallaxPanels({ onOpenContact }: ParallaxPanelsProps) {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  const openSeries = (ids: string[]) => {
    setItems(PORTFOLIO_ITEMS.filter((i) => ids.includes(i.id)));
    setIndex(0);
  };

  return (
    <section id="work" className="relative bg-black">
      {FEATURED_SERIES.map((series) => (
        <ParallaxPanel
          key={series.id}
          title={series.title}
          kicker={series.tagline}
          cover={COVER_OVERRIDES[series.id] ?? series.cover}
          position={POSITIONS[series.id]}
          onOpen={() => openSeries(series.itemIds)}
        />
      ))}

      <LightboxModal
        items={items}
        currentIndex={index}
        onClose={() => setIndex(null)}
        onSelectIndex={setIndex}
        onBookSitting={onOpenContact}
      />
    </section>
  );
}
