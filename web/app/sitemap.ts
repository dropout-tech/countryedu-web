import type { MetadataRoute } from "next"
import { audiences, nav, news } from "@/lib/site"
import { SITE_URL } from "@/lib/seo"

export const dynamic = "force-static"

/** 僅作導向、不收錄進 sitemap 的路由（/about → /about/mission，2026-06-12 四子頁決議） */
const redirectOnly = new Set(["/about"])

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = new Set<string>(["/"])
  for (const section of nav) {
    if (!redirectOnly.has(section.href)) routes.add(section.href)
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
