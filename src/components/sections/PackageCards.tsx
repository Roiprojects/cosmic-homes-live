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
          <span className="inline-block text-teal-500 font-medium text-xs uppercase tracking-[0.2em] mb-4">
            Packages
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Explore Our <span className="text-teal-500">Popular Packages</span>
          </h2>
          <p className="text-navy-muted max-w-2xl mx-auto">
            Practical construction options designed around your budget and lifestyle.
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
              className={`group relative rounded-2xl p-7 md:p-8 flex flex-col h-full transition-all duration-500 ${
                pkg.highlighted
                  ? "card-light ring-2 ring-teal-500/20 shadow-lg shadow-teal-500/10 lg:-mt-4 lg:mb-4"
                  : "bg-white border border-gray-200 hover:border-teal-500/30"
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-teal-500/20">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="font-heading text-2xl font-bold mb-1.5 text-navy">{pkg.name}</h3>

              {(pkg.startingPrice || pkg.idealFor) && (
                <div className="flex items-center gap-3 mb-3">
                  {pkg.startingPrice && (
                    <p className="text-teal-500 font-heading text-lg font-bold">{pkg.startingPrice}</p>
                  )}
                  {pkg.idealFor && (
                    <span className="text-xs text-navy-muted bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200">
                      {pkg.idealFor}
                    </span>
                  )}
                </div>
              )}

              <p
                className={`text-sm mb-2.5 ${
                  pkg.highlighted ? "text-navy-muted" : "text-navy-muted"
                }`}
              >
                {pkg.tagline}
              </p>
              <p
                className={`text-xs mb-6 leading-relaxed ${
                  pkg.highlighted ? "text-navy-muted" : "text-navy-muted"
                }`}
              >
                {pkg.description}
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-2.5 text-sm ${
                      pkg.highlighted ? "text-navy-muted" : "text-navy-muted"
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5"
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
                      ? "w-full bg-teal-500 text-white font-semibold py-3.5 rounded-xl hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300 text-sm hover:-translate-y-0.5"
                      : "w-full border-2 border-teal-500 text-teal-500 font-semibold py-3.5 rounded-xl hover:bg-teal-500 hover:text-white transition-all duration-300 text-sm hover:-translate-y-0.5"
                  }
                >
                  Get Customized Estimate
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
