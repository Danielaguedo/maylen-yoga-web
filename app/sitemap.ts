import type { MetadataRoute } from "next";
import { nav, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return nav.map((item) => ({
    url: `${site.url}${item.href === "/" ? "" : item.href}`,
    lastModified,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
