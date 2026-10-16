"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { getProjectsByCategory, PROJECT_CATEGORIES } from "@/data/projects";
import ProjectCard from "@/components/sections/ProjectCard";

const category = PROJECT_CATEGORIES[1]; // Modern Homes

const areaProjects = getProjectsByCategory("modern");

export default function ProjectsModernPage() {
  const { ref: heroRef, visible: heroVisible } = useInView(0.1);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-navy-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/[0.04] blur-3xl" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>
        <div ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <span>/</span>
              <a href="/projects" className="hover:text-white transition-colors">Projects</a>
              <span>/</span>
              <span className="text-white">{category.label}</span>
            </nav>
            <span className="inline-block text-gold font-medium text-xs uppercase tracking-[0.2em] mb-4">
              {category.label}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {category.label} <span className="text-teal-400">Projects</span>
            </h1>
            <p className="text-gray-400 max-w-2xl text-base md:text-lg">
              Explore our collection of modern homes featuring clean lines, minimalist design, and contemporary architecture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-16 md:py-24 bg-charcoal-400 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-teal-500/[0.02] blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-12">
            <span className="text-teal-500 font-medium text-xs uppercase tracking-[0.2em] mb-2 block">
              Our Work
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
              {areaProjects.length} {areaProjects.length === 1 ? "Project" : "Projects"} Completed
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {areaProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {areaProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No projects found in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
