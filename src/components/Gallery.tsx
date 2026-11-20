"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Maximize2,
  LayoutGrid,
  Rows,
  Layers,
  Sparkles,
  Camera,
  MapPin,
  ArrowRight,
  Focus,
  Film,
  Compass,
} from "lucide-react";
import {
  PORTFOLIO_ITEMS,
  CATEGORIES,
  PortfolioItem,
} from "@/data/portfolioData";
import LightboxModal from "./LightboxModal";

type ViewMode = "bento" | "feed" | "contact";

interface GalleryProps {
  onOpenContact?: () => void;
}

export default function Gallery({ onOpenContact }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("bento");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter items based on active category
  const filteredItems =
    activeCategory === "all"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (item: PortfolioItem) => {
    const idx = filteredItems.findIndex((i) => i.id === item.id);
    setLightboxIndex(idx !== -1 ? idx : 0);
  };

  return (
    <section
      id="gallery"
      className="relative bg-[#070707] py-24 sm:py-32 border-t border-white/[0.08]"
    >
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#d1a85b]/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-neutral-800/[0.06] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header: Jorge Riera Flores Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#d1a85b] font-medium">
                01 / Portfolio Catalog
              </span>
              <span className="h-px w-6 bg-[#d1a85b]/40" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f7f5f0] font-normal tracking-tight">
              Curated Works & Series
            </h2>
            <p className="text-neutral-400 font-light text-sm sm:text-base mt-2 max-w-xl">
              From intimate maternity monographs to technical viewfinder studies
              and expansive 16K panoramic carousels.
            </p>
          </div>

          {/* Controls: View Mode Switcher (Bento vs. Cinematic Feed vs. Contact Sheets) */}
          <div className="flex items-center gap-2 bg-[#121212] border border-white/10 rounded p-1 self-start lg:self-auto">
            <button
              onClick={() => setViewMode("bento")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                viewMode === "bento"
                  ? "bg-[#f7f5f0] text-black font-medium shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
              title="Modular Bento Grid (Jorge Riera Flores Style)"
            >
              <LayoutGrid size={14} />
              <span className="hidden sm:inline">Bento Grid</span>
            </button>

            <button
              onClick={() => setViewMode("feed")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                viewMode === "feed"
                  ? "bg-[#f7f5f0] text-black font-medium shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
              title="Stacked Editorial Feed (Tim Tadder Style)"
            >
              <Rows size={14} />
              <span className="hidden sm:inline">Cinematic Feed</span>
            </button>

            <button
              onClick={() => setViewMode("contact")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                viewMode === "contact"
                  ? "bg-[#f7f5f0] text-black font-medium shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
              title="Contact Sheets & Sheets Only"
            >
              <Layers size={14} />
              <span className="hidden sm:inline">Sheets & HUDs</span>
            </button>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none border-b border-white/[0.06]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs font-mono tracking-wider uppercase px-4 py-2 rounded-[2px] transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeCategory === cat.id
                  ? "bg-[#f7f5f0] text-black font-semibold shadow-md"
                  : "bg-[#101010] text-neutral-400 hover:text-white hover:bg-neutral-800/60 border border-white/5"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === cat.id
                    ? "bg-black/15 text-black"
                    : "bg-white/10 text-neutral-400"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* ---------------------------------------------------- */}
        {/* VIEW 1: BENTO-BOX MODULAR GRID (Jorge Riera Flores) */}
        {/* ---------------------------------------------------- */}
        {viewMode === "bento" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 auto-rows-[340px] sm:auto-rows-[380px]">
            {filteredItems.map((item, index) => {
              // Special bento span rules
              const isPanorama = item.isPanorama;
              const isLarge = item.id === "maternity-triptych" || item.id === "family-autumn-canopy";

              return (
                <div
                  key={item.id}
                  onClick={() => openLightbox(item)}
                  className={`group relative rounded-[4px] overflow-hidden bg-[#0d0d0d] border border-white/[0.08] hover:border-[#d1a85b]/60 transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:-translate-y-1 ${
                    isPanorama
                      ? "col-span-1 md:col-span-2 row-span-1"
                      : isLarge
                      ? "col-span-1 md:col-span-1 lg:col-span-1 row-span-2"
                      : "col-span-1 row-span-1"
                  }`}
                >
                  {/* Background Image Container */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={item.thumb}
                      alt={item.title}
                      fill
                      sizes={
                        isPanorama
                          ? "(max-width: 1024px) 100vw, 66vw"
                          : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      }
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30 group-hover:via-black/20 transition-all duration-300" />
                  </div>

                  {/* Top Badge & Category */}
                  <div className="relative z-10 p-5 flex items-start justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-wider uppercase text-neutral-300">
                        {item.categoryLabel}
                      </span>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded bg-[#d1a85b]/20 border border-[#d1a85b]/30 text-[10px] font-mono uppercase text-[#e6cb95]">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-[#d1a85b] transition-colors">
                      <Maximize2 size={13} />
                    </div>
                  </div>

                  {/* Technical Viewfinder Reticle Overlay (if item isViewfinder) */}
                  {item.isViewfinder && (
                    <div className="absolute inset-8 pointer-events-none z-10 border border-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-8 h-8 border border-yellow-400/80 rounded-sm relative flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                      </div>
                      <span className="absolute top-2 left-2 text-[9px] font-mono text-yellow-400">
                        RAW • AF-C
                      </span>
                      <span className="absolute bottom-2 right-2 text-[9px] font-mono text-yellow-400">
                        [ + ]
                      </span>
                    </div>
                  )}

                  {/* Special Panorama Indicator (if item isPanorama) */}
                  {isPanorama && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-[#d1a85b]/60 text-xs font-mono tracking-widest uppercase text-neutral-200 flex items-center gap-2 shadow-2xl">
                        <Compass size={14} className="text-[#d1a85b]" />
                        <span>Interactive 5-Frame Spread</span>
                      </div>
                    </div>
                  )}

                  {/* Bottom Meta & Story Details */}
                  <div className="relative z-10 p-5 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-medium group-hover:text-[#dfbe7d] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-300 font-light mt-1 line-clamp-1">
                      {item.subtitle}
                    </p>

                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mt-3 pt-3 border-t border-white/10">
                      <span className="flex items-center gap-1.5">
                        <Camera size={12} className="text-[#d1a85b]" />
                        <span className="truncate max-w-[180px]">
                          {item.gear}
                        </span>
                      </span>
                      <span>{item.year}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 2: CINEMATIC FEED (Tim Tadder Stacked Campaign) */}
        {/* ---------------------------------------------------- */}
        {viewMode === "feed" && (
          <div className="flex flex-col gap-20 sm:gap-28">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(item)}
                className="group relative cursor-pointer border border-white/[0.08] bg-[#090909] rounded-[4px] overflow-hidden hover:border-[#d1a85b]/50 transition-all duration-500"
              >
                {/* Full-Bleed High-Res Visual Frame */}
                <div
                  className={`relative w-full overflow-hidden bg-neutral-950 ${
                    item.isPanorama
                      ? "aspect-[21/9]"
                      : item.aspectRatio === "square"
                      ? "aspect-[16/10]"
                      : "aspect-[16/11] sm:aspect-[16/9]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover object-center transition-transform duration-1000 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Click to Expand Floating CTA */}
                  <div className="absolute bottom-6 right-6 z-20">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs font-mono uppercase tracking-widest text-[#d1a85b] group-hover:bg-[#d1a85b] group-hover:text-black transition-all">
                      <Maximize2 size={13} />
                      <span>Expand View</span>
                    </span>
                  </div>
                </div>

                {/* Editorial Story Bar */}
                <div className="p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-white/[0.06]">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#d1a85b]">
                        {item.categoryLabel}
                      </span>
                      <span className="text-neutral-600">•</span>
                      <span className="text-xs font-mono text-neutral-400">
                        {item.clientOrConcept}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium group-hover:text-[#dfbe7d] transition-colors">
                      {item.title}
                    </h3>

                    {item.quote && (
                      <p className="text-sm italic text-[#dfbe7d] font-serif mt-2">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    )}

                    <p className="text-sm text-neutral-300 font-light mt-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Metadata Specs Column */}
                  <div className="flex flex-col gap-2 shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8 text-xs font-mono text-neutral-400">
                    <div className="flex items-center gap-2">
                      <Camera size={14} className="text-[#d1a85b]" />
                      <span>{item.gear}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[#d1a85b]" />
                      <span>{item.location}</span>
                    </div>
                    <div className="text-neutral-500">{item.year}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 3: CONTACT SHEETS & HUDS ONLY */}
        {/* ---------------------------------------------------- */}
        {viewMode === "contact" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems
              .filter(
                (item) =>
                  item.isContactSheet ||
                  item.isViewfinder ||
                  item.category === "panoramas"
              )
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(item)}
                  className="group relative cursor-pointer border border-white/10 bg-[#0d0d0d] rounded-[3px] overflow-hidden hover:border-[#d1a85b] transition-all duration-300"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                    <Image
                      src={item.thumb}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
                      {item.badge || "Study"}
                    </div>
                  </div>

                  <div className="p-4 border-t border-white/10">
                    <h3 className="font-serif text-lg text-white font-medium group-hover:text-[#dfbe7d] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono mt-1">
                      {item.gear}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Bottom Booking Banner (Tim Tadder commercial callout) */}
        <div className="mt-20 p-8 sm:p-12 rounded-[4px] border border-white/10 bg-[#0c0c0c] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#d1a85b] font-medium block mb-2">
              Commission & Sittings
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Planning a maternity monograph or editorial campaign?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light mt-2 leading-relaxed">
              Every sitting is tailored with bespoke art direction, natural
              light grading, and optional multi-frame editorial monograph cards.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[3px] bg-[#d1a85b] text-black font-semibold text-xs tracking-wider uppercase hover:bg-white transition-colors cursor-pointer shrink-0"
          >
            <span>Inquire About Availability</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
        onBookSitting={onOpenContact}
      />
    </section>
  );
}
