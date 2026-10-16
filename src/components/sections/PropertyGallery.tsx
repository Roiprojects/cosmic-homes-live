"use client";
import { useState } from "react";
import Image from "next/image";
import { GALLERY_PROPERTIES } from "@/data/propertyGallery";
import Link from "next/link";

const TOTAL_PAGES = 3;
const PER_PAGE = 3;

const categoryColor: Record<string, string> = {
  Premium: "bg-cyan-500/80 text-white",
  Essential: "bg-teal-500/80 text-white",
  Luxury: "bg-sky-500/80 text-white",
  Freedom: "bg-emerald-500/80 text-white",
};

export default function PropertyGallery() {
  const [page, setPage] = useState(1);
  const start = (page - 1) * PER_PAGE;
  const visible = GALLERY_PROPERTIES.slice(start, start + PER_PAGE);

  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-16">
        <span className="inline-block text-teal-400 font-medium text-xs uppercase tracking-[0.2em] mb-4">
          Our Portfolio
        </span>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Architecture That <span className="text-cyan-400">Stands Out</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
          A curated collection of our finest residential projects across Bengaluru.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
          {visible.map((property, i) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination page={page} onPageChange={setPage} />
      </div>
    </section>
  );
}

function PropertyCard({ property }: { property: (typeof GALLERY_PROPERTIES)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/projects#${property.id}`}
      className="group block relative rounded-2xl overflow-hidden aspect-[4/3]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Image
        src={property.image}
        alt={property.name}
        fill
        className={`object-cover transition-transform duration-700 ease-out ${
          property.category === "Interior" ? "object-center" : "object-top sm:object-[center_top]"
        } ${hovered ? "scale-105" : "scale-100"}`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality={90}
      />

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          hovered ? "opacity-90" : "opacity-70"
        }`}
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.05) 100%)",
        }}
      />

      {/* Category badge */}
      <span
        className={`absolute top-4 left-4 px-3.5 py-1 text-xs font-semibold tracking-wide rounded-sm z-10 ${
          categoryColor[property.category] || "bg-cyan-500/80 text-white"
        }`}
      >
        {property.category}
      </span>

      {/* Read More — top-right, hidden until hover */}
      <span
        className={`absolute top-4 right-4 text-white text-xs font-medium tracking-wide z-10 transition-all duration-300 ${
          hovered
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2"
        }`}
      >
        Read More{" "}
        <span className="inline-block w-5 h-px bg-cyan-400 ml-1 align-middle transition-all duration-300 group-hover:w-6" />
      </span>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3 className="text-white text-lg md:text-xl font-semibold leading-tight drop-shadow-md">
          {property.name}
        </h3>

        {/* Hover details */}
        <div
          className={`overflow-hidden transition-all duration-400 ${
            hovered ? "max-h-24 mt-3 opacity-100" : "max-h-0 mt-0 opacity-0"
          }`}
        >
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-300 text-xs">
            <span>{property.location}</span>
            <span className="text-cyan-400/60">|</span>
            <span>{property.area}</span>
            <span className="text-cyan-400/60">|</span>
            <span>{property.floors}</span>
            <span className="text-cyan-400/60">|</span>
            <span className="text-cyan-300 font-medium">{property.price}</span>
          </div>
        </div>
      </div>

      {/* Cyan bottom border on hover */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-teal-400 transition-all duration-500 origin-left ${
          hovered ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </Link>
  );
}

function Pagination({
  page,
  onPageChange,
}: {
  page: number;
  onPageChange: (p: number) => void;
}) {
  const pages = [1, 2, 3, 4, 5];
  return (
    <nav className="flex justify-center items-center gap-2 mt-14" aria-label="Pagination">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300 ${
            p === page
              ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
              : "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"
          }`}
        >
          {p}
        </button>
      ))}
      <span className="text-gray-600 mx-1 select-none">»</span>
      <button
        onClick={() => onPageChange(TOTAL_PAGES)}
        className={`h-10 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
          page === TOTAL_PAGES
            ? "bg-cyan-500 text-white"
            : "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"
        }`}
      >
        Last
      </button>
    </nav>
  );
}
