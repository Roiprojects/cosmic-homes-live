"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getProjectsByCategory, BADGE_COLORS } from "@/data/projects";
import { useInView } from "@/hooks/useInView";
import { Project } from "@/types";

const featuredProjects = getProjectsByCategory("featured").slice(0, 4);

export default function FeaturedHomes() {
  const { ref: headerRef, visible: headerVisible } = useInView(0.1);

  if (featuredProjects.length === 0) return null;

  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-block text-teal-500 font-medium text-xs uppercase tracking-[0.2em] mb-4">
            Handpicked Selection
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Featured <span className="text-teal-500">Homes</span>
          </h2>
          <p className="text-navy-muted max-w-2xl mx-auto">
            Explore our collection of contemporary homes — each one a showcase of architectural excellence and meticulous craftsmanship.
          </p>
        </motion.div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {featuredProjects.map((project, i) => (
            <FeaturedCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({
  project,
  index,
}: {
  project: (typeof featuredProjects)[number];
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
      <Link href={`/projects/${project.slug}`} className="group block h-full">
        <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-teal-500/30 flex flex-col h-full card-light transition-all duration-500 hover:shadow-lg hover:shadow-navy-900/5">
          {/* Image — fixed aspect ratio */}
          <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover object-top sm:object-[center_top] transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              quality={90}
            />
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            {/* Badge */}
            <span
              className={`inline-block self-start px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider mb-3 ${badgeColor.bg} ${badgeColor.text}`}
            >
              {project.badge ?? "Premium"}
            </span>

            {/* Title */}
            <h3 className="font-heading text-base font-bold text-navy leading-snug mb-2 group-hover:text-teal-500 transition-colors duration-300 line-clamp-2">
              {project.title}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-navy-muted text-sm mt-auto">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {project.location}
            </div>

            {/* View indicator */}
            <span className="inline-flex items-center gap-1 text-teal-500 text-sm font-semibold mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              View Details
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
