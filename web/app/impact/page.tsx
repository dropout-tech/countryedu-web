import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHeader, Section, SectionHeading, findCrumbs } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { pageMeta } from "@/lib/seo"
import { impactStats, journeyVocab, nav } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "影響力",
  description: "走過的路會留下足跡——可追蹤、可累積的成長證據，創造社會、企業、基金會三贏。",
  path: "/impact",
})

const impactNav = nav.find((s) => s.href === "/impact")?.items ?? []

/** 影響力 hub：headline 數據＋子頁導覽。詳細數據與口徑備註在 /impact/data。 */
export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow={`影響力・${journeyVocab.footprints}`}
        title="走過的路，會留下足跡"
        lead="影響力不是口號，是可追蹤、可累積的成長證據——學生、學校與企業都能讀懂的共同語言。"
        crumbs={findCrumbs("/impact")}
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-3">
          {impactStats.slice(1).map((s, i) => (
            <ScrollReveal
              key={s.label}
              delay={i * 120}
              className="rounded-3xl border border-border bg-secondary/50 p-8 text-center"
            >
              <p className="text-5xl font-black text-primary">
                {s.value}
                {s.unit && <span className="ml-1 text-2xl font-bold">{s.unit}</span>}
              </p>
              <p className="mt-3 text-sm font-medium text-muted-foreground">{s.label}</p>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal className="mt-6 text-center text-xs text-muted-foreground">
          完整數據與統計口徑說明，見「累積數據」。
        </ScrollReveal>
      </Section>

      <Section muted>
        <SectionHeading
          align="center"
          eyebrow="沿著足跡看"
          title="從數據到故事，五種看見改變的方式"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {impactNav.map((item, i) => (
            <ScrollReveal key={item.href} delay={i * 90} className="h-full">
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-1 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  前往
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </>
  )
}
