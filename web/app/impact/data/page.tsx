import type { Metadata } from "next"
import { Info } from "lucide-react"
import { PageHeader, Section, SectionHeading, findCrumbs } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { pageMeta } from "@/lib/seo"
import { impactDataPage } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "累積數據",
  description: "鄉育教育基金會累積服務成果一覽——陪伴學生、課程場次與合作網絡。",
  path: "/impact/data",
})

/**
 * 累積數據頁。兩套統計口徑尚未統一（見 lib/site.ts impactDataPage 註解），
 * pending 項以「口徑確認中」標示，不混用、不杜撰。
 */
export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="影響力・足跡"
        title="累積數據"
        lead={`每一個數字背後，都是一段被陪伴的路。統計至 ${impactDataPage.asOf}。`}
        crumbs={findCrumbs("/impact/data")}
      />

      {impactDataPage.groups.map((group, gi) => (
        <Section key={group.title} muted={gi % 2 === 1}>
          <SectionHeading title={group.title} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {group.stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 110} className="h-full">
                <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7">
                  <p className="text-5xl font-black text-primary">
                    {s.value}
                    {s.unit && <span className="ml-1 text-2xl font-bold">{s.unit}</span>}
                    {s.pending && (
                      <span aria-hidden="true" className="ml-1 align-super text-xl font-bold text-accent">
                        ＊
                      </span>
                    )}
                  </p>
                  <p className="mt-3 font-semibold text-foreground">{s.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">資料來源：{s.source}</p>
                  {s.pending && (
                    <span className="mt-3 inline-flex w-fit rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                      統計口徑確認中
                    </span>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Section>
      ))}

      <Section>
        <ScrollReveal className="flex items-start gap-3 rounded-3xl border border-border bg-secondary/50 p-6">
          <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{impactDataPage.caliberNote}</p>
        </ScrollReveal>
      </Section>
    </>
  )
}
