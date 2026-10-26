import { Project } from "@/types";
import projectsData from "./projects.json";

export const projects: Project[] = projectsData as Project[];

export const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  "Featured": { bg: "bg-[#c9a45c]", text: "text-[#022b27]" },
  "Premium": { bg: "bg-[#022b27] border border-[#c9a45c]/50", text: "text-[#c9a45c]" },
  "Premium+": { bg: "bg-gold-gradient", text: "text-white" },
  "Interior": { bg: "bg-[#06453f] border border-[#c9a45c]/40", text: "text-white" },
};

export const PROJECT_CATEGORIES = [
  { slug: "featured", title: "Featured Projects", label: "Featured", subtitle: "Handpicked selections" },
  { slug: "modern", title: "Modern Homes", label: "Modern", subtitle: "Contemporary designs" },
  { slug: "contemporary", title: "Contemporary Homes", label: "Contemporary", subtitle: "Elegant architecture" },
  { slug: "urban", title: "Urban Living", label: "Urban", subtitle: "City-style homes" },
  { slug: "premium", title: "Premium Residences", label: "Premium", subtitle: "Luxury living" },
  { slug: "interior", title: "Interior Designs", label: "Interior", subtitle: "Beautiful spaces" }
];

export function getProjectsByCategory(slug: string) {
  const areaLabelMap: Record<string, string> = {
    "Featured": "featured",
    "Modern": "modern",
    "Contemporary": "contemporary",
    "Urban": "urban",
    "Premium": "premium",
    "Interior": "interior",
  };
  return projects.filter(p => areaLabelMap[p.area] === slug || (slug === "featured" && p.badge === "Featured") || (slug === "featured" && p.badge === "Premium+"));
}
