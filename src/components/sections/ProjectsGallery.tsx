"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { useInView } from "@/hooks/useInView";
import { BADGE_COLORS } from "@/data/projects";

export default function ProjectsGallery() {
  const { ref, visible } = useInView(0.05);

  return (
    <section className="relative py-24 md:py-32 bg-navy-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/[0.02] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold font-medium text-xs uppercase tracking-[0.2em] mb-4">
            Our Portfolio
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Explore Our <span className="text-teal-400">Featured Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Browse our completed residential projects across Bengaluru — each one a testament to our commitment to quality and architectural excellence.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <ProjectGalleryCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Bottom separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-16" />
      </div>
    </section>
  );
}

function ProjectGalleryCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const { ref, visible } = useInView(0.02);
  const badgeColor = BADGE_COLORS[project.badge ?? "Premium"] ?? BADGE_COLORS.Premium;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-shadow duration-500">
          {/* Image */}
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover object-top sm:object-[center_top] transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            quality={90}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

          {/* Badge */}
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[0.65rem] font-bold uppercase tracking-wider ${badgeColor.bg} ${badgeColor.text}`}
          >
            {project.badge ?? "Premium"}
          </span>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
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

            {/* Hover indicator */}
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
