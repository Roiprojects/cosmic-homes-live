"use client";
import { motion } from "framer-motion";
import { packages } from "@/data/packages";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function PackageCards() {
  const { ref, visible } = useInView(0.05);

  return (
    <section className="relative py-24 md:py-32 bg-section-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-teal-500/[0.02] blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block text-[#c9a45c] font-brand font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            Construction Packages
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#022b27] mb-4">
            Explore Our <span className="text-gold-gradient">Turnkey Packages</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto font-body">
            Comprehensive turnkey construction options designed around your lifestyle and architectural aspirations.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              variants={item}
              initial="hidden"
              animate={visible ? "show" : {}}
              transition={{ delay: i * 0.12 }}
              className={`group relative rounded-2xl p-7 md:p-8 flex flex-col h-full transition-all duration-500 bg-white ${
                pkg.highlighted
                  ? "ring-2 ring-[#c9a45c]/50 shadow-xl shadow-[#022b27]/10 lg:-mt-4 lg:mb-4 border border-[#c9a45c]/40"
                  : "border border-slate-200 hover:border-[#c9a45c]/50 shadow-sm hover:shadow-md"
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gold-gradient text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="font-heading text-2xl font-bold mb-1.5 text-[#022b27]">{pkg.name}</h3>

              {(pkg.startingPrice || pkg.idealFor) && (
                <div className="flex flex-col gap-1.5 mb-3">
                  {pkg.startingPrice && (
                    <p className="text-[#c9a45c] font-body text-xs uppercase tracking-wider font-bold">{pkg.startingPrice}</p>
                  )}
                  {pkg.idealFor && (
                    <span className="text-[0.7rem] text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full w-fit">
                      {pkg.idealFor}
                    </span>
                  )}
                </div>
              )}

              <p className="text-xs mb-2.5 text-slate-600 font-semibold font-body">
                {pkg.tagline}
              </p>
              <p className="text-xs mb-6 leading-relaxed text-slate-500 font-body">
                {pkg.description}
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-xs text-slate-600 font-body"
                  >
                    <svg
                      className="w-4 h-4 text-[#c9a45c] flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/contact" className="block">
                <button
                  className={
                    pkg.highlighted
                      ? "w-full bg-gold-gradient text-white font-semibold py-3.5 rounded-xl hover:shadow-lg transition-all duration-300 text-xs uppercase tracking-wider hover:-translate-y-0.5 cursor-pointer"
                      : "w-full border border-[#022b27] text-[#022b27] font-semibold py-3.5 rounded-xl hover:bg-[#022b27] hover:text-white transition-all duration-300 text-xs uppercase tracking-wider hover:-translate-y-0.5 cursor-pointer"
                  }
                >
                  Consult on this Package
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
