"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Project } from "@/types";
import { projects as staticProjects, PROJECT_CATEGORIES, BADGE_COLORS } from "@/data/projects";
import { useInView } from "@/hooks/useInView";
import ModalTrigger from "@/components/ui/ModalTrigger";

const areaLabelMap: Record<string, string> = {
  "Featured": "featured",
  "Modern": "modern",
  "Contemporary": "contemporary",
  "Urban": "urban",
  "Premium": "premium",
  "Interior": "interior",
};

export default function ProjectsPage() {
  const { ref: heroRef, visible: heroVisible } = useInView(0.1);
  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {});
  }, []);

  const groupedProjects = PROJECT_CATEGORIES.map((cat) => ({
    ...cat,
    items: projects.filter((p) => areaLabelMap[p.area] === cat.slug),
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="bg-navy-900 min-h-screen">
      {/* Page Header */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-navy-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-1/3 w-[350px] h-[350px] rounded-full bg-blue-400/[0.03] blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Projects</span>
            </nav>

            {/* Left-right split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
              <div>
                <span className="inline-block text-gold font-medium text-xs uppercase tracking-[0.2em] mb-5">
                  Our Homes
                </span>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  Our <span className="text-teal-400">Projects</span>
                </h1>
              </div>
              <div>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  Thoughtfully Designed Homes Built Around Your Lifestyle
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>

      {/* Category Sections with Grid */}
      {groupedProjects.map((group) => (
        <CategoryGridSection key={group.slug} group={group} />
      ))}

      {/* CTA */}
      <section className="relative py-20 md:py-28 overflow-hidden">
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
    </div>
  );
}

function CategoryGridSection({
  group,
}: {
  group: { slug: string; title: string; subtitle?: string; items: Project[] };
}) {
  const { ref, visible } = useInView(0.05);

  return (
    <section className="relative py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-white">
              {group.title}
            </h2>
            <Link href={`/projects/${group.slug === "featured" ? "" : group.slug}`}>
              <span className="group text-sm text-teal-400 hover:text-teal-300 font-medium inline-flex items-center gap-1.5 transition-colors duration-300 cursor-pointer">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {group.items.map((project, i) => (
              <ProjectGridCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-10" />
      </div>
    </section>
  );
}

function ProjectGridCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { ref, visible } = useInView(0.02);
  const badgeColor = BADGE_COLORS[project.badge ?? "Premium"] ?? BADGE_COLORS.Premium;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-shadow duration-500">
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
