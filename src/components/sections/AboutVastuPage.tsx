"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ModalTrigger from "@/components/ui/ModalTrigger";
import { COMPANY } from "@/data/siteConfig";

/* ─── Fade-in-up animation helper ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
});

/* ─── Data ─── */
const vastuElements = [
  {
    symbol: "🌍",
    name: "Earth (Prithvi)",
    description:
      "Stability, strength, and grounding. Governs the southwest zone — ideal for master bedrooms and heavy structural elements.",
  },
  {
    symbol: "💧",
    name: "Water (Jal)",
    description:
      "Flow, abundance, and clarity. The northeast direction channels water energy — perfect for water features, prayer rooms, and open spaces.",
  },
  {
    symbol: "🔥",
    name: "Fire (Agni)",
    description:
      "Energy, transformation, and vitality. The southeast is the fire zone — kitchens, electrical installations, and power points thrive here.",
  },
  {
    symbol: "🌬️",
    name: "Air (Vayu)",
    description:
      "Movement, growth, and freshness. The northwest directs air flow — guest rooms, storage, and ventilation openings are best here.",
  },
  {
    symbol: "✨",
    name: "Space (Akasha)",
    description:
      "The central zone (Brahmasthan) must remain open and unobstructed — allowing energy to circulate freely throughout the home.",
  },
];

const directions = [
  { dir: "N", label: "North", note: "Career & Prosperity" },
  { dir: "NE", label: "North-East", note: "Prayer & Wisdom" },
  { dir: "E", label: "East", note: "Health & New Beginnings" },
  { dir: "SE", label: "South-East", note: "Kitchen & Fire Zone" },
  { dir: "S", label: "South", note: "Fame & Recognition" },
  { dir: "SW", label: "South-West", note: "Stability & Master Bed" },
  { dir: "W", label: "West", label2: "West", note: "Children & Creativity" },
  { dir: "NW", label: "North-West", note: "Guests & Movement" },
];

const services = [
  {
    icon: "🏠",
    title: "Residential Vastu Consultation",
    desc: "Comprehensive Vastu analysis for your home — from plot selection to interior room placement — aligned with your family's needs and goals.",
  },
  {
    icon: "🧭",
    title: "Plot Selection & Directional Analysis",
    desc: "We evaluate plot shape, orientation, surrounding roads, and directional attributes before you make your investment decision.",
  },
  {
    icon: "📐",
    title: "House Plan & Layout Assessment",
    desc: "Your architectural drawings are reviewed against Vastu principles, with practical suggestions for room orientation and proportions.",
  },
  {
    icon: "🛋️",
    title: "Room Placement & Interior Guidance",
    desc: "Advice on placement of furniture, beds, entrances, kitchen, and prayer spaces to encourage positive energy flow.",
  },
  {
    icon: "🔍",
    title: "Existing-Home Vastu Assessment",
    desc: "Already living in your home? We assess the current layout and suggest practical, cost-effective remedies without major structural changes.",
  },
  {
    icon: "🌿",
    title: "Vastu Remedies & Recommendations",
    desc: "Personalised guidance including colour selection, element balancing, and spatial corrections for improved harmony and well-being.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Initial Enquiry",
    desc: "Share your property details, location, current stage of construction, and what you hope to achieve through Vastu guidance.",
  },
  {
    num: "02",
    title: "Property & Plan Review",
    desc: "We collect the floor plan, plot measurements, cardinal directions, and surrounding environment to prepare for a thorough assessment.",
  },
  {
    num: "03",
    title: "Vastu Assessment",
    desc: "Our team evaluates your property against Vastu Shastra principles — analysing zones, room placements, entry points, and elemental alignment.",
  },
  {
    num: "04",
    title: "Personalised Recommendations",
    desc: "We deliver clear, practical suggestions tailored to your specific layout — not generic advice. You receive an easy-to-understand written summary.",
  },
  {
    num: "05",
    title: "Follow-up Consultation",
    desc: "A follow-up session to answer questions, clarify recommendations, and ensure the guidance is implemented comfortably and effectively.",
  },
];

const whyChooseUs = [
  {
    icon: "🎯",
    title: "Property-Specific Advice",
    desc: "Every consultation is based on your actual plot, plan, and family requirements — not a one-size-fits-all template.",
  },
  {
    icon: "🤝",
    title: "Integrated with Construction",
    desc: "As home builders, we incorporate Vastu from design stage onwards — saving you retrofitting costs later.",
  },
  {
    icon: "📖",
    title: "Traditional Knowledge",
    desc: "Our guidance draws from classical Vastu Shastra texts combined with practical modern construction know-how.",
  },
  {
    icon: "💬",
    title: "Clear Communication",
    desc: "We explain recommendations in plain language — no jargon, no exaggerated claims, no pressure.",
  },
  {
    icon: "🏗️",
    title: "12+ Years of Experience",
    desc: "Over a decade of residential construction across Bengaluru, with Vastu principles considered in every project.",
  },
  {
    icon: "🌟",
    title: "Client-Focused Approach",
    desc: "Your satisfaction and confidence in your home guide every step we take — from first consultation to final handover.",
  },
];

const faqs = [
  {
    q: "What is Vastu Shastra?",
    a: "Vastu Shastra is an ancient Indian system of architecture and spatial arrangement that considers the five natural elements — earth, water, fire, air, and space — and cardinal directions to create harmonious living environments. It provides guidelines for plot selection, building orientation, room placement, and interior arrangements.",
  },
  {
    q: "Can Vastu principles be applied when designing a new home?",
    a: "Absolutely. Integrating Vastu principles during the design stage is the most effective approach. We can work with your architect to align room orientations, entrance positions, kitchen location, and spatial proportions with Vastu guidelines before construction begins.",
  },
  {
    q: "Can an existing home be assessed for Vastu compliance?",
    a: "Yes. We offer existing-home Vastu assessments that identify potential imbalances in the current layout and recommend practical remedies — many of which can be implemented without major structural work.",
  },
  {
    q: "What information is needed for a consultation?",
    a: "Ideally, we need the floor plan or architectural drawings, the plot dimensions and shape, cardinal direction of the main entrance, and a brief description of your requirements and any concerns you'd like addressed.",
  },
  {
    q: "Can Vastu recommendations be incorporated into a modern architectural design?",
    a: "Yes. Contemporary architecture and Vastu principles are not mutually exclusive. We help integrate Vastu guidance in a way that respects modern aesthetics and practical living requirements without compromising either.",
  },
  {
    q: "How can I book a Vastu consultation with Cosmic Homes?",
    a: `You can reach us by calling ${COMPANY.phones[0]} or ${COMPANY.phones[1]}, emailing ${COMPANY.email}, or by clicking the 'Get a Vastu Consultation' button on this page. We will arrange a convenient time to discuss your requirements.`,
  },
];

/* ─── FAQ Accordion Item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#e2e8f0] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-[#fbfbf9] transition-colors"
        aria-expanded={open}
      >
        <span className="font-sans-clean font-semibold text-[#022b27] text-sm sm:text-base">
          {q}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full border border-[#c9a45c]/40 flex items-center justify-center text-[#c9a45c] transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-slate-600 font-sans-clean text-sm leading-relaxed border-t border-[#e2e8f0] pt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Component ─── */
export default function AboutVastuPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════
          1. PAGE HERO HEADER
      ══════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 bg-[#022b27] text-white overflow-hidden">
        {/* Subtle grid accent */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#c9a45c]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            {...fadeUp(0)}
            className="inline-block text-[#c9a45c] font-semibold text-[0.72rem] uppercase tracking-[0.3em] mb-4"
          >
            About Cosmic Homes
          </motion.span>
          <motion.h1
            {...fadeUp(0.1)}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold mb-5 leading-[1.12]"
          >
            Building Homes in{" "}
            <span className="text-gold-gradient italic font-normal">
              Harmony with Vastu
            </span>
          </motion.h1>
          <motion.p
            {...fadeUp(0.2)}
            className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base font-sans-clean leading-relaxed"
          >
            At Cosmic Homes, we combine 12+ years of construction expertise with
            the timeless wisdom of Vastu Shastra — creating residences that are
            as balanced in energy as they are beautiful in design.
          </motion.p>

          {/* Stats strip */}
          <motion.div
            {...fadeUp(0.3)}
            className="mt-12 inline-flex flex-wrap items-center justify-center gap-8 sm:gap-16 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            {[
              { value: "15+", label: "Homes Built" },
              { value: "12+", label: "Years Experience" },
              { value: "4.9★", label: "Client Rating" },
              { value: "100%", label: "Vastu-Considered" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#c9a45c]">
                  {s.value}
                </p>
                <p className="text-xs text-slate-300 uppercase tracking-widest mt-0.5 font-sans-clean">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. COMPANY INTRODUCTION
      ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Text */}
            <div className="space-y-6">
              <motion.span {...fadeUp(0)} className="inline-block text-[0.72rem] uppercase tracking-[0.25em] font-semibold text-[#c9a45c]">
                Who We Are
              </motion.span>
              <motion.h2
                {...fadeUp(0.05)}
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022b27] leading-[1.18]"
              >
                More Than A Builder.{" "}
                <span className="italic font-normal text-slate-700">
                  A Trusted Home Partner.
                </span>
              </motion.h2>
              <motion.div
                {...fadeUp(0.1)}
                className="space-y-4 text-slate-600 text-base leading-relaxed font-sans-clean"
              >
                <p>
                  Cosmic Homes is a Bengaluru-based residential construction
                  company led by{" "}
                  <strong className="text-[#022b27]">{COMPANY.md}</strong>,{" "}
                  {COMPANY.title}. With over a decade of experience in turnkey
                  home building, we combine precise engineering with thoughtful
                  design to deliver homes of enduring quality.
                </p>
                <p>
                  What sets us apart is our genuine commitment to Vastu
                  Shastra — not as a marketing add-on, but as a core part of
                  how we plan, design, and construct every home. We believe a
                  well-oriented, harmoniously arranged home contributes to the
                  comfort, well-being, and satisfaction of the families who live
                  in it.
                </p>
                <p>
                  From initial plot selection through architectural planning,
                  construction supervision, and final handover, Vastu principles
                  are woven into our process at every stage.
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.15)} className="pt-2">
                <ModalTrigger variant="primary" size="md">
                  Get a Free Consultation
                </ModalTrigger>
              </motion.div>
            </div>

            {/* Image with floating badge */}
            <motion.div {...fadeUp(0.1)} className="relative">
              <div className="relative aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] max-h-[560px] rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-50 image-zoom-container">
                <Image
                  src="/images/cosmic-house-106-day.png"
                  alt="Cosmic Homes Vastu-aligned residence in Bengaluru"
                  fill
                  className="object-cover object-top sm:object-[center_top]"
                  sizes="(max-width: 768px) 100vw, 640px"
                  quality={95}
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-4 sm:left-6 bg-[#022b27] text-white p-5 rounded-2xl shadow-xl border border-white/10">
                <p className="font-serif text-3xl font-bold text-[#c9a45c]">
                  12+
                </p>
                <p className="text-xs uppercase tracking-wider text-slate-300 font-sans-clean mt-0.5">
                  Years of Craftsmanship
                </p>
              </div>
              {/* Gold corner accent */}
              <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-[#c9a45c]/40 rounded-tr-2xl pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. VASTU PHILOSOPHY — FIVE ELEMENTS
      ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[#fbfbf9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span {...fadeUp(0)} className="inline-block text-[0.72rem] uppercase tracking-[0.25em] font-semibold text-[#c9a45c] mb-3">
              Vastu Philosophy
            </motion.span>
            <motion.h2 {...fadeUp(0.05)} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022b27]">
              The Five Elements of Vastu
            </motion.h2>
            <motion.p {...fadeUp(0.1)} className="mt-4 text-slate-500 max-w-2xl mx-auto font-sans-clean text-sm sm:text-base leading-relaxed">
              Vastu Shastra is rooted in the balance of the five natural
              elements — Panchabhutas. Every zone of your home corresponds to
              one or more of these forces, and a well-balanced home honours
              each.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {vastuElements.map((el, i) => (
              <motion.div
                key={el.name}
                {...fadeUp(i * 0.07)}
                className="card-editorial rounded-2xl p-6 text-center flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-[#022b27]/5 flex items-center justify-center text-3xl">
                  {el.symbol}
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#022b27]">
                  {el.name}
                </h3>
                <p className="text-slate-500 font-sans-clean text-sm leading-relaxed">
                  {el.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Directional compass with visual Vastu Mandala graphic */}
          <motion.div {...fadeUp(0.2)} className="mt-20">
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#022b27] text-center mb-3">
              Directional Vastu Mandala & Energy Grid
            </h3>
            <p className="text-center text-slate-500 font-sans-clean text-sm max-w-xl mx-auto mb-10">
              Each cardinal and intercardinal direction governs a specific
              aspect of life and natural elemental force. Understanding these zones helps us plan room
              placements that work in harmony with natural energy flow.
            </p>

            {/* Central Vastu Directional Mandala Diagram */}
            <div className="max-w-4xl mx-auto mb-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a45c]/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* SVG Compass Illustration */}
                <div className="lg:col-span-6 flex items-center justify-center">
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                    <svg viewBox="0 0 320 320" className="w-full h-full drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Outer concentric rings */}
                      <circle cx="160" cy="160" r="150" stroke="#022b27" strokeWidth="2" strokeDasharray="3 3" opacity="0.25" />
                      <circle cx="160" cy="160" r="140" stroke="#c9a45c" strokeWidth="1.5" opacity="0.6" />
                      <circle cx="160" cy="160" r="120" stroke="#022b27" strokeWidth="1" opacity="0.15" />
                      <circle cx="160" cy="160" r="70" stroke="#c9a45c" strokeWidth="1.5" strokeDasharray="4 2" />
                      
                      {/* Diagonal cross axis lines */}
                      <line x1="160" y1="20" x2="160" y2="300" stroke="#c9a45c" strokeWidth="1.5" opacity="0.4" />
                      <line x1="20" y1="160" x2="300" y2="160" stroke="#c9a45c" strokeWidth="1.5" opacity="0.4" />
                      <line x1="60" y1="60" x2="260" y2="260" stroke="#022b27" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
                      <line x1="60" y1="260" x2="260" y2="60" stroke="#022b27" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />

                      {/* Direction wedges highlights */}
                      {/* North-East: Jal (Water) */}
                      <polygon points="160,160 210,80 240,110" fill="#38bdf8" fillOpacity="0.15" />
                      {/* South-East: Agni (Fire) */}
                      <polygon points="160,160 240,210 210,240" fill="#f97316" fillOpacity="0.15" />
                      {/* South-West: Prithvi (Earth) */}
                      <polygon points="160,160 110,240 80,210" fill="#eab308" fillOpacity="0.15" />
                      {/* North-West: Vayu (Air) */}
                      <polygon points="160,160 80,110 110,80" fill="#14b8a6" fillOpacity="0.15" />

                      {/* Cardinal Pointers */}
                      {/* North Arrow */}
                      <polygon points="160,25 152,65 160,55" fill="#022b27" />
                      <polygon points="160,25 168,65 160,55" fill="#c9a45c" />
                      {/* South Arrow */}
                      <polygon points="160,295 152,255 160,265" fill="#c9a45c" />
                      <polygon points="160,295 168,255 160,265" fill="#022b27" />
                      {/* East Arrow */}
                      <polygon points="295,160 255,152 265,160" fill="#022b27" />
                      <polygon points="295,160 255,168 265,160" fill="#c9a45c" />
                      {/* West Arrow */}
                      <polygon points="25,160 65,152 55,160" fill="#c9a45c" />
                      <polygon points="25,160 65,168 55,160" fill="#022b27" />

                      {/* Direction Badges on perimeter */}
                      <g className="font-serif font-bold text-[13px]">
                        {/* North */}
                        <circle cx="160" cy="18" r="14" fill="#022b27" />
                        <text x="160" y="22" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">N</text>
                        
                        {/* North-East */}
                        <circle cx="260" cy="60" r="13" fill="#f0fdf4" stroke="#c9a45c" strokeWidth="1" />
                        <text x="260" y="64" textAnchor="middle" fill="#022b27" fontSize="9" fontWeight="bold">NE</text>

                        {/* East */}
                        <circle cx="302" cy="160" r="14" fill="#022b27" />
                        <text x="302" y="164" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">E</text>

                        {/* South-East */}
                        <circle cx="260" cy="260" r="13" fill="#fff7ed" stroke="#c9a45c" strokeWidth="1" />
                        <text x="260" y="264" textAnchor="middle" fill="#022b27" fontSize="9" fontWeight="bold">SE</text>

                        {/* South */}
                        <circle cx="160" cy="302" r="14" fill="#022b27" />
                        <text x="160" y="306" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">S</text>

                        {/* South-West */}
                        <circle cx="60" cy="260" r="13" fill="#fefce8" stroke="#c9a45c" strokeWidth="1" />
                        <text x="60" y="264" textAnchor="middle" fill="#022b27" fontSize="9" fontWeight="bold">SW</text>

                        {/* West */}
                        <circle cx="18" cy="160" r="14" fill="#022b27" />
                        <text x="18" y="164" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">W</text>

                        {/* North-West */}
                        <circle cx="60" cy="60" r="13" fill="#f0fdfa" stroke="#c9a45c" strokeWidth="1" />
                        <text x="60" y="64" textAnchor="middle" fill="#022b27" fontSize="9" fontWeight="bold">NW</text>
                      </g>

                      {/* Central Brahmasthan */}
                      <circle cx="160" cy="160" r="32" fill="#022b27" stroke="#c9a45c" strokeWidth="2" />
                      <circle cx="160" cy="160" r="26" fill="#033d37" />
                      <text x="160" y="156" textAnchor="middle" fill="#c9a45c" fontSize="7.5" fontWeight="bold" letterSpacing="0.5">BRAHMA</text>
                      <text x="160" y="167" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="bold" letterSpacing="0.5">STHAN</text>
                    </svg>
                  </div>
                </div>

                {/* Right: Key Principles Breakdown */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a45c]/10 text-[#7a5c20] text-xs font-semibold uppercase tracking-wider">
                    Vastu Shastra Spatial Harmony
                  </div>
                  <h4 className="font-serif text-2xl font-semibold text-[#022b27]">
                    How Cosmic Homes Aligns Your Blueprint
                  </h4>
                  <p className="text-slate-600 text-sm font-sans-clean leading-relaxed">
                    Every custom floor plan we draft integrates the Panchabhuta grid. By situating water bodies and pooja spaces in the Ishanya (NE), kitchens in the Agneya (SE), master suites in Nairutya (SW), and guest suites in Vayavya (NW), we guarantee natural cross-ventilation and positive thermal flow.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                      <span className="block text-xs font-bold text-[#022b27]">NE (Ishanya)</span>
                      <span className="text-[0.72rem] text-slate-500">Pooja Mandir & Flow</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                      <span className="block text-xs font-bold text-[#022b27]">SE (Agneya)</span>
                      <span className="text-[0.72rem] text-slate-500">Modular Kitchen & Fire</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                      <span className="block text-xs font-bold text-[#022b27]">SW (Nairutya)</span>
                      <span className="text-[0.72rem] text-slate-500">Master Bedroom & Earth</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                      <span className="block text-xs font-bold text-[#022b27]">Center (Brahmasthan)</span>
                      <span className="text-[0.72rem] text-slate-500">Open Atrium / Courtyard</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 8 Direction Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {directions.map((d, i) => (
                <motion.div
                  key={d.dir}
                  {...fadeUp(i * 0.05)}
                  className="relative bg-white border border-[#e2e8f0] hover:border-[#c9a45c]/50 rounded-xl p-4 text-center transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="font-brand text-2xl font-bold text-[#c9a45c] group-hover:scale-110 transition-transform inline-block">
                    {d.dir}
                  </div>
                  <p className="font-serif text-sm font-semibold text-[#022b27] mt-1">
                    {d.label}
                  </p>
                  <p className="text-[0.7rem] text-slate-400 font-sans-clean mt-0.5 uppercase tracking-wide">
                    {d.note}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. VASTU SERVICES
      ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[#022b27] text-white relative overflow-hidden">
        {/* decorative glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9a45c]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#c9a45c]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.span {...fadeUp(0)} className="inline-block text-[0.72rem] uppercase tracking-[0.25em] font-semibold text-[#c9a45c] mb-3">
              Our Services
            </motion.span>
            <motion.h2 {...fadeUp(0.05)} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold">
              Vastu Services We Offer
            </motion.h2>
            <motion.p {...fadeUp(0.1)} className="mt-4 text-slate-300 max-w-xl mx-auto font-sans-clean text-sm sm:text-base leading-relaxed">
              From pre-purchase plot evaluation to post-construction assessments,
              we offer end-to-end Vastu guidance integrated with our construction
              expertise.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                {...fadeUp(i * 0.07)}
                className="bg-white/5 border border-white/10 hover:border-[#c9a45c]/40 rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300 hover:bg-white/8 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#c9a45c]/10 flex items-center justify-center text-2xl">
                  {svc.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold text-white group-hover:text-[#c9a45c] transition-colors">
                  {svc.title}
                </h3>
                <p className="text-slate-300 font-sans-clean text-sm leading-relaxed flex-1">
                  {svc.desc}
                </p>
                <ModalTrigger variant="outline" size="sm">
                  Book Consultation
                </ModalTrigger>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. CONSULTATION PROCESS
      ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span {...fadeUp(0)} className="inline-block text-[0.72rem] uppercase tracking-[0.25em] font-semibold text-[#c9a45c] mb-3">
              How It Works
            </motion.span>
            <motion.h2 {...fadeUp(0.05)} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022b27]">
              Our Consultation Process
            </motion.h2>
          </div>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a45c]/30 to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  {...fadeUp(i * 0.1)}
                  className="flex flex-col items-center text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#022b27] flex items-center justify-center border-4 border-[#fbfbf9] shadow-lg flex-shrink-0">
                    <span className="font-brand text-[#c9a45c] text-lg font-bold">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#022b27]">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 font-sans-clean text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div {...fadeUp(0.3)} className="text-center mt-14">
            <ModalTrigger variant="primary" size="lg">
              Start Your Consultation
            </ModalTrigger>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. MD LEADERSHIP QUOTE & DIRECTOR PROFILE
      ══════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#fbfbf9] relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#c9a45c]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
            
            {/* ── Left Column: Director's Square Executive Photograph (~40%) ── */}
            <motion.div
              {...fadeUp(0)}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-square group">
                {/* Decorative ambient backdrop */}
                <div className="absolute -inset-2.5 rounded-3xl bg-gradient-to-tr from-[#c9a45c]/30 via-transparent to-[#022b27]/10 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Outer frame with subtle gold border & shadow */}
                <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#c9a45c]/35 bg-white ring-1 ring-black/5">
                  <Image
                    src={COMPANY.directorPhoto || "/images/director-shashidhar.jpg"}
                    alt={`${COMPANY.md} - ${COMPANY.title}, Cosmic Homes`}
                    fill
                    className="object-cover object-[center_16%] transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 480px"
                    priority
                    quality={95}
                  />

                  {/* Gentle gradient overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#022b27]/60 via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Corner Accent Badge */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 p-3 sm:p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#c9a45c]/30 shadow-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center text-white shrink-0 shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase font-bold tracking-wider text-[#c9a45c]">
                        Founder &amp; Managing Director
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-[#022b27]">
                        D K Shashidhar &bull; Cosmic Homes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Right Column: Leadership Narrative & Philosophy (~60%) ── */}
            <motion.div
              {...fadeUp(0.15)}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              {/* Eyebrow tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a45c]/10 border border-[#c9a45c]/25 w-fit mb-4">
                <span className="w-2 h-2 rounded-full bg-[#c9a45c]" />
                <span className="text-[#c9a45c] font-semibold text-xs uppercase tracking-[0.2em]">
                  Leadership &amp; Vision
                </span>
              </div>

              {/* Director Name & Title */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#022b27] tracking-tight">
                {COMPANY.md}
              </h2>
              <p className="text-[#c9a45c] font-sans text-sm sm:text-base font-semibold tracking-wide uppercase mt-1">
                {COMPANY.title}, Cosmic Homes
              </p>

              {/* Elegant divider */}
              <div className="w-16 h-0.5 bg-gradient-to-r from-[#c9a45c] to-transparent my-5" />

              {/* Leadership Philosophy Blockquote */}
              <div className="relative pl-5 sm:pl-6 border-l-2 border-[#c9a45c] my-4 bg-[#c9a45c]/[0.03] py-3 pr-4 rounded-r-xl">
                <span className="absolute -top-3 -left-2.5 font-serif text-5xl text-[#c9a45c]/25 select-none pointer-events-none">
                  &ldquo;
                </span>
                <blockquote className="font-serif text-lg sm:text-xl text-[#022b27] italic leading-relaxed font-normal">
                  &ldquo;Every home we build is a promise to the family that will
                  live in it. When we align that home with the forces of nature
                  through Vastu, we honour not just the structure, but the life
                  that unfolds within it.&rdquo;
                </blockquote>
              </div>

              {/* Executive Biography */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                With over 12 years of hands-on expertise shaping Bengaluru&apos;s residential landscape, 
                D K Shashidhar leads Cosmic Homes with an unyielding dedication to structural integrity, 
                transparent turnkey execution, and authentic Vastu Shastra principles. His customer-first 
                philosophy ensures that each home is thoughtfully engineered for lifelong harmony, enduring 
                quality, and complete peace of mind for every homeowner.
              </p>

              {/* Credibility Highlights Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white border border-[#c9a45c]/20 shadow-sm">
                  <span className="block font-serif text-xl sm:text-2xl font-bold text-[#022b27]">12+</span>
                  <span className="text-xs text-slate-500 font-medium">Years in Bengaluru</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#c9a45c]/20 shadow-sm">
                  <span className="block font-serif text-xl sm:text-2xl font-bold text-[#022b27]">100%</span>
                  <span className="text-xs text-slate-500 font-medium">Vastu-Aligned Planning</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#c9a45c]/20 shadow-sm col-span-2 sm:col-span-1">
                  <span className="block font-serif text-xl sm:text-2xl font-bold text-[#022b27]">Turnkey</span>
                  <span className="text-xs text-slate-500 font-medium">Complete On-Time Delivery</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          7. WHY CHOOSE US
      ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span {...fadeUp(0)} className="inline-block text-[0.72rem] uppercase tracking-[0.25em] font-semibold text-[#c9a45c] mb-3">
              Why Cosmic Homes
            </motion.span>
            <motion.h2 {...fadeUp(0.05)} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022b27]">
              What Makes Us Different
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp(i * 0.07)}
                className="card-editorial rounded-2xl p-7 flex gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-[#022b27]/5 flex items-center justify-center text-2xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#022b27] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 font-sans-clean text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          8. FAQ ACCORDION
      ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[#fbfbf9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.span {...fadeUp(0)} className="inline-block text-[0.72rem] uppercase tracking-[0.25em] font-semibold text-[#c9a45c] mb-3">
              FAQs
            </motion.span>
            <motion.h2 {...fadeUp(0.05)} className="font-serif text-3xl sm:text-4xl font-semibold text-[#022b27]">
              Frequently Asked Questions
            </motion.h2>
          </div>

          <motion.div {...fadeUp(0.1)} className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          9. FINAL CTA BANNER
      ══════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 bg-[#022b27] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a45c]/8 rounded-full blur-3xl" />
        </div>
        {/* Gold top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a45c]/50 to-transparent" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span {...fadeUp(0)} className="inline-block text-[0.72rem] uppercase tracking-[0.3em] font-semibold text-[#c9a45c] mb-4">
            Ready to Begin?
          </motion.span>
          <motion.h2 {...fadeUp(0.05)} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-5 leading-[1.15]">
            Build Your Vastu-Aligned{" "}
            <span className="text-gold-gradient italic font-normal">
              Dream Home
            </span>{" "}
            with Us
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="text-slate-300 font-sans-clean text-sm sm:text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Contact our team today for a personalised consultation. We'll
            review your requirements, plot details, and architectural plans to
            provide honest, practical Vastu guidance — integrated with our
            complete home building service.
          </motion.p>
          <motion.div
            {...fadeUp(0.15)}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <ModalTrigger variant="primary" size="lg">
              Get a Vastu Consultation
            </ModalTrigger>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white text-xs uppercase tracking-[0.16em] font-semibold hover:border-[#c9a45c]/60 hover:text-[#c9a45c] transition-all duration-300"
            >
              View Contact Details
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Contact details strip */}
          <motion.div {...fadeUp(0.2)} className="mt-12 flex flex-wrap items-center justify-center gap-6 text-slate-400 font-sans-clean text-sm">
            <a href={`tel:${COMPANY.primaryPhone}`} className="flex items-center gap-2 hover:text-[#c9a45c] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {COMPANY.phones[0]}
            </a>
            <span className="text-white/20">|</span>
            <a href={`tel:${COMPANY.phones[1]}`} className="flex items-center gap-2 hover:text-[#c9a45c] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {COMPANY.phones[1]}
            </a>
            <span className="text-white/20">|</span>
            <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-[#c9a45c] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {COMPANY.email}
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
