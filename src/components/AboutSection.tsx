"use client";

import Image from "next/image";
import { Camera, Compass, Award, ShieldCheck, ArrowRight, Heart } from "lucide-react";

interface AboutSectionProps {
  onOpenContact?: () => void;
}

export default function AboutSection({ onOpenContact }: AboutSectionProps) {
  const steps = [
    {
      num: "01",
      title: "Artistic Consultation",
      desc: "Discussing the emotional tone, styling, location, and storytelling intention of your sitting or campaign.",
    },
    {
      num: "02",
      title: "The Editorial Sitting",
      desc: "An unhurried, comfortable atmosphere with natural direction to capture genuine joy, quiet dignity, and human connection.",
    },
    {
      num: "03",
      title: "Hand-Graded Curation",
      desc: "Each frame is meticulously color graded and toned, respecting natural skin and atmospheric texture.",
    },
    {
      num: "04",
      title: "Heirloom Monographs",
      desc: "Delivery of ultra-high-resolution master files, swipe carousels, and gallery-grade print contact sheets.",
    },
  ];

  return (
    <section
      id="about"
      className="relative bg-[#070707] py-24 sm:py-32 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center mb-20">
          {/* Left Column: Portrait & Branding */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-[4px] overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-2xl">
              <Image
                src="/images/portfolio/hero-editorial.jpg"
                alt="Visuals by Nik Creative Director & Photographer"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center filter grayscale contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Monogram Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-black/80 backdrop-blur-md border border-white/10 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#d1a85b]/60 shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="font-serif text-base text-white block">
                    Galleries by Nik
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#d1a85b]">
                    Visual Director & Photographer
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Philosophy */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#d1a85b] font-medium">
                03 / Creative Philosophy
              </span>
              <span className="h-px w-6 bg-[#d1a85b]/40" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f7f5f0] font-normal tracking-tight mb-6 leading-tight">
              &ldquo;Faces, held still, told honestly.&rdquo;
            </h2>

            <div className="space-y-4 text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
              <p>
                Galleries by Nik was founded with a singular conviction: that
                the moments defining human lives—the quiet anticipation of new life,
                the raw joy of milestone birthdays, and the quiet dignity of a
                tailored portrait—deserve to be preserved with cinematic weight.
              </p>
              <p>
                Inspired by the visual scale of high-end advertising and the tactile
                elegance of bento-box editorial monographs, every sitting is approached
                as a collaborative work of art. We honor natural ambient light,
                deliberate composition, and unscripted emotion.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/10">
              <div>
                <span className="font-serif text-3xl text-white font-medium block">
                  100%
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mt-1 block">
                  Bespoke Direction
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl text-[#d1a85b] font-medium block">
                  16K
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mt-1 block">
                  Panoramic Feeds
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl text-white font-medium block">
                  Heirloom
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mt-1 block">
                  Archival Prints
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Process Section */}
        <div className="pt-16 border-t border-white/[0.08]">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#d1a85b] block mb-2">
              The Sitting Experience
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              How We Create Together
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="p-6 rounded-[3px] border border-white/10 bg-[#0c0c0c] flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-[#d1a85b] tracking-widest block mb-4">
                    {step.num}
                  </span>
                  <h4 className="font-serif text-xl text-white font-medium mb-3">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Row */}
          <div className="mt-14 text-center">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-[3px] bg-[#d1a85b] text-black font-semibold text-xs tracking-widest uppercase hover:bg-white transition-all cursor-pointer shadow-lg"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

