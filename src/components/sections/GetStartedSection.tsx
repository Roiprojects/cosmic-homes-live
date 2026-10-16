"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import LeadForm from "@/components/forms/LeadForm";

export default function GetStartedSection() {
  const { ref, visible } = useInView(0.1);

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-section-warm overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-teal-500/[0.03] blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-teal-500/[0.02] blur-3xl -translate-x-1/3 translate-y-1/3" />

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
                src="/images/villa-housewarming-1.png"
                alt="Modern luxury residence built by Cosmic Homes"
                fill
                className="object-cover object-top sm:object-[center_top]"
                sizes="(max-width: 1024px) 100vw, 600px"
                quality={90}
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 md:-right-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-navy font-semibold text-sm">Free Consultation</p>
                  <p className="text-navy-muted text-xs">Expert guidance</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-teal-500 font-medium text-xs uppercase tracking-[0.2em] mb-4">
              Get Started
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-4 leading-tight">
              Let&apos;s Build Your{" "}
              <span className="text-teal-500">Dream Home</span>
            </h2>
            <p className="text-navy-muted text-base leading-relaxed mb-8">
              Tell us about your dream home and our team will help you plan the next step. Fill in your details and we&apos;ll get back to you within 24 hours.
            </p>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-navy/5 border border-gray-100">
              <LeadForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
