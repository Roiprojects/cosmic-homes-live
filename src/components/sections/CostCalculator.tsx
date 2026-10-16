"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const cityOptions = [
  { value: "", label: "Select city" },
  { value: "Bengaluru", label: "Bengaluru" },
  { value: "Mysuru", label: "Mysuru" },
  { value: "Chennai", label: "Chennai" },
  { value: "Coimbatore", label: "Coimbatore" },
];

const constructionTypeOptions = [
  { value: "", label: "Select type" },
  { value: "G+1", label: "G+1" },
  { value: "G+2", label: "G+2" },
  { value: "G+3", label: "G+3" },
  { value: "Residence", label: "Residence" },
];

const qualityOptions = [
  { label: "Essential", rate: 1850 },
  { label: "Premium", rate: 2200 },
  { label: "Luxury", rate: 3000 },
];

const floorMultiplier: Record<string, number> = {
  "G+1": 1,
  "G+2": 0.92,
  "G+3": 0.88,
  Residence: 1.05,
};

export default function CostCalculator() {
  const { ref, visible } = useInView(0.1);
  const [city, setCity] = useState("");
  const [plotArea, setPlotArea] = useState("");
  const [floors, setFloors] = useState("");
  const [builtUpArea, setBuiltUpArea] = useState("");
  const [constructionType, setConstructionType] = useState("");
  const [quality, setQuality] = useState(qualityOptions[1]);

  const estimate = useMemo(() => {
    const area = parseFloat(builtUpArea);
    if (!area || !quality || !constructionType) return null;
    const base = area * quality.rate;
    const mult = floorMultiplier[constructionType] ?? 1;
    return {
      low: Math.round(base * mult * 0.9),
      high: Math.round(base * mult * 1.1),
      timeline: constructionType === "Residence" ? "18-24 months" : constructionType === "G+3" ? "24-30 months" : "12-18 months",
    };
  }, [builtUpArea, quality, constructionType]);

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-section-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-teal-500/[0.02] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-block text-teal-500 font-medium text-xs uppercase tracking-[0.2em] mb-4">
            Cost Estimator
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Estimate Your <span className="text-teal-500">Construction Cost</span>
          </h2>
          <p className="text-navy-muted max-w-2xl mx-auto">
            Get an indicative estimate for your home construction. Final pricing depends on design, specifications, site conditions and materials.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="card-light rounded-2xl p-7 md:p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-navy-muted mb-2">City</label>
                <select value={city} onChange={(e) => setCity(e.target.value)} className="input-light w-full">
                  <option value="">Select city</option>
                  {cityOptions.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-muted mb-2">Plot Area (sq.ft)</label>
                <input type="number" value={plotArea} onChange={(e) => setPlotArea(e.target.value)} placeholder="e.g., 1200" className="input-light w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-muted mb-2">Built-up Area (sq.ft)</label>
                <input type="number" value={builtUpArea} onChange={(e) => setBuiltUpArea(e.target.value)} placeholder="e.g., 2400" className="input-light w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-muted mb-2">Number of Floors</label>
                <select value={floors} onChange={(e) => setFloors(e.target.value)} className="input-light w-full">
                  <option value="">Select</option>
                  <option value="1">1 Floor</option>
                  <option value="2">2 Floors</option>
                  <option value="3">3 Floors</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-muted mb-2">Construction Type</label>
                <select value={constructionType} onChange={(e) => setConstructionType(e.target.value)} className="input-light w-full">
                  <option value="">Select type</option>
                  {constructionTypeOptions.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-navy-muted mb-2">Quality Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {qualityOptions.map((q) => (
                    <button
                      key={q.label}
                      onClick={() => setQuality(q)}
                      className={`py-3 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                        quality.label === q.label
                          ? "bg-teal-500 text-white border-teal-500 shadow-lg shadow-teal-500/20"
                          : "bg-gray-50 text-navy-muted border-gray-200 hover:border-teal-500/30"
                      }`}
                    >
                      {q.label}
                      <span className="block text-xs mt-0.5 opacity-70">₹{q.rate}/sq.ft</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:sticky lg:top-28"
          >
            <div className="card-light rounded-2xl p-7 md:p-8">
              <h3 className="font-heading text-xl font-bold text-navy mb-6">Estimated Cost</h3>

              {estimate ? (
                <div className="space-y-5">
                  <div>
                    <p className="text-navy-muted text-xs uppercase tracking-wider mb-1">Estimated Cost Range</p>
                    <p className="font-heading text-3xl md:text-4xl font-bold text-teal-500">
                      ₹{estimate.low.toLocaleString("en-IN")} — ₹{estimate.high.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="h-px bg-gray-200" />
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="text-navy-muted text-xs uppercase tracking-wider mb-1">Built-up Area</p>
                      <p className="text-navy font-semibold text-lg">{parseFloat(builtUpArea).toLocaleString("en-IN")} sq.ft</p>
                    </div>
                    <div>
                      <p className="text-navy-muted text-xs uppercase tracking-wider mb-1">Rate Applied</p>
                      <p className="text-navy font-semibold text-lg">₹{quality.rate}/sq.ft</p>
                    </div>
                    <div>
                      <p className="text-navy-muted text-xs uppercase tracking-wider mb-1">Est. Timeline</p>
                      <p className="text-navy font-semibold text-lg">{estimate.timeline}</p>
                    </div>
                    <div>
                      <p className="text-navy-muted text-xs uppercase tracking-wider mb-1">Package</p>
                      <p className="text-navy font-semibold text-lg">{quality.label}</p>
                    </div>
                  </div>
                  <div className="h-px bg-gray-200" />
                  <a href="/contact">
                    <button className="bg-teal-500 text-white font-semibold w-full justify-center py-3 rounded-xl hover:bg-teal-600 transition-colors text-sm inline-flex items-center justify-center gap-2">
                      Get a Detailed Quote
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </a>
                  <p className="text-xs text-gray-400 text-center">
                    Indicative estimate only. Final pricing depends on design, specifications, site conditions and materials.
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-teal-500/5 border border-teal-500/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-teal-500/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                  </div>
                  <p className="text-navy-muted text-sm">Fill in your details to see an estimated cost range.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
