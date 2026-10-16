"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEnquiryModal } from "@/components/layout/EnquiryModalProvider";

export interface ShowcaseImage {
  id: string;
  title: string;
  category: "all" | "handover" | "elevation" | "interior";
  categoryLabel: string;
  tag: string;
  image: string;
  nightPair?: string;
  location: string;
  description: string;
  highlights: string[];
}

export const REAL_SHOWCASE_IMAGES: ShowcaseImage[] = [
  {
    id: "house-106-day",
    title: "House No #106 — Contemporary 3-Storey Urban Residence",
    category: "elevation",
    categoryLabel: "Elevations & Architecture",
    tag: "Daylight Elevation",
    image: "/images/cosmic-house-106-day.png",
    nightPair: "/images/cosmic-house-106-night.png",
    location: "Bengaluru, Karnataka",
    description:
      "A flagship 3-floor urban residence featuring custom fluted timber cladding, integrated stilt parking, private glass balconies, and premium terrace skylight pergolas.",
    highlights: ["G+2 Urban Residence", "Custom Fluted Louvers", "Terrace Skylight", "Day & Night Lighting"],
  },
  {
    id: "house-106-night",
    title: "House No #106 — Architectural Evening Illumination",
    category: "elevation",
    categoryLabel: "Elevations & Architecture",
    tag: "Evening Illumination",
    image: "/images/cosmic-house-106-night.png",
    nightPair: "/images/cosmic-house-106-day.png",
    location: "Bengaluru, Karnataka",
    description:
      "Dramatic dusk view showing 3000K warm LED architectural profile lighting, vertical facade sconces, and backlit signage engineered for striking night curb appeal.",
    highlights: ["Warm 3000K Lighting", "Backlit Profile Strips", "Vertical Wall Sconces", "Facade Ambience"],
  },
  {
    id: "residence-195-day",
    title: "Residence #195/4 — Completed 4-Tier Luxury Home",
    category: "handover",
    categoryLabel: "Real Site Handover",
    tag: "Turnkey Completed",
    image: "/images/cosmic-residence-elevation-1.jpg",
    location: "Rajajinagar, Bengaluru",
    description:
      "Full completed turnkey residence showcasing horizontal box-frame architectural projections, timber slats, frosted glass balconies, and ground-level secure parking shutters.",
    highlights: ["G+3 Structure", "Box-Frame Projections", "Frosted Glass Balconies", "Turnkey Handover"],
  },
  {
    id: "residence-195-facade",
    title: "Residence #195/4 — Symmetrical Architectural Elevation",
    category: "handover",
    categoryLabel: "Real Site Handover",
    tag: "Site Photo",
    image: "/images/cosmic-residence-elevation-2.jpg",
    location: "Rajajinagar, Bengaluru",
    description:
      "Frontal view highlighting the precision alignment of sliding window frames, vertical wood finish accents, and weather-resistant architectural coatings.",
    highlights: ["Symmetrical Facade", "Teak Slats", "Sliding Windows", "Weather-Shield Finish"],
  },
  {
    id: "residence-night",
    title: "Modern Glass Facade Residence — Evening Warmth",
    category: "elevation",
    categoryLabel: "Elevations & Architecture",
    tag: "Night Illumination",
    image: "/images/cosmic-residence-elevation-night.jpg",
    location: "Bengaluru, Karnataka",
    description:
      "Evening site capture showing glowing glass-fronted reception area, backlit vertical wood louvers, circular port window, and double entry gates.",
    highlights: ["Illuminated Reception", "Circular Port Window", "Gated Security", "LED Cove Lighting"],
  },
  {
    id: "front-facade-render",
    title: "Vertical Modern Residence — Multi-Level Balconies",
    category: "elevation",
    categoryLabel: "Elevations & Architecture",
    tag: "Architectural Blueprint",
    image: "/images/cosmic-front-facade-render.jpg",
    location: "Bengaluru, Karnataka",
    description:
      "Detailed architectural elevation displaying dual vertical timber pillars, glass balustrades with balcony planters, architectural sconces, and engineered boundary setbacks.",
    highlights: ["Multi-Level Balconies", "Planter Integration", "Engineered Setbacks", "Architectural Sconces"],
  },
  {
    id: "sudarshana-residence",
    title: "Sudarshana Residence #36 — Heritage Modern Home",
    category: "handover",
    categoryLabel: "Real Site Handover",
    tag: "Turnkey Completed",
    image: "/images/cosmic-sudharshana-facade.jpg",
    location: "Bengaluru, Karnataka",
    description:
      "A completed bespoke residence blending modern multi-tier living with traditional aesthetics: full-height timber screening, circular medallion window, and custom Kannada lettering.",
    highlights: ["Traditional Medallion", "Timber Screening", "Bespoke MS Gate", "Multi-Tier Living"],
  },
  {
    id: "jali-facade-site",
    title: "Parametric Laser-Cut CNC Jali Architectural Screen",
    category: "handover",
    categoryLabel: "Real Site Handover",
    tag: "Site Craftsmanship",
    image: "/images/cosmic-jali-facade-site.jpg",
    location: "Bengaluru, Karnataka",
    description:
      "Real ongoing site execution featuring an intricate geometric hexagonal laser-cut CNC metal screen paired with warm terracotta tiles and natural granite cladding.",
    highlights: ["Parametric CNC Jali", "Terracotta Cladding", "Granite Pillars", "Natural Daylight Filter"],
  },
  {
    id: "teak-pooja-mandir",
    title: "Hand-Carved Teakwood Pooja Mandir Suite",
    category: "interior",
    categoryLabel: "Interior Craftsmanship",
    tag: "Bespoke Woodwork",
    image: "/images/cosmic-pooja-mandir-teak.jpg",
    location: "Bengaluru, Karnataka",
    description:
      "Custom solid teakwood pooja doors crowned with an intricately carved Gajalakshmi archway, gold leaf lotus motifs, frosted safety glass, and handcrafted brass fittings.",
    highlights: ["Solid Burma Teak", "Gajalakshmi Archway", "Gold Leaf Lotus Motifs", "Vastu Aligned"],
  },
  {
    id: "peacock-mural-living",
    title: "Grand Living Hall with Hand-Painted Peacock Fresco",
    category: "interior",
    categoryLabel: "Interior Craftsmanship",
    tag: "Artisanal Interiors",
    image: "/images/cosmic-living-peacock-mural.jpg",
    location: "Bengaluru, Karnataka",
    description:
      "Majestic living space showcasing a hand-painted royal peacock wall mural framed in classical mouldings, wooden coffered ceiling with vintage chandelier, and carved teak entry arch.",
    highlights: ["Hand-Painted Mural", "Coffered Wood Ceiling", "Carved Teak Arch", "Italian Marble Floors"],
  },
  {
    id: "foyer-kitchen-hallway",
    title: "Luxury Foyer, Arched Hallway & Modular Kitchen",
    category: "interior",
    categoryLabel: "Interior Craftsmanship",
    tag: "Foyer & Kitchen",
    image: "/images/cosmic-foyer-kitchen-hallway.jpg",
    location: "Bengaluru, Karnataka",
    description:
      "Grand entry corridor featuring hand-carved solid teak pillars, false ceiling with floating linear gold pendant, glass display cabinet, and seamless passage to the modular kitchen.",
    highlights: ["Solid Teak Pillars", "Linear Pendant", "Glass Display Cabinet", "Granite Island"],
  },
  {
    id: "marble-tv-unit",
    title: "Bookmatched Marble TV Wall with Fluted Timber Pillars",
    category: "interior",
    categoryLabel: "Interior Craftsmanship",
    tag: "Living Room",
    image: "/images/cosmic-living-tv-unit-panelling.jpg",
    location: "Bengaluru, Karnataka",
    description:
      "Designer living room feature wall combining bookmatched Italian marble slabs, vertical gold inlays, fluted solid wood partition pillars, and floating lacquered media console.",
    highlights: ["Bookmatched Marble", "Gold Profile Inlays", "Fluted Timber Pillars", "Floating Console"],
  },
  {
    id: "drawing-room-seating",
    title: "Formal Drawing Room & Contemporary Lounge",
    category: "interior",
    categoryLabel: "Interior Craftsmanship",
    tag: "Formal Living",
    image: "/images/cosmic-drawing-room-seating.jpg",
    location: "Bengaluru, Karnataka",
    description:
      "Elegant drawing room finished with classical wall mouldings, plush dusty-rose velvet upholstery, high-back wing chair, and Italian marble flooring with warm lighting.",
    highlights: ["Classical Mouldings", "Velvet Upholstery", "High-Back Wing Chair", "Designer Lighting"],
  },
  {
    id: "hall-dining-partition",
    title: "Spacious Living-to-Dining Fluted Wood Partition",
    category: "interior",
    categoryLabel: "Interior Craftsmanship",
    tag: "Space Planning",
    image: "/images/cosmic-hall-dining-partition.jpg",
    location: "Bengaluru, Karnataka",
    description:
      "Architectural fluted timber room divider creating subtle spatial separation between the main living area and dining room without obstructing natural light or ventilation.",
    highlights: ["Spatial Separation", "Fluted Timber Screen", "Natural Light Flow", "Polished Marble"],
  },
  {
    id: "dining-fluted-screen",
    title: "Dining Suite with Integrated Architectural Screens",
    category: "interior",
    categoryLabel: "Interior Craftsmanship",
    tag: "Dining Suite",
    image: "/images/cosmic-dining-fluted-screen.jpg",
    location: "Bengaluru, Karnataka",
    description:
      "A family dining space framed by vertical timber screens, cove false ceilings, large windows with security grills, and direct connection to the kitchen and service areas.",
    highlights: ["Family Dining", "Cove Ceiling Lighting", "Direct Kitchen Access", "Clean Architectural Lines"],
  },
  {
    id: "entertainment-lounge",
    title: "Entertainment Lounge & Floating Credenza",
    category: "interior",
    categoryLabel: "Interior Craftsmanship",
    tag: "Lounge Area",
    image: "/images/cosmic-living-entertainment-lounge.jpg",
    location: "Bengaluru, Karnataka",
    description:
      "Wide angle view of the media lounge featuring rounded floating credenza, fluted solid timber corner columns, and recessed architectural spotlights.",
    highlights: ["Curved Credenza", "Corner Wood Columns", "Concealed Wiring", "Spacious Circulation"],
  },
];

export default function RealProjectsShowcase({
  title = "Real Handover & Craftsmanship Gallery",
  subtitle = "Actual Completed Residences & Interior Execution across Bengaluru",
  theme = "light",
}: {
  title?: string;
  subtitle?: string;
  theme?: "light" | "dark";
}) {
  const [activeFilter, setActiveFilter] = useState<"all" | "handover" | "elevation" | "interior">("all");
  const [selectedImage, setSelectedImage] = useState<ShowcaseImage | null>(null);
  const [house106Night, setHouse106Night] = useState(false);
  const { openModal } = useEnquiryModal();

  const filtered = REAL_SHOWCASE_IMAGES.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  // Handle keyboard navigation in modal
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowRight") {
        const currIdx = filtered.findIndex((i) => i.id === selectedImage.id);
        const nextIdx = (currIdx + 1) % filtered.length;
        setSelectedImage(filtered[nextIdx]);
      } else if (e.key === "ArrowLeft") {
        const currIdx = filtered.findIndex((i) => i.id === selectedImage.id);
        const prevIdx = (currIdx - 1 + filtered.length) % filtered.length;
        setSelectedImage(filtered[prevIdx]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, filtered]);

  const isDark = theme === "dark";

  return (
    <section className={`relative py-24 lg:py-32 overflow-hidden ${isDark ? "bg-[#011f1c] text-white" : "bg-[#fbfbf9] text-[#1a242f]"}`}>
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#c9a45c]/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-[#c9a45c] font-semibold text-[0.72rem] uppercase tracking-[0.25em] mb-3">
            Real Site Portfolios &bull; Authentic Quality
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
            {title}
          </h2>
          <p className={`${isDark ? "text-slate-300" : "text-slate-600"} font-sans-clean text-sm sm:text-base leading-relaxed`}>
            {subtitle}. Every detail — from architectural laser-cut CNC facades and G+3 multi-tier elevations to solid teakwood pooja mandirs and Italian marble TV lounges — is executed by our in-house engineering and craftsmanship teams.
          </p>
        </div>

        {/* INTERACTIVE FEATURE: House #106 Day/Night Elevation Switcher Spotlight */}
        <div className="mb-16 bg-gradient-to-br from-[#022b27] to-[#011b18] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#c9a45c]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Interactive Image with Crossfade */}
            <div className="lg:col-span-6 relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] max-h-[580px] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={house106Night ? "night" : "day"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 cursor-pointer"
                  onClick={() =>
                    setSelectedImage(
                      house106Night
                        ? REAL_SHOWCASE_IMAGES[1]
                        : REAL_SHOWCASE_IMAGES[0]
                    )
                  }
                >
                  <Image
                    src={house106Night ? "/images/cosmic-house-106-night.png" : "/images/cosmic-house-106-day.png"}
                    alt="House No #106 Architectural Elevation"
                    fill
                    className="object-cover object-top sm:object-[center_top] transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 600px"
                    priority
                    quality={95}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Day / Night Live Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-[#022b27] shadow-lg flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${house106Night ? "bg-amber-400 animate-pulse" : "bg-emerald-500"}`} />
                  {house106Night ? "Night Illumination (3000K)" : "Daylight Elevation"}
                </span>
              </div>

              {/* Click to Expand Button */}
              <button
                onClick={() =>
                  setSelectedImage(
                    house106Night
                      ? REAL_SHOWCASE_IMAGES[1]
                      : REAL_SHOWCASE_IMAGES[0]
                  )
                }
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-[#c9a45c] text-white flex items-center justify-center transition-all shadow-lg backdrop-blur-sm"
                aria-label="View Fullscreen"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>

              {/* Image Footer Caption */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-slate-200">
                <span className="font-semibold text-white drop-shadow">House No #106 Urban Residence</span>
                <span className="text-[#c9a45c] font-medium">Bengaluru</span>
              </div>
            </div>

            {/* Right: Controls & Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a45c]/20 border border-[#c9a45c]/40 text-[#dfbc77] text-[0.68rem] uppercase tracking-[0.2em] font-semibold">
                Interactive Architectural Spotlight
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-white">
                House No #106: <br />
                <span className="italic font-normal text-gold-gradient">
                  Daylight & Night Elevation Study
                </span>
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans-clean">
                Experience how our architectural lighting turns modern facades into illuminated landmarks. Toggle between natural daylight and night ambient lighting to inspect facade louvers, recessed balconies, and LED wall washes.
              </p>

              {/* Day / Night Toggle Buttons */}
              <div className="p-1.5 inline-flex rounded-full bg-black/40 border border-white/20">
                <button
                  onClick={() => setHouse106Night(false)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    !house106Night
                      ? "bg-gold-gradient text-white shadow-lg"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <svg className="w-4 h-4 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                  Day Mode
                </button>
                <button
                  onClick={() => setHouse106Night(true)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    house106Night
                      ? "bg-gold-gradient text-white shadow-lg"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <svg className="w-4 h-4 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                  Night Mode
                </button>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() =>
                    setSelectedImage(
                      house106Night
                        ? REAL_SHOWCASE_IMAGES[1]
                        : REAL_SHOWCASE_IMAGES[0]
                    )
                  }
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                >
                  Inspect Full HD Blueprint
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button
                  onClick={openModal}
                  className="px-6 py-3 rounded-full bg-gold-gradient text-white text-xs font-semibold uppercase tracking-wider hover:shadow-lg transition-all"
                >
                  Enquire For Similar Build
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {[
            { key: "all", label: `All Portfolios (${REAL_SHOWCASE_IMAGES.length})` },
            { key: "handover", label: "Real Site Handovers (4)" },
            { key: "elevation", label: "Elevations & Renders (4)" },
            { key: "interior", label: "Interior Craftsmanship (8)" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === tab.key
                  ? "bg-[#022b27] text-white shadow-md scale-105 border border-[#c9a45c]/40"
                  : isDark
                  ? "bg-white/10 text-slate-300 border border-white/15 hover:bg-white/20"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 shadow-sm"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Responsive Grid for all 16 images */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
              >
                <div
                  onClick={() => setSelectedImage(item)}
                  className={`group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 border flex flex-col h-full ${
                    isDark
                      ? "bg-[#022b27]/80 border-white/10 hover:border-[#c9a45c]/50"
                      : "bg-white border-slate-200 hover:border-[#c9a45c]/50"
                  }`}
                >
                  {/* Image container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 ${
                        item.category === "interior" ? "object-center" : "object-top sm:object-[center_top]"
                      }`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                    {/* Tag badge */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider bg-white/95 text-[#022b27] shadow-sm">
                      {item.tag}
                    </span>

                    {/* Zoom Icon on hover */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>

                    {/* Category Label */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-[0.68rem] uppercase tracking-wider text-[#c9a45c] font-semibold flex items-center gap-1 mb-0.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {item.location}
                      </p>
                      <h4 className="font-serif text-sm font-semibold line-clamp-1 leading-snug">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <p className={`text-xs font-sans-clean line-clamp-2 mb-3 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.highlights.slice(0, 2).map((h, i) => (
                        <span
                          key={i}
                          className={`text-[0.65rem] px-2 py-0.5 rounded-md font-sans-clean ${
                            isDark ? "bg-white/10 text-slate-300" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                      <span className="text-[#c9a45c] font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                        View HD Details &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* FULLSCREEN HD LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6 lg:p-10"
            onClick={() => setSelectedImage(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#011f1c]/90 backdrop-blur-md" />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 bg-[#fbfbf9] rounded-3xl overflow-hidden shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col lg:flex-row border border-white/20 text-[#1a242f]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#022b27] hover:bg-[#c9a45c] text-white flex items-center justify-center transition-all shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Left Image View: 100% Uncropped Full Architectural View */}
              <div className="relative w-full lg:w-[62%] h-[48vh] sm:h-[58vh] lg:h-auto lg:min-h-[560px] bg-slate-950 flex-shrink-0 p-2 sm:p-4 flex items-center justify-center">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 62vw"
                  priority
                  quality={95}
                />

                {/* Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-[#022b27] text-xs font-bold uppercase tracking-wider shadow-sm">
                  {selectedImage.tag}
                </span>

                {/* Prev / Next navigation buttons */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currIdx = filtered.findIndex((i) => i.id === selectedImage.id);
                    const prevIdx = (currIdx - 1 + filtered.length) % filtered.length;
                    setSelectedImage(filtered[prevIdx]);
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#c9a45c] text-white flex items-center justify-center transition-all"
                  aria-label="Previous image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currIdx = filtered.findIndex((i) => i.id === selectedImage.id);
                    const nextIdx = (currIdx + 1) % filtered.length;
                    setSelectedImage(filtered[nextIdx]);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#c9a45c] text-white flex items-center justify-center transition-all"
                  aria-label="Next image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Right Content Panel */}
              <div className="flex flex-col flex-1 p-6 sm:p-8 lg:p-10 justify-between overflow-y-auto">
                <div>
                  <span className="text-[0.68rem] uppercase tracking-[0.2em] font-semibold text-[#c9a45c] block mb-2">
                    {selectedImage.categoryLabel} &bull; {selectedImage.location}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#022b27] leading-tight mb-4">
                    {selectedImage.title}
                  </h3>
                  <p className="text-slate-600 text-sm font-sans-clean leading-relaxed mb-6">
                    {selectedImage.description}
                  </p>

                  <div className="border-t border-slate-200 pt-4 mb-6">
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-slate-400 mb-3">
                      Architectural Highlights
                    </p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {selectedImage.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-sans-clean text-[#022b27] bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a45c]" />
                          <span className="font-medium">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      openModal();
                    }}
                    className="flex-1 py-3.5 px-6 rounded-full bg-gold-gradient text-white text-xs font-semibold uppercase tracking-wider hover:shadow-xl transition-all text-center"
                  >
                    Enquire About This Build
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
