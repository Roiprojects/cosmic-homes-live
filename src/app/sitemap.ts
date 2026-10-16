import { MetadataRoute } from "next";
import { projects, PROJECT_CATEGORIES } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cosmichomes.in";

  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/how-it-works`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/house-plans`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/packages`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/faqs`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.8 },
    ...PROJECT_CATEGORIES.map((cat) => ({
      url: `${baseUrl}/projects/${cat.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...projects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
