"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const brands = [
  {
    name: "CREDAI",
    label: "Confederation of Real Estate Developers' Associations of India",
    svg: (
      <svg viewBox="0 0 140 40" className="w-28 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="138" height="38" rx="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <text x="70" y="17" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="700" letterSpacing="2">CONFEDERATION</text>
        <text x="70" y="30" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="800" letterSpacing="1">CREDAI</text>
        <circle cx="18" cy="12" r="4" fill="currentColor" opacity="0.15" />
        <path d="M16 12l2 2 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "RERA Karnataka",
    label: "Karnataka Real Estate Regulatory Authority",
    svg: (
      <svg viewBox="0 0 140 40" className="w-28 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="138" height="38" rx="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <text x="70" y="14" textAnchor="middle" fill="currentColor" fontSize="7.5" fontWeight="700" letterSpacing="1.5">GOVT. OF KARNATAKA</text>
        <text x="70" y="27" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="800" letterSpacing="0.5">RERA</text>
        <text x="70" y="36" textAnchor="middle" fill="currentColor" fontSize="6" opacity="0.7">REGISTERED</text>
        <rect x="8" y="5" width="12" height="12" rx="2" fill="currentColor" opacity="0.1" />
        <path d="M11 10l2.5 2.5L18 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "ISO Certified",
    label: "ISO 9001:2015 Quality Management",
    svg: (
      <svg viewBox="0 0 140 40" className="w-28 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="138" height="38" rx="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <text x="70" y="16" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="800" letterSpacing="1">ISO</text>
        <text x="70" y="28" textAnchor="middle" fill="currentColor" fontSize="6.5" fontWeight="500">9001:2015 CERTIFIED</text>
        <circle cx="16" cy="13" r="5" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <text x="16" y="16" textAnchor="middle" fill="currentColor" fontSize="6" fontWeight="700">ISO</text>
      </svg>
    ),
  },
  {
    name: "GRIHA",
    label: "Green Rating for Integrated Habitat Assessment",
    svg: (
      <svg viewBox="0 0 140 40" className="w-28 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="138" height="38" rx="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <text x="70" y="17" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="800" letterSpacing="0.5">GRIHA</text>
        <text x="70" y="28" textAnchor="middle" fill="currentColor" fontSize="6" fontWeight="500">GREEN BUILDING RATING</text>
        <path d="M12 20c0-5 4-9 8-10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        <path d="M12 20c3-1 6 1 8 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        <circle cx="16" cy="15" r="2" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    name: "KSPCB",
    label: "Karnataka State Pollution Control Board",
    svg: (
      <svg viewBox="0 0 140 40" className="w-28 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="138" height="38" rx="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <text x="70" y="15" textAnchor="middle" fill="currentColor" fontSize="7.5" fontWeight="700" letterSpacing="0.5">KARNATAKA STATE</text>
        <text x="70" y="27" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="800" letterSpacing="1">KSPCB</text>
        <circle cx="16" cy="21" r="5" fill="currentColor" opacity="0.08" />
        <path d="M13 21l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Bengaluru Ready",
    label: "Bengaluru-based Construction Excellence",
    svg: (
      <svg viewBox="0 0 140 40" className="w-28 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="138" height="38" rx="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <text x="70" y="14" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="600" letterSpacing="1">BENGALURU</text>
        <text x="70" y="26" textAnchor="middle" fill="currentColor" fontSize="8.5" fontWeight="800" letterSpacing="0.5">HOME BUILDER</text>
        <text x="70" y="35" textAnchor="middle" fill="currentColor" fontSize="6" opacity="0.6">EST. 2009</text>
        <rect x="10" y="7" width="7" height="8" rx="1" fill="currentColor" opacity="0.12" />
        <path d="M11 10h5M13 7v8" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    ),
  },
];

export default function BrandLogosSection() {
  const { ref, visible } = useInView(0.1);

  return (
    <section ref={ref} className="relative py-16 md:py-20 bg-[#060d1a] overflow-hidden">
      {/* Top/bottom dividers */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#060d1a] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[#060d1a] z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-gold/60 font-medium text-xs uppercase tracking-[0.25em]"
        >
          Trusted by Top Brands &amp; Organizations
        </motion.p>
      </div>

      {/* Marquee strip */}
      <div className="relative">
        <motion.div
          animate={{ x: [0, -560] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-10 whitespace-nowrap"
        >
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center w-36 h-14 rounded-xl bg-white/[0.02] border border-white/[0.06] text-gray-500 hover:text-gold hover:border-gold/20 hover:bg-gold/[0.04] transition-all duration-500 cursor-default"
              title={brand.label}
            >
              {brand.svg}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
