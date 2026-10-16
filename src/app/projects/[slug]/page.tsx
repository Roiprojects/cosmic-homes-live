"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { projects } from "@/data/projects";
import { useInView } from "@/hooks/useInView";
import ModalTrigger from "@/components/ui/ModalTrigger";
import Lightbox from "@/components/ui/Lightbox";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [mounted, setMounted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { ref: heroRef, visible: heroVisible } = useInView(0.1);

  useEffect(() => {
    setMounted(true);
  }, []);

  const project = mounted ? projects.find((p) => p.slug === slug) : undefined;

  if (mounted && !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-900">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-white mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-gold hover:text-gold-300 transition-colors">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-navy-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/[0.04] blur-3xl" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>
        <div ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
              <span>/</span>
              <span className="text-white">{project.title}</span>
            </nav>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Image */}
      <section className="relative bg-charcoal-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <button
            onClick={() => setLightboxIndex(0)}
            className="group block relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] max-h-[600px] text-left w-full"
          >
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover object-top sm:object-[center_top] transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
              quality={95}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                Click to enlarge
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Project Details */}
      <section className="relative py-16 md:py-24 bg-charcoal-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Info */}
            <div className="lg:col-span-1">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">
                Project Details
              </h2>

              <div className="flex items-start gap-3 mb-5">
                <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Location</p>
                  <p className="text-white text-sm font-medium">{project.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-5">
                <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Category</p>
                  <p className="text-white text-sm font-medium">{project.type}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-8">
                <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Type</p>
                  <p className="text-white text-sm font-medium">{project.type}</p>
                </div>
              </div>

              <ModalTrigger variant="primary" className="w-full">
                Enquire Now
              </ModalTrigger>
            </div>

            {/* Right: Features */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">
                Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3"
                  >
                    <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white text-sm font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="font-heading text-xl font-bold text-white mb-3">About This Project</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.images.length > 1 && (
        <section className="relative py-16 md:py-24 bg-navy-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-8">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.slice(1).map((img, i) => (
                <motion.button
                  key={img}
                  onClick={() => setLightboxIndex(i + 1)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] text-left"
                >
                  <Image
                    src={img}
                    alt={`${project.title} - Image ${i + 2}`}
                    fill
                    className="object-cover object-top sm:object-[center_top] transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={project.images}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="relative py-20 md:py-28 bg-navy-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Your <span className="text-gold">Dream Home</span>?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Let&apos;s discuss your requirements and turn your vision into reality. Get in touch with us today.
          </p>
          <ModalTrigger variant="primary" size="lg">
            Start Your Project
          </ModalTrigger>
        </div>
      </section>
    </>
  );
}
