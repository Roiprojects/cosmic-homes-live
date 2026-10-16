"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { housePlans, PLOT_SIZES, FLOOR_OPTIONS, STYLE_OPTIONS } from "@/data/housePlans";
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export default function HousePlanFilters() {
  const [plotFilter, setPlotFilter] = useState("All");
  const [floorFilter, setFloorFilter] = useState("Any");
  const [styleFilter, setStyleFilter] = useState("All");
  const { ref: headerRef, visible: headerVisible } = useInView(0.1);

  const filtered = useMemo(() => {
    return housePlans.filter((plan) => {
      if (plotFilter !== "All" && plan.plotSize !== plotFilter) return false;
      if (floorFilter !== "Any" && plan.floors !== Number(floorFilter)) return false;
      if (styleFilter !== "All" && plan.style !== styleFilter) return false;
      return true;
    });
  }, [plotFilter, floorFilter, styleFilter]);

  return (
    <section className="relative py-24 md:py-32 bg-[#0a1220] overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gold/[0.02] blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <span className="inline-block text-gold font-medium text-xs uppercase tracking-[0.2em] mb-4">
            House Plans
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Explore Home <span className="gradient-text">Designs</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse our collection of thoughtfully designed home plans. Use the filters
            to find a design that matches your requirements.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-2xl p-5 md:p-8 mb-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Select
              label="Plot Size"
              value={plotFilter}
              onChange={(e) => setPlotFilter(e.target.value)}
              options={PLOT_SIZES.map((s) => ({ value: s, label: s === "All" ? "All Plot Sizes" : `${s} sq.ft` }))}
            />
            <Select
              label="Floors"
              value={floorFilter}
              onChange={(e) => setFloorFilter(e.target.value)}
              options={FLOOR_OPTIONS.map((f) => ({ value: f, label: f === "Any" ? "Any Floors" : `${f} Floor${f !== '1' ? 's' : ''}` }))}
            />
            <Select
              label="Style"
              value={styleFilter}
              onChange={(e) => setStyleFilter(e.target.value)}
              options={STYLE_OPTIONS.map((s) => ({ value: s, label: s === "All" ? "All Styles" : s }))}
            />
          </div>
        </motion.div>

        {/* Plans grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <p className="text-gray-500">No plans match your filters. Try adjusting your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group"
              >
                <div className="relative glass-card overflow-hidden h-full flex flex-col">
                  <div className="aspect-[4/3] bg-[#0B1930]/50 overflow-hidden">
                    {plan.image ? (
                      <img
                        src={plan.image}
                        alt={plan.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
                        <span className="text-white/10 font-heading text-3xl font-bold">
                          {plan.plotSize}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-heading text-lg font-bold text-white mb-3">
                      {plan.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge>{plan.plotSize} Plot</Badge>
                      <Badge>G+{plan.floors}</Badge>
                      <Badge>{plan.bedrooms} BHK</Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-5 flex-1 leading-relaxed">{plan.description}</p>
                    <Link href="/contact" className="flex-1">
                      <button className="w-full btn-primary text-sm py-2.5 justify-center">
                        Enquire Now
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
