"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useState, useEffect, useCallback } from "react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const { ref, visible } = useInView(0.05);
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  return (
    <section className="relative py-24 md:py-32 bg-section-white overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-teal-500/[0.02] blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <span className="inline-block text-teal-500 font-medium text-xs uppercase tracking-[0.2em] mb-4">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
            What Our{" "}
            <span className="text-teal-500">Homeowners</span> Say
          </h2>
        </div>

        {/* Carousel container */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <motion.div
            animate={{ x: `-${current * 100}%` }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="flex"
          >
            {testimonials.map((t) => (
              <div key={t.id} className="w-full flex-shrink-0 px-2">
                <div className="max-w-3xl mx-auto card-light p-8 md:p-12">
                  {/* Quote mark */}
                  <div className="text-teal-500/10 font-heading text-7xl leading-none select-none mb-2">
                    &ldquo;
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-navy-muted text-base md:text-lg leading-relaxed mb-8">
                    {t.quote}
                  </p>

                  <div className="pt-5 border-t border-gray-200">
                    <p className="font-semibold text-navy text-sm">{t.clientName}</p>
                    {t.role && <p className="text-navy-muted text-xs mt-0.5">{t.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-navy hover:border-teal-500 hover:text-teal-500 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-teal-500 w-6" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-navy hover:border-teal-500 hover:text-teal-500 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
