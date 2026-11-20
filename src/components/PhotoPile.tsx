"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { PORTFOLIO_ITEMS, PortfolioItem } from "@/data/portfolioData";
import LightboxModal from "./LightboxModal";

type Mode = "pile" | "grid";

interface CardPos {
  x: number;
  y: number;
  rot: number;
  z: number;
}

const ITEMS = PORTFOLIO_ITEMS;
const PAD = 10; // white print border
const CAPTION = 26; // caption strip under the photo
const GAP = 28;

/** Image area ratio (height / width) for each print. */
function imageRatio(item: PortfolioItem) {
  if (item.aspectRatio === "panorama") return 0.25;
  if (item.aspectRatio === "square") return 1;
  return 1.25; // 4:5 portrait
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function shuffled<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface PhotoPileProps {
  onOpenContact?: () => void;
}

/**
 * Jorge Riera Flores–style print table: photos scattered as a draggable pile
 * ("Shuffle") or squared up into a neat grid ("Organise").
 */
interface Seed {
  rx: number; // -1..1 horizontal scatter
  ry: number; // -1..1 vertical scatter
  rot: number; // degrees
  z: number; // stacking order
}

function makeSeeds(): Seed[] {
  const order = shuffled(ITEMS.map((_, i) => i));
  const seeds: Seed[] = [];
  order.forEach((itemIdx, stackIdx) => {
    seeds[itemIdx] = { rx: rand(-1, 1), ry: rand(-1, 1), rot: rand(-13, 13), z: stackIdx + 1 };
  });
  return seeds;
}

export default function PhotoPile({ onOpenContact }: PhotoPileProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [mode, setMode] = useState<Mode>("pile");
  // Cards only render after the stage is measured on the client, so these
  // random seeds never appear in server HTML (no hydration mismatch).
  const [seeds, setSeeds] = useState<Seed[]>(makeSeeds);
  // Positions/z set by dragging; cleared on Shuffle / Organise.
  const [manual, setManual] = useState<Record<number, { x: number; y: number }>>({});
  const [zs, setZs] = useState<Record<number, number>>({});
  const [dragging, setDragging] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const topZ = useRef(ITEMS.length);
  const drag = useRef<{
    i: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    moved: boolean;
  } | null>(null);

  const cardW = width < 640 ? 132 : width < 1024 ? 170 : 200;
  const gap = width < 640 ? 14 : GAP;
  const isPano = (item: PortfolioItem) => item.aspectRatio === "panorama";
  const cardWidth = (item: PortfolioItem) => (isPano(item) ? cardW * 2 + gap : cardW);
  const imageHeight = (item: PortfolioItem) =>
    (cardWidth(item) - PAD * 2) * imageRatio(item);
  const heightOf = (item: PortfolioItem) => PAD * 2 + imageHeight(item) + CAPTION;

  // ---- Layouts (derived from width, mode and seeds) -------------------
  let base: CardPos[] = [];
  let stageHeight = width < 640 ? 520 : 620;

  if (width > 0 && mode === "pile") {
    const spreadX = Math.min(width * 0.32, 420);
    const spreadY = stageHeight * 0.22;
    // Keep every print (mostly) on the table, even on narrow screens.
    const clampX = (x: number, w: number) =>
      Math.min(Math.max(x, -w * 0.08), width - w * 0.92);
    base = ITEMS.map((item, i) => ({
      x: clampX(width / 2 - cardWidth(item) / 2 + seeds[i].rx * spreadX, cardWidth(item)),
      y: stageHeight / 2 - heightOf(item) / 2 + seeds[i].ry * spreadY,
      rot: seeds[i].rot,
      z: seeds[i].z,
    }));
  } else if (width > 0) {
    const cols = Math.max(2, Math.min(6, Math.floor((width + gap) / (cardW + gap))));
    const rowH = PAD * 2 + (cardW - PAD * 2) * 1.25 + CAPTION;
    const left = (width - (cols * cardW + (cols - 1) * gap)) / 2;
    let col = 0;
    let row = 0;
    // Flow items into cells; panoramas take two cells side by side.
    base = ITEMS.map((item, i) => {
      const span = isPano(item) ? 2 : 1;
      if (col + span > cols) {
        col = 0;
        row++;
      }
      const pos = {
        x: left + col * (cardW + gap),
        y: row * (rowH + gap) + (rowH - heightOf(item)) / 2,
        rot: 0,
        z: i + 1,
      };
      col += span;
      return pos;
    });
    stageHeight = (row + 1) * (rowH + gap) - gap;
  }

  const positions = base.map((p, i) => ({
    ...p,
    ...(manual[i] ?? {}),
    z: zs[i] ?? p.z,
  }));

  // Measure the stage.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const resetManual = () => {
    setManual({});
    setZs({});
    topZ.current = ITEMS.length;
  };

  const shuffle = () => {
    setSeeds(makeSeeds());
    setMode("pile");
    resetManual();
  };

  const organise = () => {
    setMode("grid");
    resetManual();
  };

  // ---- Dragging -------------------------------------------------------
  const onPointerDown = (e: React.PointerEvent, i: number) => {
    // On touch in grid mode, let the page scroll instead of dragging.
    if (e.pointerType !== "mouse" && mode === "grid") return;
    if (e.button !== 0) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const z = ++topZ.current;
    setZs((prev) => ({ ...prev, [i]: z }));
    drag.current = {
      i,
      startX: e.clientX,
      startY: e.clientY,
      originX: positions[i].x,
      originY: positions[i].y,
      moved: false,
    };
    setDragging(i);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.moved && Math.hypot(dx, dy) < 4) return;
    d.moved = true;
    setManual((prev) => ({ ...prev, [d.i]: { x: d.originX + dx, y: d.originY + dy } }));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    setDragging(null);
    // A tap (no drag) on touch opens the photo; mice use double-click.
    if (d && !d.moved && e.pointerType !== "mouse") setLightbox(d.i);
  };

  const ready = width > 0;

  return (
    <section id="gallery" className="relative bg-[#111] py-24 sm:py-32 overflow-hidden">
      <div className="text-center px-4 mb-10 sm:mb-14">
        <h2 className="font-display font-extralight uppercase text-white text-[clamp(1.6rem,5vw,3.4rem)] tracking-[0.08em] leading-tight">
          - The Print Table -
        </h2>
        <p className="mt-3 text-sm text-neutral-400 font-light">
          Every frame, laid out on the table.
        </p>
      </div>

      <div className="px-4 sm:px-8 max-w-[1400px] mx-auto">
        <div
          ref={stageRef}
          className="relative w-full transition-[height] duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
          style={{ height: stageHeight }}
        >
          {ready &&
            ITEMS.map((item, i) => {
              const pos = positions[i];
              const w = cardWidth(item);
              const isDragging = dragging === i;
              return (
                <div
                  key={item.id}
                  onPointerDown={(e) => onPointerDown(e, i)}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                  onDoubleClick={() => setLightbox(i)}
                  className={`absolute top-0 left-0 select-none bg-[#fafaf7] ${
                    mode === "pile" ? "touch-none" : "touch-pan-y"
                  } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                  style={{
                    width: w,
                    height: heightOf(item),
                    padding: PAD,
                    zIndex: pos.z,
                    transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${pos.rot}deg) scale(${isDragging ? 1.04 : 1})`,
                    transition: isDragging
                      ? "transform 120ms ease-out, box-shadow 200ms"
                      : `transform 800ms cubic-bezier(.2,.8,.2,1) ${(i % 12) * 18}ms, box-shadow 300ms`,
                    boxShadow: isDragging
                      ? "0 30px 60px rgba(0,0,0,.55)"
                      : "0 10px 28px rgba(0,0,0,.45)",
                  }}
                >
                  <div
                    className="relative w-full bg-neutral-200 overflow-hidden"
                    style={{ height: imageHeight(item) }}
                  >
                    <Image
                      src={item.thumb}
                      alt={item.title}
                      fill
                      draggable={false}
                      sizes={item.aspectRatio === "panorama" ? "440px" : "220px"}
                      className="object-cover pointer-events-none"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1.5 text-[8px] sm:text-[9px] leading-none text-neutral-600 font-sans">
                    <span className="flex items-center gap-0.5 truncate">
                      <MapPin size={8} className="shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </span>
                    <span className="shrink-0 text-neutral-400">{item.year}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="relative z-[60] mt-10 sm:mt-14 flex flex-col items-center gap-5 px-4">
        <p className="text-sm text-neutral-300 text-center">
          <span className="hidden sm:inline">Move things around. Double-click for a closer look.</span>
          <span className="sm:hidden">Drag prints around. Tap one for a closer look.</span>
        </p>
        <div className="flex gap-3">
          <button
            onClick={organise}
            aria-pressed={mode === "grid"}
            className={`min-w-[120px] px-6 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              mode === "grid"
                ? "bg-white text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Organise
          </button>
          <button
            onClick={shuffle}
            aria-pressed={mode === "pile"}
            className={`min-w-[120px] px-6 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              mode === "pile"
                ? "bg-white text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Shuffle
          </button>
        </div>
      </div>

      <LightboxModal
        items={ITEMS}
        currentIndex={lightbox}
        onClose={() => setLightbox(null)}
        onSelectIndex={setLightbox}
        onBookSitting={onOpenContact}
      />
    </section>
  );
}
