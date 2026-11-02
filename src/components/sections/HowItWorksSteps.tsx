"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { processSteps } from "@/data/processSteps";

export default function HowItWorksSteps() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#fbfbf9] overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[0.72rem] uppercase tracking-[0.25em] font-semibold text-[#c9a45c]">
            The Construction Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022b27] mt-2 leading-[1.18]">
            Our 10-Step <br />
            <span className="italic font-normal text-slate-800">Turnkey Process</span>
          </h2>
          <p className="text-slate-600 text-base mt-4 font-sans-clean leading-relaxed">
            A structured, transparent roadmap from the first conversation to handing over your keys.
          </p>
        </div>

        {/* 10 Alternating Editorial Steps */}
        <div className="space-y-16 lg:space-y-24">
          {processSteps.map((step, idx) => {
            const isEven = idx % 2 === 1; // Alternating layout
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="relative"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                    isEven ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  {/* Text Side */}
                  <div
                    className={`lg:col-span-6 space-y-4 ${
                      isEven ? "lg:col-start-7" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-4xl sm:text-5xl font-bold text-[#c9a45c]/40 leading-none">
                        {step.num}
                      </span>
                      <span className="text-[0.68rem] uppercase tracking-[0.22em] font-semibold text-[#c9a45c] bg-[#022b27] border border-[#c9a45c]/40 px-3.5 py-1 rounded-full shadow-sm font-brand">
                        Step {step.num}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#022b27]">
                      {step.title}
                    </h3>
                    <p className="text-sm font-medium text-[#c9a45c] font-sans-clean">
                      {step.subtitle}
                    </p>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans-clean">
                      {step.description}
                    </p>

                    <ul className="space-y-2 pt-2 text-xs sm:text-sm text-slate-500 font-sans-clean">
                      {step.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a45c] mt-2 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Image Side */}
                  <div
                    className={`lg:col-span-6 ${
                      isEven ? "lg:col-start-1" : ""
                    }`}
                  >
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                      <Image
                        src={step.image}
                        alt={step.imageAlt || step.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 600px"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-24 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gold-gradient text-white text-xs uppercase tracking-[0.16em] font-semibold shadow-[0_6px_22px_rgba(201,164,92,0.35)] hover:shadow-[0_8px_28px_rgba(201,164,92,0.5)] transition-all hover:-translate-y-0.5 border border-[#c9a45c]/30 font-serif"
          >
            Start Your Construction Journey &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
}
