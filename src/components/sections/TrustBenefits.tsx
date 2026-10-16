"use client";

import { motion } from "framer-motion";

const trustItems = [
  { label: "Transparent Communication" },
  { label: "Professional Planning" },
  { label: "Quality Construction" },
  { label: "Regular Updates" },
  { label: "Dedicated Support" },
];

export default function TrustBenefits() {
  return (
    <section className="relative py-14 md:py-16 bg-[#0B1930] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center justify-center gap-2.5 text-gray-400"
            >
              <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs md:text-sm">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
