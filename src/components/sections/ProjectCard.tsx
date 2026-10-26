"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Project } from "@/types";
import { useInView } from "@/hooks/useInView";
import { BADGE_COLORS } from "@/data/projects";

export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const { ref, visible } = useInView(0.05);
  const router = useRouter();
  const badgeColor = BADGE_COLORS[project.badge ?? "Premium"] ?? BADGE_COLORS.Premium;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        onClick={() => router.push(`/projects/${project.slug}`)}
        className="group cursor-pointer relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 hover:border-[#c9a45c]/60 shadow-sm hover:shadow-xl transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover object-top sm:object-[center_top] transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={90}
          />
        </div>

        {/* Type badge */}
        <span
          className={`absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-md border border-gray-200 text-xs font-medium ${badgeColor.bg} ${badgeColor.text}`}
        >
          {project.badge ?? project.type}
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
    </motion.div>
  );
}
