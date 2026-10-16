"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

export default function ProjectTracking() {
  const { ref, visible } = useInView(0.15);

  return (
    <section ref={ref} className="relative py-20 md:py-28 overflow-hidden" style={{ background: "linear-gradient(135deg, #0B3D5F 0%, #0A4A6E 40%, #0C526B 100%)" }}>
      {/* Subtle pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Phone mockups */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center"
          >
            {/* Main phone */}
            <div className="relative w-[260px] md:w-[300px]">
              <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl shadow-black/40">
                <div className="bg-white rounded-[2rem] overflow-hidden aspect-[9/19]">
                  <div className="bg-gradient-to-b from-navy-800 to-navy-900 p-5 h-full flex flex-col">
                    {/* Status bar */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-white/60 text-[10px]">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-white/40 rounded-full" />
                        <div className="w-3 h-3 bg-white/40 rounded-full" />
                      </div>
                    </div>

                    {/* App header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white text-xs font-bold">Cosmic Homes</p>
                        <p className="text-white/50 text-[10px]">Project Tracker</p>
                      </div>
                    </div>

                    {/* Project card */}
                    <div className="bg-white/10 rounded-xl p-3 mb-3 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-teal-400 text-[9px] font-bold uppercase tracking-wider">Active Project</span>
                        <span className="text-white/40 text-[9px]">70% Complete</span>
                      </div>
                      <p className="text-white text-[11px] font-semibold mb-1">Modern Courtyard Residence</p>
                      <div className="w-full bg-white/10 rounded-full h-1.5">
                        <div className="bg-teal-400 h-1.5 rounded-full" style={{ width: "70%" }} />
                      </div>
                    </div>

                    {/* Updates */}
                    <div className="space-y-2">
                      {["Foundation work completed", "First floor slab in progress", "Electrical wiring started"].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-white/5 rounded-lg p-2 border border-white/5">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                          <span className="text-white/70 text-[10px]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification card */}
            <div className="absolute -right-4 md:-right-8 top-16 bg-white rounded-xl p-3 shadow-xl shadow-black/20 animate-float-slow hidden sm:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <p className="text-navy text-[10px] font-semibold">Update</p>
                  <p className="text-navy-muted text-[9px]">Brickwork started</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-teal-400 font-medium text-xs uppercase tracking-[0.2em] mb-4">
              Stay Connected
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white mb-5 leading-tight">
              Track Your Project <br />
              <span className="text-teal-400">In Real Time</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Stay updated every step of the way. Track construction progress, receive instant updates, and stay connected with your project from anywhere — all through our intuitive project tracker.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Real-time progress updates",
                "Photo & video progress reports",
                "Instant notifications on milestones",
                "Transparent payment tracking",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <a href="/how-it-works">
              <button className="bg-white text-navy-800 font-semibold px-7 py-3.5 rounded-xl hover:bg-gray-100 transition-all duration-300 text-sm hover:-translate-y-0.5 shadow-lg">
                Explore Our Process
              </button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
