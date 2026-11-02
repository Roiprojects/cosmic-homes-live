"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { processSteps } from "@/data/processSteps";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function ProcessTimeline() {
  const { ref: headerRef, visible: headerVisible } = useInView(0.1);

  return (
    <section className="relative py-20 md:py-32 bg-section-white overflow-hidden">
      {/* Subtle decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-teal-500/[0.02] blur-3xl -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-teal-500/[0.02] blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-[#c9a45c] font-brand font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            From Concept to Completion
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#022b27] mb-4">
            Your Roadmap to Building <span className="text-gold-gradient">Your Dream Home</span>
          </h2>
          <p className="text-navy-muted max-w-2xl mx-auto text-base">
            We simplify every stage of home construction, from your first enquiry and design planning to construction, quality inspection and final handover.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 md:-translate-x-px" />

          {/* Steps */}
          <div className="space-y-12 md:space-y-16">
            {processSteps.map((step, i) => (
              <ProcessStep key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, index }: { step: typeof processSteps[0]; index: number }) {
  const { ref, visible } = useInView(0.15);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={cardVariants}
      className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-10 ${
        isEven ? "" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 mt-1 z-10">
        <div className="w-4 h-4 rounded-full bg-[#022b27] border-2 border-[#c9a45c] shadow-md" />
      </div>

      {/* Step number (mobile: above content) */}
      <div className="hidden md:block md:w-1/2" />

      {/* Image side */}
      <div className={`hidden md:block md:w-1/2 pl-0 ${isEven ? "md:pr-10" : "md:pl-10"}`}>
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
          <img
            src={step.image}
            alt={step.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content side */}
      <div className={`flex-1 pl-14 md:pl-0 ${isEven ? "md:pr-10" : "md:pl-10"}`}>
        {/* Step number badge (mobile visible) */}
        <div className="md:hidden flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#022b27] border border-[#c9a45c]/50 flex items-center justify-center text-[#c9a45c] font-brand text-sm font-bold flex-shrink-0 shadow-sm">
            {step.num}
          </div>
          <h3 className="font-heading text-xl font-bold text-[#022b27]">{step.title}</h3>
        </div>

        {/* Desktop step number */}
        <div className="hidden md:flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#022b27] border border-[#c9a45c]/50 flex items-center justify-center text-[#c9a45c] font-brand text-sm font-bold shadow-sm">
            {step.num}
          </div>
          <h3 className="font-heading text-xl font-bold text-[#022b27]">{step.title}</h3>
        </div>

        <p className="text-[#c9a45c] font-medium text-sm mb-2">{step.subtitle}</p>
        <p className="text-navy-muted text-sm leading-relaxed mb-4">{step.description}</p>

        <ul className="space-y-2">
          {step.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5 text-sm text-navy-muted">
              <svg className="w-5 h-5 text-[#c9a45c] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {bullet}
            </li>
          ))}
        </ul>

        {/* Mobile image (below content) */}
        <div className="mt-5 md:hidden">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
            <img src={step.image} alt={step.imageAlt} loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
