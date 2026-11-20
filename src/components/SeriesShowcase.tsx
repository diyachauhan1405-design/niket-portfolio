"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, Camera, Eye, Layers } from "lucide-react";
import {
  FEATURED_SERIES,
  PORTFOLIO_ITEMS,
  PortfolioItem,
} from "@/data/portfolioData";
import LightboxModal from "./LightboxModal";

interface SeriesShowcaseProps {
  onOpenContact?: () => void;
}

export default function SeriesShowcase({ onOpenContact }: SeriesShowcaseProps) {
  const [activeSeriesIndex, setActiveSeriesIndex] = useState(0);
  const [lightboxItems, setLightboxItems] = useState<PortfolioItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeSeries = FEATURED_SERIES[activeSeriesIndex];

  // Get items belonging to the active series
  const seriesItems = PORTFOLIO_ITEMS.filter((item) =>
    activeSeries.itemIds.includes(item.id)
  );

  const openSeriesLightbox = (item: PortfolioItem) => {
    setLightboxItems(seriesItems);
    const idx = seriesItems.findIndex((i) => i.id === item.id);
    setLightboxIndex(idx !== -1 ? idx : 0);
  };

  return (
    <section
      id="series"
      className="relative bg-[#050505] py-24 sm:py-32 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* Header */}
        <div className="mb-14 sm:mb-18 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#d1a85b] font-medium">
                02 / Featured Series
              </span>
              <span className="h-px w-6 bg-[#d1a85b]/40" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f7f5f0] font-normal tracking-tight">
              Campaigns & Monographs
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md">
            Organized in thematic bodies of work — reflecting distinctive lighting
            philosophies, narrative rhythms, and print monographs.
          </p>
        </div>

        {/* Series Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {FEATURED_SERIES.map((series, idx) => (
            <button
              key={series.id}
              onClick={() => setActiveSeriesIndex(idx)}
              className={`p-4 sm:p-5 text-left rounded-[3px] border transition-all cursor-pointer flex flex-col justify-between ${
                activeSeriesIndex === idx
                  ? "bg-[#141414] border-[#d1a85b] text-white shadow-lg"
                  : "bg-[#0a0a0a] border-white/5 text-neutral-400 hover:text-white hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <span className="text-[#d1a85b]">{series.number}</span>
                <span className="text-neutral-500">{series.date}</span>
              </div>
              <span className="font-serif text-lg sm:text-xl font-normal leading-tight">
                {series.title}
              </span>
            </button>
          ))}
        </div>

        {/* Active Series Feature Card (Tim Tadder Campaign Layout) */}
        <div className="rounded-[4px] border border-white/10 bg-[#0a0a0a] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Narrative Column */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#d1a85b] mb-4">
                  <span>SERIES {activeSeries.number}</span>
                  <span>•</span>
                  <span>{activeSeries.tagline}</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium mb-6 leading-tight">
                  {activeSeries.title}
                </h3>

                <p className="text-neutral-300 font-light text-sm sm:text-base leading-relaxed mb-8">
                  {activeSeries.statement}
                </p>

                {/* Highlight Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {activeSeries.highlightStats.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">
                  {seriesItems.length} Key Monographs
                </span>
                <button
                  onClick={() => openSeriesLightbox(seriesItems[0])}
                  className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#d1a85b] hover:text-white transition-colors cursor-pointer"
                >
                  <span>Launch Series</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Right Interactive Photo Grid */}
            <div className="lg:col-span-7 p-6 sm:p-10 bg-[#080808] grid grid-cols-2 gap-4">
              {seriesItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openSeriesLightbox(item)}
                  className="group relative aspect-[3/4] rounded-[2px] overflow-hidden border border-white/10 hover:border-[#d1a85b] cursor-pointer transition-all duration-300"
                >
                  <Image
                    src={item.thumb}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <span className="font-serif text-sm text-white font-medium">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#d1a85b] mt-0.5">
                      {item.gear}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox for Series */}
      <LightboxModal
        items={lightboxItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
        onBookSitting={onOpenContact}
      />
    </section>
  );
}

