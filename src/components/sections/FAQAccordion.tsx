"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs, faqCategories, getFaqsByCategory } from "@/data/faqs";
import Accordion from "@/components/ui/Accordion";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export default function FAQAccordion({ preview = false }: { preview?: boolean }) {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0]);
  const { ref: headerRef, visible: headerVisible } = useInView(0.1);

  const categoryFaqs = useMemo(
    () => getFaqsByCategory(activeCategory),
    [activeCategory]
  );

  const previewFaqs = useMemo(
    () => faqs.slice(0, 5),
    []
  );

  return (
    <section className="relative py-24 md:py-32 bg-section-warm overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-teal-500/[0.02] blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <span className="inline-block text-teal-500 font-medium text-xs uppercase tracking-[0.2em] mb-4">
            FAQs
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Frequently Asked <span className="text-teal-500">Questions</span>
          </h2>
          <p className="text-navy-muted max-w-2xl mx-auto">
            Everything you need to know about working with Cosmic Homes.
          </p>
        </motion.div>

        {preview ? (
          <>
            <div className="max-w-3xl mx-auto">
              <div className="card-light overflow-hidden">
                <Accordion
                  items={previewFaqs.map((f) => ({
                    id: f.id,
                    question: f.question,
                    answer: f.answer,
                  }))}
                />
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/faqs">
                <button className="border-2 border-teal-500 text-teal-500 font-semibold px-6 py-2.5 rounded-xl hover:bg-teal-500 hover:text-white transition-all duration-300 text-sm">
                  View All FAQs
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {faqCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20"
                      : "bg-white border border-gray-200 text-navy-muted hover:text-navy hover:border-teal-500/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card-light overflow-hidden">
                    <Accordion
                      items={categoryFaqs.map((f) => ({
                        id: f.id,
                        question: f.question,
                        answer: f.answer,
                      }))}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
