import type { MetadataRoute } from "next"
import { audiences, nav, news } from "@/lib/site"
import { SITE_URL } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = new Set<string>(["/"])
  for (const section of nav) {
    routes.add(section.href)
    for (const item of section.items) routes.add(item.href)
  }
  for (const a of audiences) routes.add(a.href)

  const staticEntries: MetadataRoute.Sitemap = [...routes].map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }))

  const newsEntries: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${SITE_URL}/news/${n.slug}`,
    lastModified: n.date,
    changeFrequency: "yearly",
    priority: 0.5,
  }))

  return [...staticEntries, ...newsEntries]
}
