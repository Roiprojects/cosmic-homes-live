"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ModalTrigger from "@/components/ui/ModalTrigger";

/* ─── Hero Architectural Slides (High-Definition Landscape for Desktop, Form-Fit Portrait for Mobile) ─── */
interface HeroSlide {
  id: string;
  title: string;
  tagline: string;
  location: string;
  desktopSrc: string;
  desktopPosition: string; // Tailored object-position to ensure the entire house & roof are visible
  mobileSrc: string;
  mobilePosition: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    title: "Terracotta Breeze-Block Residence",
    tagline: "Contemporary G+2 Urban Home with Artisanal Jali",
    location: "HSR Layout, Bengaluru",
    desktopSrc: "/images/villa-terracotta-12-1.png",
    desktopPosition: "object-[center_20%] lg:object-[65%_22%]",
    mobileSrc: "/images/cosmic-house-106-day.png",
    mobilePosition: "object-[center_top]",
  },
  {
    id: "slide-2",
    title: "Contemporary Navy & Wood Duplex",
    tagline: "Refined Modern Duplex with Integrated Lighting",
    location: "Jayanagar, Bengaluru",
    desktopSrc: "/images/villa-navy-duplex-1.png",
    desktopPosition: "object-[center_22%] lg:object-[68%_25%]",
    mobileSrc: "/images/cosmic-house-106-night.png",
    mobilePosition: "object-[center_top]",
  },
  {
    id: "slide-3",
    title: "Horizontal Glow Luxury Residence",
    tagline: "Cantilevered Glass Balconies & Paved Entry",
    location: "Whitefield, Bengaluru",
    desktopSrc: "/images/villa-horizontal-light-1.png",
    desktopPosition: "object-[center_22%] lg:object-[65%_24%]",
    mobileSrc: "/images/cosmic-residence-elevation-1.jpg",
    mobilePosition: "object-[center_top]",
  },
  {
    id: "slide-4",
    title: "Terracotta Corner Balcony Residence",
    tagline: "Multi-Tier Living with Natural Granite Cladding",
    location: "Rajajinagar, Bengaluru",
    desktopSrc: "/images/villa-terracotta-corner-1.png",
    desktopPosition: "object-[center_18%] lg:object-[65%_20%]",
    mobileSrc: "/images/exterior-golden-stone-1.png",
    mobilePosition: "object-[center_top]",
  },
  {
    id: "slide-5",
    title: "Modern Niche Architectural Residence",
    tagline: "Backlit Geometric Niches & Stilt Entrance",
    location: "Koramangala, Bengaluru",
    desktopSrc: "/images/villa-square-niches-1.png",
    desktopPosition: "object-[center_18%] lg:object-[65%_20%]",
    mobileSrc: "/images/villa-golden-jali-1.png",
    mobilePosition: "object-[center_top]",
  },
];

const SLIDE_DURATION = 5000; // 5 seconds per slide

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ─── Preload all slide images on mount ─── */
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      // Preload desktop
      const imgDesktop = new window.Image();
      imgDesktop.src = slide.desktopSrc;
      // Preload mobile
      const imgMobile = new window.Image();
      imgMobile.src = slide.mobileSrc;
    });
  }, []);

  /* ─── Next / Prev navigation ─── */
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  /* ─── Auto-advance interval ─── */
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused]);

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      className="relative min-h-[100dvh] flex items-center text-white overflow-hidden bg-[#022320]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ══════════════════════════════════════════════
          1. FULL-WIDTH BACKGROUND CROSSFADE SYSTEM
          (Zero layout shift, zero black screens, seamless opacity blend)
      ══════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 2 : 1,
              }}
            >
              {/* Desktop & Laptop Viewport (Landscape-optimized complete house exterior) */}
              <div className="hidden md:block absolute inset-0">
                <Image
                  src={slide.desktopSrc}
                  alt={slide.title}
                  fill
                  className={`object-cover ${slide.desktopPosition}`}
                  priority={index === 0}
                  quality={95}
                  sizes="100vw"
                />
              </div>

              {/* Mobile & Small Tablet Viewport (Portrait-optimized full multi-storey elevation) */}
              <div className="block md:hidden absolute inset-0">
                <Image
                  src={slide.mobileSrc}
                  alt={slide.title}
                  fill
                  className={`object-cover ${slide.mobilePosition}`}
                  priority={index === 0}
                  quality={95}
                  sizes="100vw"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════════
          2. CINEMATIC OVERLAY SYSTEM
          (Subtle dark gradient ensuring white text legibility while keeping the house luminous)
      ══════════════════════════════════════════════ */}
      {/* Desktop side gradient: deep forest emerald on left (for text), transparent on right (for house) */}
      <div
        className="hidden md:block absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(2,35,32,0.92) 0%, rgba(2,35,32,0.72) 42%, rgba(2,35,32,0.25) 75%, rgba(0,0,0,0.1) 100%), linear-gradient(to top, rgba(2,35,32,0.75) 0%, transparent 25%)",
        }}
      />

      {/* Mobile vertical gradient: balanced protection top and bottom */}
      <div
        className="block md:hidden absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(2,35,32,0.85) 0%, rgba(2,35,32,0.45) 45%, rgba(2,35,32,0.9) 100%)",
        }}
      />

      {/* Architectural subtle micro-grid watermark */}
      <div className="absolute inset-0 z-[4] pointer-events-none opacity-[0.035]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════
          3. HERO CONTENT
          (Stable, left-anchored layout with high contrast)
      ══════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-16 lg:pb-24">
        <div className="max-w-2xl">
          {/* Label Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a45c] animate-pulse" />
            <span className="text-[0.68rem] uppercase tracking-[0.22em] font-semibold text-slate-100">
              Turnkey Luxury Residences &bull; Bengaluru
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl xl:text-6xl font-serif text-white font-semibold leading-[1.12] mb-6 drop-shadow-xl"
          >
            Build Your <br />
            <span className="italic font-normal text-gold-gradient">Dream Home</span> <br />
            With Confidence.
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-100 text-base sm:text-lg leading-relaxed font-sans-clean font-normal max-w-lg mb-8 drop-shadow-md"
          >
            From planning and bespoke architectural design to precision construction and final handover — we create homes crafted around your lifestyle.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <Link
              href="/projects"
              className="px-7 py-3.5 rounded-full bg-gold-gradient text-white text-xs uppercase tracking-[0.16em] font-semibold hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              View Projects
            </Link>
            <ModalTrigger variant="outline" size="md">
              Get Free Consultation
            </ModalTrigger>
          </motion.div>

          {/* Statistics Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="pt-6 border-t border-white/20 grid grid-cols-3 gap-6 max-w-md backdrop-blur-[2px]"
          >
            <div>
              <p className="font-serif text-2xl lg:text-3xl font-bold text-white">15+</p>
              <p className="text-xs text-slate-200 font-sans-clean uppercase tracking-wider mt-0.5">Homes Built</p>
            </div>
            <div>
              <p className="font-serif text-2xl lg:text-3xl font-bold text-white">12+</p>
              <p className="text-xs text-slate-200 font-sans-clean uppercase tracking-wider mt-0.5">Years Experience</p>
            </div>
            <div>
              <p className="font-serif text-2xl lg:text-3xl font-bold text-[#dfbc77]">4.9 / 5</p>
              <p className="text-xs text-slate-200 font-sans-clean uppercase tracking-wider mt-0.5">Client Rating</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          4. INTERACTIVE CONTROLS & ACTIVE SLIDE BADGE
      ══════════════════════════════════════════════ */}
      {/* Floating Active House Label (Desktop - bottom right above controls) */}
      <div className="hidden lg:block absolute bottom-8 right-8 z-20 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="backdrop-blur-md bg-black/40 border border-white/15 px-4 py-2.5 rounded-2xl text-right max-w-xs shadow-xl"
          >
            <p className="text-[0.65rem] uppercase tracking-widest text-[#c9a45c] font-semibold">
              {currentSlide.location}
            </p>
            <p className="text-white text-xs font-serif font-semibold truncate">
              {currentSlide.title}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrow Navigation Controls (Desktop floating on sides) */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-6 z-20 flex-col gap-3">
        <button
          onClick={prevSlide}
          aria-label="Previous House"
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-[#c9a45c] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-105"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next House"
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-[#c9a45c] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-105"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Slide Indicator Dots (Bottom Centered) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}: ${slide.title}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentIndex
                ? "w-8 bg-[#c9a45c] shadow-sm"
                : "w-2.5 bg-white/40 hover:bg-white/80"
            }`}
          />
        ))}
        <span className="text-[0.65rem] font-mono text-slate-300 ml-1.5 pl-1.5 border-l border-white/20">
          0{currentIndex + 1} / 0{HERO_SLIDES.length}
        </span>
      </div>
    </section>
  );
}
