"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { packages } from "@/data/packages";
import { projects, PROJECT_CATEGORIES } from "@/data/projects";
import { GALLERY_PROPERTIES } from "@/data/propertyGallery";
import { useEnquiryModal } from "@/components/layout/EnquiryModalProvider";
import ModalTrigger from "@/components/ui/ModalTrigger";

type Project = typeof projects[0];

/* ─────────────────────────────────────────── */
/* SPECIFICATION COMPARISON DATA (from uploaded image) */
/* ─────────────────────────────────────────── */
const comparisonFeatures = [
  { name: "Architectural & Structural Design", essentia: true, sankalpa: true, vimana: true },
  { name: "Vastu Planning & Alignment", essentia: true, sankalpa: true, vimana: true },
  { name: "RCC Frame & High-Grade Steel", essentia: true, sankalpa: true, vimana: true },
  { name: "Premium Flooring & Tile Finishes", essentia: "Vitrified", sankalpa: "Italian Marble", vimana: "Imported Onyx & Italian" },
  { name: "Hardwood Joinery & Teak Doors", essentia: "Standard", sankalpa: "Teak Veneer", vimana: "Solid Burma Teak" },
  { name: "Branded Plumbing & Sanitaryware", essentia: "Jaquar / Parryware", sankalpa: "Kohler / Grohe", vimana: "Villeroy & Boch / Axor" },
  { name: "Electrical & Modular Automation", essentia: "Standard", sankalpa: "Smart Automation Ready", vimana: "Full Smart Home Integrated" },
  { name: "Designer Modular Kitchen Provision", essentia: false, sankalpa: true, vimana: true },
  { name: "False Ceiling with Designer Lighting", essentia: false, sankalpa: true, vimana: true },
  { name: "Landscape & Terrace Garden Design", essentia: false, sankalpa: true, vimana: true },
  { name: "Acoustic Insulation & High-End Glazing", essentia: false, sankalpa: false, vimana: true },
  { name: "Dedicated Senior Supervision & 10-Yr Warranty", essentia: true, sankalpa: true, vimana: true },
];

export default function PackagesMergedView() {
  const { openModal } = useEnquiryModal();
  const [activeTab, setActiveTab] = useState("all");
  const [popupProject, setPopupProject] = useState<Project | null>(null);
  const [activeView, setActiveView] = useState<"both" | "packages" | "gallery">("both");

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => {
          if (activeTab === "featured") return p.badge === "Featured" || p.badge === "Premium+";
          return p.area.toLowerCase() === activeTab;
        });

  return (
    <div className="bg-[#fbfbf9] min-h-screen text-[#1a242f]">
      {/* ══════════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 bg-[#022b27] text-white overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#c9a45c]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[0.72rem] uppercase tracking-[0.25em] font-semibold text-[#c9a45c] mb-3">
              Tailored Living · Architectural Distinction
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4 leading-tight">
              Construction Packages & <span className="text-gold-gradient italic font-normal">Design Gallery</span>
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base font-sans-clean leading-relaxed mb-8">
              Explore our transparent construction tiers and completed luxury residences across Bengaluru. Designed with Vastu precision, turnkey certainty, and master craftsmanship.
            </p>

            {/* Quick in-page filter / anchor buttons */}
            <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
              <button
                onClick={() => setActiveView("both")}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeView === "both"
                    ? "bg-gold-gradient text-white shadow-md"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                All Sections
              </button>
              <a
                href="#packages-section"
                onClick={() => setActiveView("packages")}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeView === "packages"
                    ? "bg-gold-gradient text-white shadow-md"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Packages ({packages.length})
              </a>
              <a
                href="#gallery-section"
                onClick={() => setActiveView("gallery")}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeView === "gallery"
                    ? "bg-gold-gradient text-white shadow-md"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Gallery Showcase ({projects.length})
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 1: PACKAGES CARDS & PRICING
      ══════════════════════════════════════════════ */}
      {(activeView === "both" || activeView === "packages") && (
        <section id="packages-section" className="py-20 lg:py-28 relative">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[0.72rem] uppercase tracking-[0.25em] font-semibold text-[#c9a45c] block mb-2">
                Transparent & All-Inclusive
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022b27]">
                The Construction Packages
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto font-sans-clean text-sm sm:text-base mt-3">
                Transparent, all-inclusive pricing crafted with the same patience and precision. Choose the package that matches your dream home vision.
              </p>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 items-stretch">
              {packages.map((pkg, idx) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative rounded-3xl p-7 lg:p-8 flex flex-col justify-between transition-all duration-400 ${
                    pkg.highlighted
                      ? "bg-white border-2 border-[#c9a45c] shadow-[0_20px_50px_rgba(201,164,92,0.18)] lg:-translate-y-3"
                      : "card-editorial bg-white border border-slate-200"
                  }`}
                >
                  {pkg.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-gold-gradient text-white text-[0.68rem] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                        Most Preferred
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Roman Numeral header style as in reference */}
                    <div className="text-slate-400 font-serif italic text-sm mb-1">
                      {idx === 0 ? "Tier I" : idx === 1 ? "Tier II" : idx === 2 ? "Tier III" : "Tier IV"}
                    </div>
                    <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-[#022b27] mb-2">
                      {pkg.name}
                    </h3>
                    
                    <div className="my-4 pb-4 border-b border-slate-100">
                      <span className="text-xs uppercase tracking-wider text-slate-400 block font-sans-clean">
                        Starts At
                      </span>
                      <span className="font-serif text-2xl lg:text-3xl font-bold text-[#022b27] block mt-0.5">
                        {pkg.startingPrice}
                      </span>
                      {pkg.idealFor && (
                        <span className="inline-block mt-2 text-[0.7rem] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                          {pkg.idealFor}
                        </span>
                      )}
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm font-sans-clean leading-relaxed mb-6">
                      {pkg.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2.5 mb-8">
                      <p className="text-[0.68rem] uppercase tracking-widest font-bold text-[#022b27]">
                        Package Inclusions:
                      </p>
                      {pkg.features.slice(0, 8).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-600 font-sans-clean">
                          <span className="text-[#c9a45c] text-sm leading-none mt-0.5 font-bold">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                      {pkg.features.length > 8 && (
                        <p className="text-[0.7rem] text-[#c9a45c] font-semibold pt-1">
                          + {pkg.features.length - 8} more specifications
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-auto">
                    <button
                      type="button"
                      onClick={openModal}
                      className={`w-full py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
                        pkg.highlighted
                          ? "bg-gold-gradient text-white hover:brightness-105 hover:shadow-xl hover:-translate-y-0.5 ring-2 ring-[#c9a45c]/30"
                          : "bg-gold-gradient text-white hover:brightness-105 hover:shadow-lg hover:-translate-y-0.5"
                      }`}
                    >
                      <span>Book Consultation</span>
                      <svg className="w-3.5 h-3.5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ─── SPECIFICATIONS COMPARISON TABLE ─── */}
            <div className="mt-20 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="text-center mb-8">
                <span className="text-[0.7rem] uppercase tracking-[0.2em] font-semibold text-[#c9a45c]">
                  At A Glance
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#022b27] mt-1">
                  Package Specifications Comparison
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="border-b-2 border-slate-100 text-xs uppercase tracking-wider text-slate-400 font-sans-clean">
                      <th className="py-4 px-4 font-semibold text-[#022b27]">Feature / Specification</th>
                      <th className="py-4 px-4 font-semibold text-center">Essential</th>
                      <th className="py-4 px-4 font-semibold text-center text-[#c9a45c]">Premium (Most Popular)</th>
                      <th className="py-4 px-4 font-semibold text-center">Luxury / Custom</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-sans-clean text-slate-600">
                    {comparisonFeatures.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-[#022b27]">{row.name}</td>
                        <td className="py-3.5 px-4 text-center">
                          {typeof row.essentia === "boolean" ? (
                            row.essentia ? (
                              <span className="text-emerald-600 font-bold">✓</span>
                            ) : (
                              <span className="text-slate-300">—</span>
                            )
                          ) : (
                            <span className="text-slate-600">{row.essentia}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center font-medium bg-[#fcf9f2]/40">
                          {typeof row.sankalpa === "boolean" ? (
                            row.sankalpa ? (
                              <span className="text-[#c9a45c] font-bold">✓</span>
                            ) : (
                              <span className="text-slate-300">—</span>
                            )
                          ) : (
                            <span className="text-[#846320]">{row.sankalpa}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {typeof row.vimana === "boolean" ? (
                            row.vimana ? (
                              <span className="text-[#022b27] font-bold">✓</span>
                            ) : (
                              <span className="text-slate-300">—</span>
                            )
                          ) : (
                            <span className="text-[#022b27] font-medium">{row.vimana}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 text-center pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans-clean">
                <p>All plans include full transparency, single-point accountability, and weekly digital site reports.</p>
                <ModalTrigger variant="outline" size="sm">
                  Request Custom BOQ Estimate
                </ModalTrigger>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          SECTION 2: MERGED DESIGN GALLERY SHOWCASE
          (2 images per row on desktop as requested)
      ══════════════════════════════════════════════ */}
      {(activeView === "both" || activeView === "gallery") && (
        <section id="gallery-section" className="py-20 lg:py-28 bg-[#f5f5f0] border-t border-slate-200">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[0.72rem] uppercase tracking-[0.25em] font-semibold text-[#c9a45c] block mb-2">
                Realised Architecture · Bengaluru
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022b27]">
                Architectural Design Gallery
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto font-sans-clean text-sm sm:text-base mt-3">
                Click any house design to view complete architectural details, specifications, room configurations, and request a personalized consultation.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === "all"
                    ? "bg-[#022b27] text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                }`}
              >
                All Designs ({projects.length})
              </button>
              {PROJECT_CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveTab(cat.slug)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    activeTab === cat.slug
                      ? "bg-[#022b27] text-white shadow-md"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Responsive Grid: 2 per row on desktop (lg:grid-cols-2) as explicitly requested */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              <AnimatePresence>
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, delay: idx * 0.05 }}
                  >
                    <div
                      onClick={() => setPopupProject(project)}
                      className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-slate-200/80 transition-all duration-500 flex flex-col"
                    >
                      {/* Image container */}
                      <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-slate-900">
                        <Image
                          src={project.images[0]}
                          alt={project.title}
                          fill
                          className="object-cover object-top sm:object-[center_top] transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          quality={90}
                        />
                        {/* Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <span className="px-3.5 py-1 rounded-full text-[0.68rem] font-bold uppercase tracking-wider bg-white/95 text-[#022b27] shadow-sm">
                            {project.badge || project.type}
                          </span>
                          <span className="px-3 py-1 rounded-full text-[0.68rem] font-medium bg-[#022b27]/80 text-[#dfbc77] backdrop-blur-sm border border-white/10">
                            {project.area}
                          </span>
                        </div>

                        {/* Zoom Icon on hover */}
                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-xl text-white">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>

                        {/* Title over image */}
                        <div className="absolute bottom-5 left-5 right-5 text-white">
                          <p className="text-[0.72rem] uppercase tracking-widest text-[#c9a45c] font-semibold flex items-center gap-1.5 mb-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {project.location}
                          </p>
                          <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight text-white drop-shadow-md">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                        <p className="text-slate-600 text-sm font-sans-clean leading-relaxed mb-6 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Specifications Chips */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                          {project.features.map((feat, fI) => (
                            <div key={fI} className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-center">
                              <span className="block text-[0.75rem] font-semibold text-[#022b27] font-sans-clean">
                                {feat}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Bottom Actions */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                          <span className="text-xs uppercase tracking-wider font-semibold text-[#022b27] group-hover:text-[#c9a45c] transition-colors inline-flex items-center gap-1">
                            View House Details & Plan
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPopupProject(project);
                            }}
                            className="px-4 py-2 rounded-full bg-[#022b27] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#c9a45c] transition-colors"
                          >
                            Explore
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          SECTION 3: PORTFOLIO PROPERTIES COMPONENT
      ══════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[0.72rem] uppercase tracking-[0.25em] font-semibold text-[#c9a45c] block mb-2">
                Catalogue Highlights
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#022b27]">
                Featured Residences by Tier
              </h3>
            </div>
            <p className="text-slate-500 font-sans-clean text-sm max-w-md">
              Each residence corresponds to our construction packages with curated materials and personalized architectural drawings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_PROPERTIES.slice(0, 9).map((prop) => (
              <div
                key={prop.id}
                className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={prop.image}
                    alt={prop.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-white/90 text-[#022b27]">
                    {prop.category}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs text-[#c9a45c] font-medium">{prop.location}</p>
                    <h4 className="font-serif text-lg font-semibold">{prop.name}</h4>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between text-xs text-slate-600 font-sans-clean">
                  <span>{prop.area} · {prop.floors}</span>
                  <span className="font-semibold text-[#022b27]">{prop.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          POPUP MODAL (Click to view full details + Consultation)
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {popupProject && (
          <MergedProjectPopup project={popupProject} onClose={() => setPopupProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* PROJECT POPUP MODAL                         */
/* ─────────────────────────────────────────── */
function MergedProjectPopup({ project, onClose }: { project: Project; onClose: () => void }) {
  const [imgIdx, setImgIdx] = useState(0);
  const { openModal } = useEnquiryModal();
  const images = project.images;
  const prev = () => setImgIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setImgIdx((i) => (i + 1) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 lg:p-10"
      onClick={onClose}
    >
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-[#011f1c]/85 backdrop-blur-md" />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 bg-[#fbfbf9] rounded-3xl overflow-hidden shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col lg:flex-row border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT: Image Carousel - Full Uncropped Architectural View */}
        <div className="relative w-full lg:w-[58%] h-[48vh] sm:h-[58vh] lg:h-auto lg:min-h-[540px] bg-slate-950 flex-shrink-0 p-3 sm:p-5 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={imgIdx}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-2 sm:p-4 flex items-center justify-center"
            >
              <Image
                src={images[imgIdx]}
                alt={project.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
                quality={95}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Badge */}
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-[#022b27] text-[0.65rem] font-bold uppercase tracking-wider shadow-sm">
            {project.badge || project.type}
          </span>

          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[0.65rem] font-mono font-semibold">
              {imgIdx + 1} / {images.length}
            </div>
          )}

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-[#c9a45c] backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-[#c9a45c] backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`relative w-12 h-8 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                    i === imgIdx ? "border-[#c9a45c] scale-110" : "border-white/40 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="48px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Project Information & Consultation */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#022b27] hover:bg-[#c9a45c] text-white flex items-center justify-center transition-all duration-300 shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-7 sm:p-8 lg:p-10 flex flex-col h-full justify-between">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.22em] font-semibold text-[#c9a45c] mb-2 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {project.location}
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#022b27] leading-tight mb-3">
                {project.title}
              </h2>
              <p className="text-slate-600 text-sm font-sans-clean leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="h-px bg-slate-200 mb-6" />

              {/* Specifications */}
              <div className="mb-6">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-slate-400 mb-3">
                  Key Specifications
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#c9a45c] flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-[#022b27] font-sans-clean">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-[#022b27]/8 text-[#022b27] text-xs font-semibold font-sans-clean">
                  {project.type}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#c9a45c]/10 text-[#7a5c20] text-xs font-semibold font-sans-clean">
                  {project.area} · Bengaluru
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onClose();
                  openModal();
                }}
                className="flex-1 text-center px-6 py-3.5 rounded-full bg-gold-gradient text-white text-xs font-semibold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Consultation For This Home
              </button>
              <Link
                href={`/projects/${project.slug}`}
                onClick={onClose}
                className="px-5 py-3.5 rounded-full border border-[#022b27] text-[#022b27] text-xs font-semibold uppercase tracking-wider hover:bg-[#022b27] hover:text-white transition-colors text-center"
              >
                Full Story
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
