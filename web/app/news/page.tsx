import type { Metadata } from "next"
import Link from "next/link"
import { CalendarDays } from "lucide-react"
import { PageHeader, Section } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { pageMeta } from "@/lib/seo"
import { news } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "最新消息",
  description: "鄉育教育基金會的計畫成果、夥伴合作與活動公告。",
  path: "/news",
})

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="最新消息"
        title="最新消息"
        lead="鄉育的計畫成果、夥伴合作與活動公告。"
        crumbs={[{ title: "最新消息", href: "/news" }]}
      />
      <Section>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((n, i) => (
            <ScrollReveal as="li" key={n.slug} delay={(i % 3) * 100} className="h-full">
              <Link
                href={`/news/${n.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-secondary px-2.5 py-1 font-medium text-secondary-foreground">{n.category}</span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="size-3.5" aria-hidden="true" />
                    {n.date}
                  </span>
                </div>
                <h2 className="mt-4 flex-1 text-lg font-bold leading-snug text-foreground group-hover:text-primary">{n.title}</h2>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
              </Link>
            </ScrollReveal>
          ))}
        </ul>
      </Section>
    </>
  )
}
