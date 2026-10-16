"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { projects } from "@/data/projects";
import Lightbox from "@/components/ui/Lightbox";

export default function GalleryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#fbfbf9] px-4 pt-32">
        <h1 className="font-serif text-3xl font-bold text-[#022b27] mb-3">Residence Not Found</h1>
        <p className="text-slate-600 mb-6">The requested residence project could not be found.</p>
        <Link
          href="/gallery"
          className="px-6 py-2.5 rounded-full bg-[#022b27] text-white text-xs uppercase tracking-wider font-semibold"
        >
          Return to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fbfbf9] min-h-screen">
      {/* Editorial Hero Banner */}
      <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-24 bg-[#022b27] text-white overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
            <span>/</span>
            <span className="text-[#c9a45c]">{project.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-[0.7rem] uppercase tracking-wider font-semibold bg-[#c9a45c]/20 text-[#dfbc77] border border-[#c9a45c]/30">
                {project.badge || project.type} &bull; {project.location}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
                {project.title}
              </h1>
              <p className="text-slate-300 text-base max-w-2xl font-sans-clean leading-relaxed">
                {project.description}
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-gold-gradient text-white text-xs uppercase tracking-[0.16em] font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Get Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image + Gallery Lightbox Trigger */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Large Image */}
          <div
            onClick={() => setLightboxIndex(0)}
            className="relative aspect-[4/3] sm:aspect-[16/10] max-h-[620px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer group bg-slate-900 mb-6"
          >
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover object-top sm:object-[center_top] transition-transform duration-700 ease-out group-hover:scale-104"
              priority
              sizes="(max-width: 1400px) 100vw, 1360px"
              quality={95}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <span className="bg-black/60 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                Click To View Fullscreen Gallery
              </span>
            </div>
          </div>

          {/* Supporting Thumbnails */}
          {project.images.length > 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-14">
              {project.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md border border-slate-200"
                >
                  <Image
                    src={img}
                    alt={`${project.title} photo ${idx + 1}`}
                    fill
                    className="object-cover object-top sm:object-[center_top] transition-transform duration-500 group-hover:scale-108"
                    sizes="300px"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          )}

          {/* Property Overview Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-slate-200">
            
            {/* Left: About This Residence */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="text-[0.72rem] uppercase tracking-[0.25em] font-semibold text-[#c9a45c]">
                  Architecture & Details
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#022b27] mt-1">
                  About This Residence
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed font-sans-clean">
                {project.description} This custom project exemplifies Cosmic Homes&apos; commitment to craftsmanship, sustainable building techniques, functional spatial planning, and high-end aesthetic finishes.
              </p>

              {/* Key Features Cards */}
              <div className="pt-4">
                <h3 className="font-serif text-lg font-semibold text-[#022b27] mb-4">
                  Key Specifications
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {project.features.map((feat, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm text-center">
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-sans-clean">Spec 0{i + 1}</p>
                      <p className="font-serif font-bold text-sm text-[#022b27] mt-1">{feat}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Location & Consultation Card */}
            <div className="lg:col-span-4">
              <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-md space-y-6 sticky top-28">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#022b27]">Project Information</h3>
                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <div className="flex justify-between pb-2 border-b border-slate-100">
                      <span className="text-slate-400">Location:</span>
                      <span className="font-medium text-[#022b27]">{project.location}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-slate-100">
                      <span className="text-slate-400">Category:</span>
                      <span className="font-medium text-[#022b27]">{project.type}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-slate-100">
                      <span className="text-slate-400">Status:</span>
                      <span className="font-medium text-emerald-700">Completed & Handed Over</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="w-full text-center block py-3 rounded-xl bg-[#022b27] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#06453f] transition-colors"
                  >
                    Inquire About Similar Build
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          images={project.images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
