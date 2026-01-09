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
    "/contact",
    "/privacy",
    "/terms",
  ];
  const routes = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
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
