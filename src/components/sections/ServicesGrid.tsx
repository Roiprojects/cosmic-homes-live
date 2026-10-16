"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import ModalTrigger from "@/components/ui/ModalTrigger";

// Minimal, elegant architectural vector icons for each service
const ServiceIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "architecture":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      );
    case "construction":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m16.5-18v18M6.75 6.75h10.5m-10.5 4.5h10.5m-10.5 4.5h10.5M9.75 3v18m4.5-18v18" />
        </svg>
      );
    case "interior":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.25 4.5h16.5M7.5 12V4.5m9 7.5V4.5" />
        </svg>
      );
    case "structural":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18m0-18l8.5 15H3.5L12 3zm0 4.5v9M7.5 18l4.5-7.5 4.5 7.5" />
        </svg>
      );
    case "project-management":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zM3.75 6.75h16.5M3.75 17.25h16.5" />
        </svg>
      );
    case "renovation":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m6-6H6" />
        </svg>
      );
  }
};

export default function ServicesGrid() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#022b27] text-white overflow-hidden" id="services">
      {/* Background Architectural Grid Accent (Matching Hero theme exactly) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#c9a45c]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a45c]" />
            <span className="text-[0.68rem] uppercase tracking-[0.22em] font-semibold text-slate-200">
              End-to-End Capabilities
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-semibold leading-[1.15]"
          >
            OUR <span className="italic font-normal text-gold-gradient">SERVICES</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base lg:text-lg mt-4 font-sans-clean max-w-2xl mx-auto leading-relaxed font-normal"
          >
            From thoughtful planning to complete construction, we bring every detail of your dream home together with precision and care.
          </motion.p>
        </div>

        {/* 6-Service Structured Grid: 3 columns Desktop, 2 columns Tablet, 1 column Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative bg-[#033630]/90 hover:bg-[#06443c] border border-white/15 hover:border-[#c9a45c]/60 rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]"
            >
              <div>
                {/* Header: Icon + Numerical Index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 text-[#dfbc77] flex items-center justify-center group-hover:bg-[#c9a45c] group-hover:text-[#022b27] group-hover:border-[#c9a45c] transition-all duration-300 shadow-sm">
                    <ServiceIcon type={service.icon} />
                  </div>
                  <span className="font-serif text-lg font-bold text-white/40 group-hover:text-[#c9a45c] transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="font-serif text-xl sm:text-[1.35rem] font-semibold text-white mb-3 group-hover:text-gold-gradient transition-colors">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans-clean font-normal min-h-[42px]">
                  {service.shortDescription}
                </p>

                {/* Clean Feature Deliverables List */}
                <ul className="space-y-2.5 pt-4 border-t border-white/10 mb-6 font-sans-clean">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2.5 text-xs text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dfbc77] flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action / Learn More Link */}
              <div className="pt-2">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#dfbc77] hover:text-white transition-colors"
                >
                  Learn More
                  <svg
                    className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Service Spotlight: Architectural Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 lg:mt-16 bg-gradient-to-br from-[#043833] to-[#022b27] border border-white/15 rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle accent corner glow */}
          <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-[#c9a45c]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content Area */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a45c]/15 border border-[#c9a45c]/30 text-[#c9a45c] text-[0.68rem] uppercase tracking-[0.2em] font-semibold">
                Featured Flagship Offering
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-white leading-tight">
                Complete Home <span className="italic font-normal text-gold-gradient">Construction</span>
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans-clean max-w-xl">
                From the first consultation to final handover, we manage every stage of your home construction with transparency, precision and attention to detail.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/services"
                  className="px-6 py-3 rounded-full bg-gold-gradient text-white text-xs uppercase tracking-[0.16em] font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  Explore Our Services
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <ModalTrigger variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  Book Free Consultation
                </ModalTrigger>
              </div>
            </div>

            {/* Right Architectural Image Showcase */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/15 group">
                <Image
                  src="/images/villa-golden-jali-1.png"
                  alt="High-end turnkey architectural home built by Cosmic Homes"
                  fill
                  className="object-cover object-top sm:object-[center_top] transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 500px"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#022b27]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-sans-clean text-slate-200 backdrop-blur-md bg-black/30 px-3.5 py-2 rounded-lg border border-white/10 flex items-center justify-between">
                  <span className="font-medium">Turnkey Residential Execution</span>
                  <span className="text-[#c9a45c] font-semibold">Bengaluru</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

