"use client";

import { useEffect, useRef } from "react";

/**
 * Tim Tadder–style parallax: the image inside a full-bleed panel drifts
 * slower than the page, so each photo appears to slide out from under the next.
 *
 * Attach `containerRef` to the clipping panel and `targetRef` to the oversized
 * image wrapper. `strength` is the fraction of viewport height the image travels.
 */
export function useParallax<
  C extends HTMLElement = HTMLDivElement,
  T extends HTMLElement = HTMLDivElement,
>(strength = 0.25) {
  const containerRef = useRef<C>(null);
  const targetRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduce.matches) {
        target.style.transform = "translate3d(0,0,0)";
        return;
      }
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -50 || rect.top > vh + 50) return; // off-screen
      // 0 when the panel's top enters at the bottom, 1 when its bottom leaves at the top
      const progress = (vh - rect.top) / (vh + rect.height);
      const offset = (progress - 0.5) * vh * strength;
      target.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return { containerRef, targetRef };
}
