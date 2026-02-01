import { posts } from "../lib/posts";
import { industries } from "../lib/industries";
import { useCases } from "../lib/useCases";

export default function sitemap() {
  const base = "https://thedoorpost.com";
  const staticRoutes = [
    "",
    "/analyze",
    "/pricing",
    "/blog",
    "/best-landing-pages",
    "/common-mistakes",
    "/about",
    "/privacy",
    "/terms",
  ];

  const priorityMap: Record<string, number> = {
    "/": 1.0,
    "/analyze": 0.9,
    "/pricing": 0.8,
    "/blog": 0.7,
    "/about": 0.6,
    "/best-landing-pages": 0.6,
    "/common-mistakes": 0.6,
    "/privacy": 0.3,
    "/terms": 0.3,
  };

  const routes = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency:
      path === "" || path === "/blog" ? "daily" : ("weekly" as const),
    priority: priorityMap[path === "" ? "/" : path] ?? 0.5,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const industryRoutes = industries.map((industry) => ({
    url: `${base}/industry/${industry.slug}`,
    lastModified: new Date(),
  }));

  const useCaseRoutes = useCases.map((useCase) => ({
    url: `${base}/use-case/${useCase.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...blogRoutes, ...industryRoutes, ...useCaseRoutes];
}
