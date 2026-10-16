"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Storytelling Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* LEFT: Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[0.72rem] uppercase tracking-[0.25em] font-semibold text-[#c9a45c]">
              About Cosmic Homes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#022b27] leading-[1.18]">
              More Than A House. <br />
              <span className="italic font-normal text-slate-800">A Home Designed Around You.</span>
            </h2>
            <div className="space-y-4 text-slate-600 text-base leading-relaxed font-sans-clean">
              <p>
                At Cosmic Homes, we believe custom home construction is an art of trust and architectural precision. We work closely with homeowners from initial concept through turnkey handover to build spaces of enduring elegance and structural integrity.
              </p>
              <p>
                Under the leadership of our experienced management and engineering teams, every residence balances spatial harmony, natural lighting, premium material selection, and rigorous quality supervision.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-[#022b27] hover:text-[#c9a45c] transition-colors group"
              >
                Learn More About Our Philosophy
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* RIGHT: High-End Architecture Photo with Experience Tag */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] max-h-[560px] rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-50 image-zoom-container">
              <Image
                src="/images/cosmic-house-106-day.png"
                alt="Cosmic Homes residential architecture"
                fill
                className="object-cover object-top sm:object-[center_top]"
                sizes="(max-width: 768px) 100vw, 600px"
                quality={95}
              />
            </div>
            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-[#022b27] text-white p-5 rounded-2xl shadow-xl border border-white/10">
              <p className="font-serif text-3xl font-bold text-[#c9a45c]">12+</p>
              <p className="text-xs uppercase tracking-wider text-slate-300 font-sans-clean mt-0.5">Years of Craftsmanship</p>
            </div>
          </div>

        </div>



      </div>
    </section>
  );
}
