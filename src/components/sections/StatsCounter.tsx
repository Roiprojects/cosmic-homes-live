"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const stats = [
  { value: "1800+", label: "Homes Delivered" },
  { value: "18+", label: "Years of Excellence" },
  { value: "7.2M+", label: "Sq. Ft. Built" },
  { value: "95%", label: "Happy Homeowners" },
];

export default function StatsCounter() {
  const { ref, visible } = useInView(0.2);

  return (
    <section ref={ref} className="relative py-16 md:py-20 bg-navy-900 overflow-hidden">
      {/* Subtle bg texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/[0.04] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-white/50 text-xs sm:text-sm tracking-wide uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
