"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ParallaxPanels from "@/components/ParallaxPanels";
import PhotoPile from "@/components/PhotoPile";
import AboutSection from "@/components/AboutSection";
import ContactModal from "@/components/ContactModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = () => setContactOpen(true);

  return (
    <main className="min-h-screen bg-black text-[#f2f0eb] relative">
      <Navbar onOpenContact={openContact} />

      {/* Tim Tadder–style: full-screen slideshow, then full-bleed parallax series panels */}
      <Hero
        onExploreClick={() =>
          document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
        }
      />
      <ParallaxPanels onOpenContact={openContact} />

      {/* Jorge Riera Flores–style print pile with Organise / Shuffle */}
      <PhotoPile onOpenContact={openContact} />

      <AboutSection onOpenContact={openContact} />
      <Footer onOpenContact={openContact} />

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
