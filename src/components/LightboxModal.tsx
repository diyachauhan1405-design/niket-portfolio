"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  MapPin,
  Calendar,
  Sparkles,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowRight,
  Sliders,
} from "lucide-react";
import { PortfolioItem } from "@/data/portfolioData";

interface LightboxModalProps {
  items: PortfolioItem[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
  onBookSitting?: () => void;
}

export default function LightboxModal({
  items,
  currentIndex,
  onClose,
  onSelectIndex,
  onBookSitting,
}: LightboxModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [infoOpen, setInfoOpen] = useState<boolean>(true);
  const panoramaContainerRef = useRef<HTMLDivElement>(null);

  const activeItem =
    currentIndex !== null && items[currentIndex] ? items[currentIndex] : null;

  // Keyboard navigation & Esc listener
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onSelectIndex((currentIndex - 1 + items.length) % items.length);
      } else if (e.key === "ArrowRight") {
        onSelectIndex((currentIndex + 1) % items.length);
      } else if (e.key === "i" || e.key === "I") {
        setInfoOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [currentIndex, items, onClose, onSelectIndex]);

  // Reset zoom and scroll on slide change
  useEffect(() => {
    setZoomLevel(1);
    if (panoramaContainerRef.current) {
      panoramaContainerRef.current.scrollLeft = 0;
    }
  }, [currentIndex]);

  if (currentIndex === null || !activeItem) return null;

  const showPrev = () => {
    onSelectIndex((currentIndex - 1 + items.length) % items.length);
  };

  const showNext = () => {
    onSelectIndex((currentIndex + 1) % items.length);
  };

  const scrollPanorama = (direction: "left" | "right") => {
    if (!panoramaContainerRef.current) return;
    const amount = panoramaContainerRef.current.clientWidth * 0.7;
    panoramaContainerRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
      className="fixed inset-0 z-50 bg-[#060606]/98 backdrop-blur-2xl flex flex-col justify-between overflow-hidden text-neutral-200 select-none"
    >
      {/* Top Bar: Brand, Category, Counter, and Controls */}
      <div className="relative z-50 flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-black/40">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#d1a85b]">
            {activeItem.categoryLabel}
          </span>
          <span className="text-neutral-600">•</span>
          <span className="text-xs font-mono text-neutral-400">
            {currentIndex + 1} / {items.length}
          </span>
          {activeItem.badge && (
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider bg-white/10 rounded text-neutral-300">
              {activeItem.badge}
            </span>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          {/* Zoom controls (non-panorama) */}
          {!activeItem.isPanorama && (
            <div className="hidden sm:flex items-center gap-1 border border-white/10 rounded p-1 bg-white/[0.03]">
              <button
                onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
                className="p-1.5 hover:text-white text-neutral-400 transition-colors"
                title="Zoom Out"
                disabled={zoomLevel <= 1}
              >
                <ZoomOut size={15} />
              </button>
              <span className="text-[10px] font-mono px-1 text-neutral-400">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                className="p-1.5 hover:text-white text-neutral-400 transition-colors"
                title="Zoom In"
                disabled={zoomLevel >= 2.5}
              >
                <ZoomIn size={15} />
              </button>
              {zoomLevel > 1 && (
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 hover:text-white text-neutral-400"
                  title="Reset Zoom"
                >
                  <RotateCcw size={13} />
                </button>
              )}
            </div>
          )}

          {/* Toggle Info Panel */}
          <button
            onClick={() => setInfoOpen(!infoOpen)}
            className={`p-2 rounded text-xs tracking-wider uppercase font-mono transition-colors ${
              infoOpen
                ? "bg-white/15 text-white"
                : "bg-white/[0.04] text-neutral-400 hover:text-white"
            }`}
            title="Toggle Details (Key: I)"
          >
            <Sliders size={16} />
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] rounded transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Stage: Left/Right arrows + Centered Image */}
      <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
        {/* Navigation Previous */}
        <button
          onClick={showPrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 p-3.5 text-neutral-300 hover:text-white bg-black/60 hover:bg-[#d1a85b] hover:text-black rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 cursor-pointer group shadow-xl"
          aria-label="Previous image"
        >
          <ChevronLeft
            size={22}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
        </button>

        {/* Navigation Next */}
        <button
          onClick={showNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 p-3.5 text-neutral-300 hover:text-white bg-black/60 hover:bg-[#d1a85b] hover:text-black rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 cursor-pointer group shadow-xl"
          aria-label="Next image"
        >
          <ChevronRight
            size={22}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </button>

        {/* IMAGE DISPLAY CONTAINER */}
        {activeItem.isPanorama ? (
          /* Specialized Panoramic Continuous Multi-Frame View */
          <div className="relative w-full max-w-6xl h-[65vh] sm:h-[72vh] flex flex-col items-center">
            <div className="text-[11px] font-mono text-neutral-400 mb-2 flex items-center gap-3">
              <span className="text-[#d1a85b]">PANORAMIC CAROUSEL SPREAD</span>
              <span>•</span>
              <span>Drag / Scroll horizontally to explore full 5 frames</span>
              <div className="inline-flex gap-1">
                <button
                  onClick={() => scrollPanorama("left")}
                  className="px-2 py-0.5 bg-white/10 hover:bg-white/20 rounded text-[10px]"
                >
                  ◀ Scroll
                </button>
                <button
                  onClick={() => scrollPanorama("right")}
                  className="px-2 py-0.5 bg-white/10 hover:bg-white/20 rounded text-[10px]"
                >
                  Scroll ▶
                </button>
              </div>
            </div>

            <div
              ref={panoramaContainerRef}
              className="w-full h-full overflow-x-auto overflow-y-hidden rounded border border-white/10 bg-[#0a0a0a] shadow-2xl scrollbar-thin scroll-smooth flex items-center"
            >
              <div className="relative h-full min-w-[220%] sm:min-w-[180%] lg:min-w-[140%] flex items-center">
                <Image
                  src={activeItem.src}
                  alt={activeItem.title}
                  fill
                  preload
                  className="object-contain"
                  sizes="(max-width: 1200px) 150vw, 120vw"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Standard and Contact Sheet Image Display */
          <div className="relative w-full max-w-5xl h-[62vh] sm:h-[74vh] flex items-center justify-center">
            <div
              className="relative w-full h-full flex items-center justify-center transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <Image
                src={activeItem.src}
                alt={activeItem.title}
                fill
                preload
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                sizes="(max-width: 1024px) 95vw, 85vw"
              />
            </div>
          </div>
        )}
      </div>

      {/* Info & Story Drawer (Collapsible) */}
      {infoOpen && (
        <div className="relative z-40 border-t border-white/[0.08] bg-[#090909]/95 backdrop-blur-xl px-6 py-4 transition-all duration-300">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                  {activeItem.title}
                </h3>
                <span className="text-neutral-500">•</span>
                <span className="text-xs font-mono text-neutral-400">
                  {activeItem.subtitle}
                </span>
              </div>

              {activeItem.quote && (
                <p className="text-xs italic text-[#dfbe7d] font-serif mt-1">
                  &ldquo;{activeItem.quote}&rdquo;
                </p>
              )}

              <p className="text-xs text-neutral-300 font-light mt-1.5 leading-relaxed line-clamp-2 md:line-clamp-none">
                {activeItem.description}
              </p>
            </div>

            {/* Technical Metadata Pills */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-neutral-400 shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-6">
              <div className="flex items-center gap-1.5">
                <Camera size={13} className="text-[#d1a85b]" />
                <span>{activeItem.gear}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="text-[#d1a85b]" />
                <span>{activeItem.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={13} className="text-neutral-500" />
                <span>{activeItem.year}</span>
              </div>

              {onBookSitting && (
                <button
                  onClick={() => {
                    onClose();
                    onBookSitting();
                  }}
                  className="ml-auto md:ml-2 px-3 py-1.5 rounded-[2px] bg-[#d1a85b] text-black text-[11px] font-mono uppercase tracking-wider font-semibold hover:bg-white transition-colors"
                >
                  Inquire
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Filmstrip Thumbnails (Jorge Riera Flores & Tim Tadder visual timeline) */}
      <div className="relative z-30 px-6 py-2.5 bg-black border-t border-white/[0.06] overflow-x-auto scrollbar-none flex items-center gap-2">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => onSelectIndex(idx)}
            className={`relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded overflow-hidden border transition-all cursor-pointer ${
              idx === currentIndex
                ? "border-[#d1a85b] ring-2 ring-[#d1a85b]/40 scale-105 opacity-100"
                : "border-white/10 opacity-40 hover:opacity-80"
            }`}
            title={item.title}
          >
            <Image
              src={item.thumb}
              alt={item.title}
              fill
              className="object-cover"
              sizes="56px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

