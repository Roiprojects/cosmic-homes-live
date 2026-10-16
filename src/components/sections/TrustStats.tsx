"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 200, suffix: "+", label: "Homes Built" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "On-Time Delivery" },
  { value: 4.9, suffix: "", label: "Client Rating" },
  { value: 10, suffix: " Yr", label: "Waterproofing Warranty" },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 });
  const displayed = useRef(0);

  useEffect(() => {
    if (!inView) return;
    const unsub = springValue.on("change", (latest) => {
      displayed.current = Math.round(latest);
    });
    motionValue.set(value);
    return unsub;
  }, [inView, value, motionValue, springValue]);

  return (
    <span className="font-heading text-3xl md:text-4xl font-bold text-navy">
      {inView ? displayed.current : 0}
      {suffix}
    </span>
  );
}

export default function TrustStats() {
  const { ref, visible } = useInView(0.2);

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-section-warm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-teal-500 font-medium text-xs uppercase tracking-[0.2em] mb-12 text-center"
        >
          Trusted by Homeowners Across Bengaluru
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center group"
            >
              <div className="inline-flex flex-col items-center">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  inView={visible}
                />
                <p className="text-navy-muted text-sm mt-1.5 group-hover:text-navy transition-colors">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
