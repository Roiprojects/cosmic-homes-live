"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const accordionItems = [
  {
    num: "01",
    title: "End-to-End Service",
    description:
      "From your first conversation to the final key handover — we handle every aspect of home construction under one roof. No juggling multiple vendors, no communication gaps.",
  },
  {
    num: "02",
    title: "Transparent Process",
    description:
      "Clear communication at every stage. You'll receive regular progress updates, detailed cost breakdowns, and full visibility into the construction timeline.",
  },
  {
    num: "03",
    title: "Experienced Professionals",
    description:
      "Our team brings decades of combined experience in residential construction, architectural design, and project management — ensuring expert handling of every detail.",
  },
  {
    num: "04",
    title: "Quality-Focused Construction",
    description:
      "We use trusted materials, follow strict quality protocols, and conduct regular inspections to ensure every home meets our high standards.",
  },
  {
    num: "05",
    title: "Modern Design Solutions",
    description:
      "Contemporary architectural designs that blend aesthetics with functionality — homes that look stunning and feel even better to live in.",
  },
];

export default function WhyChooseUs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref: headerRef, visible: headerVisible } = useInView(0.1);

  return (
    <section className="relative py-20 md:py-28 bg-section-warm overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-teal-500/[0.03] blur-3xl translate-x-1/3 -translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <Image
                src="/images/villa-terracotta-12-1.png"
                alt="Modern luxury home exterior"
                fill
                className="object-cover object-top sm:object-[center_top]"
                sizes="(max-width: 1024px) 100vw, 600px"
                quality={90}
              />
            </div>
          </motion.div>

          {/* Right: Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              ref={headerRef}
              initial={{ opacity: 0, y: 20 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-block text-teal-500 font-medium text-xs uppercase tracking-[0.2em] mb-3">
                Why Choose Us
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-3">
                Built Around <span className="text-teal-500">Your Needs</span>
              </h2>
              <p className="text-navy-muted text-sm">
                Everything we do is designed to make your home construction journey smooth, transparent, and stress-free.
              </p>
            </motion.div>

            <div className="space-y-3">
              {accordionItems.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <motion.div
                    key={item.num}
                    custom={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className={`bg-white rounded-xl border transition-all duration-300 ${
                      isOpen ? "border-teal-500/30 shadow-md" : "border-gray-200"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center gap-4 p-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-teal-500 font-heading text-sm font-bold w-8 flex-shrink-0">
                        {item.num}
                      </span>
                      <span className="font-semibold text-navy text-sm flex-1">{item.title}</span>
                      <svg
                        className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-45 text-teal-500" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="px-5 pb-5"
                      >
                        <p className="text-navy-muted text-sm leading-relaxed pl-12">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
