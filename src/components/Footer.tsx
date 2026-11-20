"use client";

import Image from "next/image";
import { ArrowUp, Mail, Sparkles } from "lucide-react";

interface FooterProps {
  onOpenContact: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.08] text-neutral-400 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 pb-14 border-b border-white/[0.06]">
          {/* Logo & Monogram */}
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#d1a85b]/50 bg-black p-0.5">
              <Image
                src="/images/logo.png"
                alt="Galleries by Nik"
                width={48}
                height={48}
                className="object-cover w-full h-full scale-125"
              />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl text-[#f7f5f0] font-medium tracking-tight block">
                Galleries by Nik
              </span>
              <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-neutral-500">
                Visuals by Nik • Fine Art & Editorial
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-8 text-xs font-mono tracking-widest uppercase">
            <a href="#home" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="#work" className="hover:text-white transition-colors">
              Work
            </a>
            <a href="#gallery" className="hover:text-white transition-colors">
              Print Table
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <button
              onClick={onOpenContact}
              className="text-[#d1a85b] hover:text-white transition-colors cursor-pointer"
            >
              Book Sitting
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 border border-white/10 rounded-full hover:border-[#d1a85b] hover:text-[#d1a85b] transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Taglines */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} Galleries by Nik. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Based in Lisbon & Toronto</span>
            <span>•</span>
            <span className="text-[#d1a85b]">Available Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
