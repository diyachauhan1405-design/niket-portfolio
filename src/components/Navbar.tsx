"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#070707]/92 backdrop-blur-md py-3.5 border-b border-white/[0.08] shadow-2xl"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
        {/* Brand identity: User's provided logo + typographic title */}
        <a
          href="#home"
          className="group flex items-center gap-3.5 text-decoration-none"
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/20 bg-black flex items-center justify-center p-0.5 group-hover:border-[#d1a85b]/70 transition-colors duration-300">
            <Image
              src="/images/logo.png"
              alt="Galleries by Nik Logo"
              width={44}
              height={44}
              className="object-cover w-full h-full scale-125"
              preload
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-[18px] sm:text-[20px] tracking-normal text-[#f7f5f0] font-medium leading-tight group-hover:text-[#dfbe7d] transition-colors">
              Galleries by Nik
            </span>
            <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400">
              Visuals by Nik
            </span>
          </div>
        </a>

        {/* Navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-[0.16em] uppercase text-neutral-400">
          <a
            href="#home"
            className="hover:text-white transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#work"
            className="hover:text-[#dfbe7d] transition-colors duration-200"
          >
            Work
          </a>
          <a
            href="#gallery"
            className="hover:text-[#dfbe7d] transition-colors duration-200"
          >
            Print Table
          </a>
          <a
            href="#about"
            className="hover:text-white transition-colors duration-200"
          >
            About
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[2px] bg-white/[0.06] hover:bg-[#d1a85b] hover:text-black border border-white/10 text-neutral-200 text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer"
          >
            <Sparkles size={12} className="text-[#d1a85b]" />
            <span>Book Sitting</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-300 hover:text-white cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 transition-all shadow-2xl">
          <div className="flex flex-col gap-4 text-xs font-mono tracking-widest uppercase">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#dfbe7d] py-2 border-b border-white/5"
            >
              Home
            </a>
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-[#dfbe7d] py-2 border-b border-white/5"
            >
              Work
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-[#dfbe7d] py-2 border-b border-white/5"
            >
              Print Table
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-white py-2 border-b border-white/5"
            >
              About & Philosophy
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left py-2 text-[#d1a85b] font-semibold cursor-pointer"
            >
              Book a Sitting →
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
