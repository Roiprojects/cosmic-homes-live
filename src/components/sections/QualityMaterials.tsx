"use client";
import { motion } from "framer-motion";
import { materials } from "@/data/materials";
import { useInView } from "@/hooks/useInView";

export default function QualityMaterials() {
  const { ref: headerRef, visible: headerVisible } = useInView(0.1);

  return (
    <section className="relative py-24 md:py-32 bg-section-warm overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-teal-500/[0.03] blur-3xl translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-block text-teal-500 font-medium text-xs uppercase tracking-[0.2em] mb-4">
            Quality Assurance
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Quality You Can <span className="text-teal-500">See.</span>
            <br className="hidden md:block" />
            <span className="text-teal-500">Strength</span> You Can Trust.
          </h2>
          <p className="text-navy-muted max-w-2xl mx-auto">
            Every material is carefully selected and sourced from trusted suppliers. We
            maintain strict quality standards at every stage of construction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((group, i) => (
            <MaterialCard key={group.title} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MaterialCard({ group, index }: { group: any; index: number }) {
  const { ref, visible } = useInView(0.05);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="card-light p-7 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-500/5 border border-teal-500/10 flex items-center justify-center text-teal-500">
            {group.icon}
          </div>
          <h3 className="font-heading text-xl font-bold text-navy">{group.title}</h3>
        </div>
        <ul className="space-y-3">
          {group.items.map((item: string) => (
            <li key={item} className="flex items-start gap-2.5 text-navy-muted text-sm leading-relaxed">
              <svg className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
