export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  category: "editorial" | "maternity" | "milestones" | "panoramas";
  categoryLabel: string;
  src: string;
  thumb: string;
  aspectRatio: "portrait" | "landscape" | "square" | "tall" | "panorama";
  bentoClass: string; // Tailwind grid span
  location: string;
  gear: string;
  year: string;
  clientOrConcept: string;
  description: string;
  isPanorama?: boolean;
  isViewfinder?: boolean;
  isContactSheet?: boolean;
  badge?: string;
  quote?: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // 1. Hero Feature / Maternity Triptych
  {
    id: "maternity-triptych",
    title: "Triptych of Wonder",
    subtitle: "Three-Act Maternity Narrative",
    category: "maternity",
    categoryLabel: "Maternity & New Life",
    src: "/images/portfolio/maternity-triptych-02.jpg",
    thumb: "/images/portfolio/thumbs/maternity-triptych-02.jpg",
    aspectRatio: "portrait",
    bentoClass: "col-span-1 md:col-span-2 lg:col-span-1 row-span-2",
    location: "Park Meadow Sanctuary",
    gear: "85mm f/1.4 • Natural Ambient Light",
    year: "2024",
    clientOrConcept: "Private Maternity Sitting",
    description:
      "A three-part narrative poem capturing the expectation of life: the vibrant couple embracing in the sunlit meadow, the intimate sonogram flatlay with baby booties, and a quiet monochrome park bench reflection.",
    badge: "Narrative Triptych",
  },

  // 2. Editorial Viewfinder HUD
  {
    id: "editorial-viewfinder",
    title: "Viewfinder 01: Captured",
    subtitle: "Optical HUD Framing Study",
    category: "editorial",
    categoryLabel: "Editorial & Portraits",
    src: "/images/portfolio/editorial-viewfinder-hud.jpg",
    thumb: "/images/portfolio/thumbs/editorial-viewfinder-hud.jpg",
    aspectRatio: "portrait",
    bentoClass: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    location: "Meadow Reserve",
    gear: "35mm Prime • HUD Overlay",
    year: "2024",
    clientOrConcept: "Visuals by Nik Editorial",
    description:
      "Blending technical optical crosshairs with candid spontaneous joy. The composition places the subject within a documentary camera focus reticle.",
    isViewfinder: true,
    badge: "HUD Study",
  },

  // 3. Wide Fashion Carousel Spread
  {
    id: "panorama-fashion",
    title: "Court & Autumn Fashion Spread",
    subtitle: "Continuous 5-Panel Panoramic Editorial",
    category: "panoramas",
    categoryLabel: "Panoramic Spreads",
    src: "/images/portfolio/panorama-fashion-carousel.jpg",
    thumb: "/images/portfolio/thumbs/panorama-fashion-carousel.jpg",
    aspectRatio: "panorama",
    bentoClass: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1",
    location: "Private Athletic Club & Estate",
    gear: "Medium Format • 50mm & 85mm Prime",
    year: "2024",
    clientOrConcept: "Editorial Fashion Series",
    description:
      "An expansive panoramic multi-panel spread designed for uninterrupted editorial sequencing. Contrasting regal violet silks with crisp athletic green courts and rich amber autumn foliage.",
    isPanorama: true,
    badge: "5-Frame Swipe Spread",
  },

  // 4. Our Miracle Maternity
  {
    id: "maternity-miracle",
    title: "Our Miracle — The Expectation",
    subtitle: "Fine Art Maternity Monograph",
    category: "maternity",
    categoryLabel: "Maternity & New Life",
    src: "/images/portfolio/maternity-miracle-01.jpg",
    thumb: "/images/portfolio/thumbs/maternity-miracle-01.jpg",
    aspectRatio: "portrait",
    bentoClass: "col-span-1 md:col-span-1 lg:col-span-1 row-span-2",
    location: "Emerald Meadow Grounds",
    gear: "Sony FE 85mm f/1.4 GM",
    year: "2024",
    clientOrConcept: "Editorial Maternity Card",
    description:
      "A mother's heart begins loving her child long before the first embrace. Bathed in soft outdoor light, sitting gracefully in a flowing scarlet gown with sonogram and rustic lantern accents.",
    quote: "A mother's heart begins loving her child long before the first embrace.",
    badge: "Monograph",
  },

  // 5. Tailored Monochrome Suits
  {
    id: "editorial-suits",
    title: "The Tailored Study",
    subtitle: "6-Frame Monochrome Contact Sheet",
    category: "editorial",
    categoryLabel: "Editorial & Portraits",
    src: "/images/portfolio/editorial-monochrome-suits.jpg",
    thumb: "/images/portfolio/thumbs/editorial-monochrome-suits.jpg",
    aspectRatio: "portrait",
    bentoClass: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    location: "Niket Studio One",
    gear: "High Key Studio Strobe • 50mm Summicron",
    year: "2024",
    clientOrConcept: "Editorial Portrait Sitting",
    description:
      "A clean, graphic 6-up contact sheet capturing candid transitions of confidence, laughter, and sharp tailored elegance in classic monochrome chiaroscuro.",
    isContactSheet: true,
    badge: "Contact Sheet",
  },

  // 6. Camera Interface HUD
  {
    id: "editorial-camera-hud",
    title: "Cinematic Shutter HUD",
    subtitle: "Camera Interface Monograph",
    category: "editorial",
    categoryLabel: "Editorial & Portraits",
    src: "/images/portfolio/editorial-camera-interface.jpg",
    thumb: "/images/portfolio/thumbs/editorial-camera-interface.jpg",
    aspectRatio: "portrait",
    bentoClass: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    location: "Open Field Reserve",
    gear: "Cinematic Mode • 1/500s f/2.0",
    year: "2024",
    clientOrConcept: "Creative Concept Series",
    description:
      "Reimagining the photographer's viewfinder interface as an artistic graphic border, contrasting the raw, joyful sitting with tactile digital tools.",
    isViewfinder: true,
    badge: "Camera HUD",
  },

  // 7. Golden Celebration Panorama
  {
    id: "panorama-golden",
    title: "The Golden Celebration",
    subtitle: "Panoramic Swipe Story (16,875px)",
    category: "panoramas",
    categoryLabel: "Panoramic Spreads",
    src: "/images/portfolio/panorama-golden-celebration.jpg",
    thumb: "/images/portfolio/thumbs/panorama-golden-celebration.jpg",
    aspectRatio: "panorama",
    bentoClass: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1",
    location: "Private Celebration Loft",
    gear: "35mm & 50mm Prime • Continuous Panorama",
    year: "2024",
    clientOrConcept: "Milestone Celebration Story",
    description:
      "A continuous five-frame storytelling spread capturing the laughter, toast, polaroid memories, and joyous countdown of a milestone birthday celebration.",
    isPanorama: true,
    badge: "Panoramic Sequence",
  },

  // 8. Polaroid Toddler Sheet
  {
    id: "polaroid-toddler",
    title: "Generations & Joy — 20-Frame Sheet",
    subtitle: "Toddler Studio Sitting Contact Sheet",
    category: "milestones",
    categoryLabel: "Celebrations & Milestones",
    src: "/images/portfolio/polaroid-toddler-sheet.jpg",
    thumb: "/images/portfolio/thumbs/polaroid-toddler-sheet.jpg",
    aspectRatio: "portrait",
    bentoClass: "col-span-1 md:col-span-1 lg:col-span-1 row-span-2",
    location: "Galleries by Nik Studio",
    gear: "Studio Softbox • High-speed Strobe",
    year: "2024",
    clientOrConcept: "First Birthday Milestone Sitting",
    description:
      "Twenty miniature polaroid frames documenting the boundless joy, regal royal attire, and sparkling laughter of a little prince's first year.",
    isContactSheet: true,
    badge: "20-Frame Sheet",
  },

  // 9. Gender Reveal Stars
  {
    id: "gender-reveal-stars",
    title: "The Reveal — Blue Horizon",
    subtitle: "Three-Tier Celebration Monograph",
    category: "milestones",
    categoryLabel: "Celebrations & Milestones",
    src: "/images/portfolio/gender-reveal-stars-02.jpg",
    thumb: "/images/portfolio/thumbs/gender-reveal-stars-02.jpg",
    aspectRatio: "portrait",
    bentoClass: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    location: "Celebration Hall",
    gear: "24-70mm f/2.8 GM • Warm Event Tone",
    year: "2024",
    clientOrConcept: "Baby Gender Reveal Event",
    description:
      "That pure, unscripted second when the box opens and blue star balloons take flight. High-energy warmth, emotion, and cherished family memory.",
    badge: "Milestone Reveal",
  },

  // 10. Shoreline Maternity
  {
    id: "maternity-shoreline",
    title: "Coming Soon — By the Water",
    subtitle: "Lakeside Twilight Maternity Sitting",
    category: "maternity",
    categoryLabel: "Maternity & New Life",
    src: "/images/portfolio/maternity-shore-04.jpg",
    thumb: "/images/portfolio/thumbs/maternity-shore-04.jpg",
    aspectRatio: "portrait",
    bentoClass: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    location: "Lake Ontario Shoreline",
    gear: "70-200mm f/2.8 • Twilight Horizon",
    year: "2024",
    clientOrConcept: "Outdoor Maternity Editorial",
    description:
      "Gentle lake breezes and pastel evening waters frame an intimate maternity portrait. 'The smallest feet leave the biggest footprints on our hearts.'",
    quote: "The smallest feet leave the biggest footprints on our hearts.",
    badge: "Twilight Sitting",
  },

  // 11. Love Beyond Imagination
  {
    id: "maternity-quad",
    title: "Love Beyond Every Imagination",
    subtitle: "Quad-Frame Editorial Monograph",
    category: "maternity",
    categoryLabel: "Maternity & New Life",
    src: "/images/portfolio/maternity-quad-03.jpg",
    thumb: "/images/portfolio/thumbs/maternity-quad-03.jpg",
    aspectRatio: "portrait",
    bentoClass: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    location: "Botanical Arboretum",
    gear: "85mm f/1.4 • Dual Color & B&W Grade",
    year: "2024",
    clientOrConcept: "Fine Art Maternity",
    description:
      "Combining deep monochrome tone studies with the warmth of royal blue and terracotta velvet on sunlit greens.",
    badge: "Quad Monograph",
  },

  // 12. Waiting for Our Miracle
  {
    id: "maternity-waiting",
    title: "Waiting for Our Precious Miracle",
    subtitle: "Beachside Sunset Montage",
    category: "maternity",
    categoryLabel: "Maternity & New Life",
    src: "/images/portfolio/maternity-waiting-05.jpg",
    thumb: "/images/portfolio/thumbs/maternity-waiting-05.jpg",
    aspectRatio: "portrait",
    bentoClass: "col-span-1 md:col-span-1 lg:col-span-1 row-span-2",
    location: "Waterfront Shoreline",
    gear: "50mm f/1.2 • Golden Hour",
    year: "2024",
    clientOrConcept: "Sunset Maternity Monograph",
    description:
      "With every tiny heartbeat, our hearts discover a deeper kind of love. A multi-layered editorial collage celebrating devotion by the calm waters.",
    badge: "Shoreline Collage",
  },

  // 13. Chapter 18 Quad
  {
    id: "celebration-chapter18",
    title: "Chapter 18 — Making Memories",
    subtitle: "Quad Cinematic Wide Strips",
    category: "milestones",
    categoryLabel: "Celebrations & Milestones",
    src: "/images/portfolio/celebration-quad-chapter18.jpg",
    thumb: "/images/portfolio/thumbs/celebration-quad-chapter18.jpg",
    aspectRatio: "portrait",
    bentoClass: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    location: "Autumn Estate Grounds",
    gear: "85mm f/1.4 • Cinematic 2.39:1 Strips",
    year: "2024",
    clientOrConcept: "Senior / 18th Birthday Milestone",
    description:
      "Four widescreen cinematic film panels alternating between rich autumn color and crisp black and white. Chapter 18 begins.",
    badge: "Cinematic Strips",
  },

  // 14. What Will Baby Be? (Gender Reveal Announcement)
  {
    id: "gender-reveal-board",
    title: "What Will Baby Be?",
    subtitle: "Celebration Card & Reveal Board",
    category: "milestones",
    categoryLabel: "Celebrations & Milestones",
    src: "/images/portfolio/gender-reveal-01.jpg",
    thumb: "/images/portfolio/thumbs/gender-reveal-01.jpg",
    aspectRatio: "portrait",
    bentoClass: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    location: "Private Residence Garden",
    gear: "35mm f/1.8 • Daylight Ambient",
    year: "2024",
    clientOrConcept: "Family Milestone Celebration",
    description:
      "The thrill of predictions, the white lace dress, and the collective celebration as family members place their votes for the newcomer.",
    badge: "Announcement",
  },

  // 15. Autumn Woodland Family Series
  {
    id: "family-autumn-canopy",
    title: "Autumn Canopy Family Series",
    subtitle: "6-Panel Woodland Portrait Series",
    category: "milestones",
    categoryLabel: "Celebrations & Milestones",
    src: "/images/portfolio/family-woodland-autumn.jpg",
    thumb: "/images/portfolio/thumbs/family-woodland-autumn.jpg",
    aspectRatio: "portrait",
    bentoClass: "col-span-1 md:col-span-1 lg:col-span-1 row-span-2",
    location: "Highland Forest Trail",
    gear: "70-200mm f/2.8 • Fall Foliage Backlight",
    year: "2024",
    clientOrConcept: "Family Heritage Portrait",
    description:
      "A rich, warm family study among ancient forest timber and golden maple foliage. Delicate macro foliage cuts paired with intimate family portraits.",
    badge: "Heritage Series",
  },

  // 16. Woodland Triptych
  {
    id: "family-woodland-triptych",
    title: "Woodland Triptych",
    subtitle: "3-Strip Forest Heritage Series",
    category: "milestones",
    categoryLabel: "Celebrations & Milestones",
    src: "/images/portfolio/family-woodland-triptych.jpg",
    thumb: "/images/portfolio/thumbs/family-woodland-triptych.jpg",
    aspectRatio: "square",
    bentoClass: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    location: "Highland Forest Sanctuary",
    gear: "85mm f/1.4 • Forest Shade Ambient",
    year: "2024",
    clientOrConcept: "Family Portrait Sitting",
    description:
      "Three wide cinematic strips honoring parenthood, childhood laughter on shoulders, and forest tranquility.",
    badge: "Forest Triptych",
  },

  // 17. Echoes of the Shore
  {
    id: "editorial-shore-waves",
    title: "Echoes of the Shore",
    subtitle: "Waterline & Light Editorial Sitting",
    category: "editorial",
    categoryLabel: "Editorial & Portraits",
    src: "/images/portfolio/editorial-waves-portrait.jpg",
    thumb: "/images/portfolio/thumbs/editorial-waves-portrait.jpg",
    aspectRatio: "portrait",
    bentoClass: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    location: "Rocky Coastal Point",
    gear: "50mm f/1.4 • Natural Coastal Elements",
    year: "2024",
    clientOrConcept: "Editorial Creative Series",
    description:
      "Crashing lakeside foam and lakeside reeds form the textured backdrop for an introspective monochrome portrait inset.",
    badge: "Shoreline Study",
  },

  // 18. Motion & Serenity
  {
    id: "editorial-motion-blur",
    title: "Motion & Serenity",
    subtitle: "Creative Shutter & Radial Motion Study",
    category: "editorial",
    categoryLabel: "Editorial & Portraits",
    src: "/images/portfolio/editorial-motion-blur.jpg",
    thumb: "/images/portfolio/thumbs/editorial-motion-blur.jpg",
    aspectRatio: "portrait",
    bentoClass: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    location: "Sunlit Meadow Clearing",
    gear: "Creative Pan Shutter • 85mm Prime",
    year: "2024",
    clientOrConcept: "Art Direction & Motion Series",
    description:
      "A fast radial shutter pan wraps around a calm, serene portrait sitting, embodying the quiet peace found in the center of motion.",
    badge: "Motion Study",
  },

  // 19. Saffron & Indigo Panorama
  {
    id: "panorama-saffron-indigo",
    title: "The Saffron & Indigo Panorama",
    subtitle: "Three-Panel Continuous Cultural Story",
    category: "panoramas",
    categoryLabel: "Panoramic Spreads",
    src: "/images/portfolio/panorama-part1.jpg",
    thumb: "/images/portfolio/thumbs/panorama-part1.jpg",
    aspectRatio: "portrait",
    bentoClass: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    location: "Nature Park Pavilion",
    gear: "85mm f/1.4 • Continuous Flow",
    year: "2024",
    clientOrConcept: "Cultural Heritage Portraiture",
    description:
      "Part of a continuous panoramic triptych honoring traditional embroidery, handcrafted details, and genuine personal expression.",
    badge: "3-Part Story",
  },
];

export const CATEGORIES = [
  { id: "all", label: "All Works", count: PORTFOLIO_ITEMS.length },
  {
    id: "maternity",
    label: "Maternity & New Life",
    count: PORTFOLIO_ITEMS.filter((i) => i.category === "maternity").length,
  },
  {
    id: "editorial",
    label: "Editorial & Portraits",
    count: PORTFOLIO_ITEMS.filter((i) => i.category === "editorial").length,
  },
  {
    id: "milestones",
    label: "Celebrations & Milestones",
    count: PORTFOLIO_ITEMS.filter((i) => i.category === "milestones").length,
  },
  {
    id: "panoramas",
    label: "Panoramic Spreads",
    count: PORTFOLIO_ITEMS.filter((i) => i.category === "panoramas").length,
  },
];

export const FEATURED_SERIES = [
  {
    id: "series-maternity",
    number: "01",
    title: "The Miracle Monographs",
    tagline: "Maternity, Expectation & New Life",
    date: "2024 Series",
    itemIds: [
      "maternity-triptych",
      "maternity-miracle",
      "maternity-shoreline",
      "maternity-waiting",
    ],
    cover: "/images/portfolio/maternity-miracle-01.jpg",
    statement:
      "A mother's heart begins loving her child long before the first embrace. This monograph documents the quiet grace, sacred expectation, and tender anticipation of parents awaiting their child.",
    highlightStats: ["4 Monographs", "Golden Hour & Studio", "Heirloom Grade"],
  },
  {
    id: "series-editorial",
    number: "02",
    title: "The Modern Viewfinder",
    tagline: "Editorial & Technical Optical Portraiture",
    date: "2024 Series",
    itemIds: [
      "editorial-viewfinder",
      "editorial-camera-hud",
      "editorial-suits",
      "editorial-motion-blur",
    ],
    cover: "/images/portfolio/editorial-camera-interface.jpg",
    statement:
      "Deconstructing the barrier between camera reticle and subject. Inspired by high-end cinema HUDs, 35mm contact sheets, and tactile optical instruments.",
    highlightStats: ["Optical HUDs", "High Chiaroscuro", "Studio & Meadow"],
  },
  {
    id: "series-panoramas",
    number: "03",
    title: "The Continuous Horizon",
    tagline: "Multi-Panel Sweeping Instagram Carousels",
    date: "2024 Series",
    itemIds: ["panorama-fashion", "panorama-golden", "celebration-chapter18"],
    cover: "/images/portfolio/panorama-fashion-carousel.jpg",
    statement:
      "Panoramic storytelling up to 16,875 pixels wide, crafted specifically for modern editorial feeds and large-format gallery wall prints.",
    highlightStats: ["16K Resolution", "5-Panel Flows", "Editorial Narrative"],
  },
  {
    id: "series-milestones",
    number: "04",
    title: "Milestones & Heritage",
    tagline: "Celebrations, Gender Reveals & Family Legacies",
    date: "2024 Series",
    itemIds: [
      "gender-reveal-stars",
      "polaroid-toddler",
      "family-autumn-canopy",
      "gender-reveal-board",
    ],
    cover: "/images/portfolio/gender-reveal-stars-02.jpg",
    statement:
      "From the surprise burst of blue balloons to 20-frame toddler polaroid walls and golden autumn family walks. Preserving real human joy.",
    highlightStats: ["20-Frame Sheets", "Raw Joy", "Family Legacies"],
  },
];

