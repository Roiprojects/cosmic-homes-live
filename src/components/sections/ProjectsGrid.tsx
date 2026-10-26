"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<string>("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { ref: headerRef, visible: headerVisible } = useInView(0.1);

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.type === filter)),
    [filter]
  );

  const types = ["All", ...new Set(projects.map((p) => p.type))];

  return (
    <section className="relative py-24 md:py-32 bg-[#fbfbf9] overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#c9a45c]/8 blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[#c9a45c] font-brand font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            Our Work
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#022b27] mb-4">
            Residences We&apos;ve <span className="text-gold-gradient">Crafted</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto font-body">
            Explore our completed residential projects across Bengaluru — each one a testament to our commitment to quality.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-5 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-xl transition-all duration-300 cursor-pointer font-body ${
                filter === type
                  ? "bg-gold-gradient text-white shadow-md shadow-[#c9a45c]/25"
                  : "bg-white border border-slate-200 text-slate-700 hover:text-[#022b27] hover:border-[#c9a45c]/50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isHovered={hoveredId === project.id}
              onHover={() => setHoveredId(project.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isHovered, onHover, onLeave }: { project: any; index: number; isHovered: boolean; onHover: () => void; onLeave: () => void }) {
  const { ref, visible } = useInView(0.05);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/projects/${project.slug}`} className="group block" onMouseEnter={onHover} onMouseLeave={onLeave}>
        <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 hover:border-[#c9a45c]/60 shadow-sm hover:shadow-xl transition-all duration-300">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={project.images[0]}
              alt={project.title}
              className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
              loading="lazy"
            />
          </div>

          {/* Type badge */}
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[#022b27] text-xs font-semibold font-body shadow-sm">
            {project.type}
          </span>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-heading text-lg font-bold text-[#022b27] mb-1.5 group-hover:text-[#c9a45c] transition-colors duration-300">
              {project.title}
            </h3>
            <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4 font-body">
              <svg className="w-3.5 h-3.5 text-[#c9a45c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {project.location}
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {project.features.map((f: string) => (
                <span key={f} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 font-body">
                  {f}
                </span>
              ))}
            </div>
            <span className="text-[#c9a45c] text-sm font-semibold inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 font-body">
              View Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
