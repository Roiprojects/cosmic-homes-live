"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { COMPANY } from "@/data/siteConfig";

export default function MDCard() {
  return (
    <section className="relative py-24 md:py-32 bg-section-warm overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-teal-500/[0.03] blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* Large quote mark */}
          <div className="relative">
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-heading text-[120px] md:text-[160px] leading-none text-teal-500/10 select-none pointer-events-none">
              &ldquo;
            </span>

            <div className="relative pt-8">
              <span className="text-teal-500 font-medium text-xs uppercase tracking-[0.2em] mb-6 block">
                Leadership
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-4">
                {COMPANY.md}
              </h2>
              <p className="text-teal-500 font-medium text-sm uppercase tracking-wider mb-8">
                {COMPANY.title}
              </p>

              {/* Director Photo Avatar */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full mx-auto mb-8 overflow-hidden shadow-2xl border-4 border-white ring-4 ring-[#c9a45c]/40">
                <Image
                  src={COMPANY.directorPhoto || "/images/director-shashidhar.jpg"}
                  alt={COMPANY.md}
                  fill
                  className="object-cover object-top"
                  sizes="160px"
                  quality={95}
                />
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gold-gradient rounded-full flex items-center justify-center border-2 border-white shadow-md">
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <blockquote className="text-navy-muted text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-6">
                &ldquo;With a vision to create dependable and customer-focused construction
                experiences, I lead Cosmic Homes with an emphasis on quality, transparency,
                and long-term relationships with every client.&rdquo;
              </blockquote>

              {/* Decorative line */}
              <div className="flex items-center justify-center gap-3 mt-8">
                <div className="w-8 h-px bg-teal-500/30" />
                <div className="w-2 h-2 rounded-full bg-teal-500/50" />
                <div className="w-8 h-px bg-teal-500/30" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
