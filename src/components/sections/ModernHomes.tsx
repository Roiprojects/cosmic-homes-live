"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getProjectsByCategory, BADGE_COLORS } from "@/data/projects";
import { useInView } from "@/hooks/useInView";
import { Project } from "@/types";

const modernProjects = getProjectsByCategory("modern").slice(0, 4);

export default function ModernHomes() {
  const { ref: headerRef, visible: headerVisible } = useInView(0.1);

  if (modernProjects.length === 0) return null;

  return (
    <section className="relative bg-section-white py-20 md:py-28 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-teal-500/[0.02] blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="inline-block text-teal-500 font-medium text-xs uppercase tracking-[0.2em] mb-4">
              Featured Collection
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
              Modern <span className="text-teal-500">Homes</span>
            </h2>
          </div>
          <Link href="/projects/modern">
            <span className="group hidden sm:inline-flex items-center gap-1.5 text-teal-500 hover:text-teal-400 font-medium text-sm transition-colors duration-300">
              View All
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {modernProjects.map((project, i) => (
            <ModernCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModernCard({
  project,
  index,
}: {
  project: (typeof modernProjects)[number];
  index: number;
}) {
  const { ref, visible } = useInView(0.02);
  const badgeColor = BADGE_COLORS[project.badge ?? "Premium"] ?? BADGE_COLORS.Premium;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg shadow-navy-900/10 hover:shadow-xl hover:shadow-navy-900/20 transition-shadow duration-500">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover object-top sm:object-[center_top] transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[0.65rem] font-bold uppercase tracking-wider ${badgeColor.bg} ${badgeColor.text}`}
          >
            {project.badge ?? "Premium"}
          </span>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-heading text-sm md:text-base font-semibold leading-snug transition-transform duration-300 group-hover:-translate-y-0.5">
              {project.title}
            </h3>
            <p className="text-gray-300 text-xs mt-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {project.location}
            </p>
            <p className="text-gray-400 text-xs mt-0.5">{project.type}</p>
            <span className="inline-flex items-center gap-1 text-teal-400 text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              View Details
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
