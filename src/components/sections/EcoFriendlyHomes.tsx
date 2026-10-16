"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const features = [
  { title: "Natural Lighting", desc: "Maximizing daylight through thoughtful window placement and orientation.", icon: "☀️" },
  { title: "Cross Ventilation", desc: "Designing for natural airflow to keep spaces cool and comfortable.", icon: "\u{1F33F}" },
  { title: "Rainwater Harvesting", desc: "Collecting and reusing rainwater for sustainable water management.", icon: "\u{1F4A7}" },
  { title: "Energy-Efficient Design", desc: "Reducing energy consumption through smart design choices.", icon: "⚡" },
  { title: "Sustainable Materials", desc: "Using eco-friendly and responsibly sourced construction materials.", icon: "\u{1F331}" },
  { title: "Passive Cooling", desc: "Leveraging design elements to reduce heat gain naturally.", icon: "\u{1F343}" },
];

export default function EcoFriendlyHomes() {
  const { ref, visible } = useInView(0.1);

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-section-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-teal-500/[0.02] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-teal-500 font-medium text-xs uppercase tracking-[0.2em] mb-4">
            Sustainable Living
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Build Better. <span className="text-teal-500">Live Greener.</span>
          </h2>
          <p className="text-navy-muted max-w-2xl mx-auto">
            We integrate sustainable design principles into every project — creating homes that are gentle on the environment without compromising on comfort or style.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="card-light p-7 h-full group">
                <span className="text-3xl mb-5 block">{f.icon}</span>
                <h3 className="font-heading text-xl font-bold text-navy mb-2 group-hover:text-teal-500 transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="text-navy-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
