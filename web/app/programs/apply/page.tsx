import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { PageHeader, Section, SectionHeading, findCrumbs } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { pageMeta } from "@/lib/seo"
import { applyInfo, journeyVocab } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "報名資訊",
  description: "加入尋路計畫——申請條件、開課管道與常見問題。",
  path: "/programs/apply",
})

/** 報名資訊：applyInfo 驅動。TODO：正式時程與表單連結到位前，CTA 導向 /contact。 */
export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow={`計畫・${journeyVocab.depart}`}
        title="走上這條路"
        lead={applyInfo.lead}
        crumbs={findCrumbs("/programs/apply")}
      />

      {/* 申請條件 + 時程 */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <SectionHeading eyebrow="誰可以走" title="申請條件" />
            <div className="mt-8 space-y-3">
              {applyInfo.eligibility.map((e) => (
                <div key={e} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-pretty text-foreground/85">{e}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <SectionHeading eyebrow="什麼時候出發" title="開課與報名" />
            <dl className="mt-8 space-y-3">
              {applyInfo.schedule.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
                  <dt className="flex items-center gap-2 text-sm font-semibold text-primary">
                    {s.label}
                    {"pending" in s && s.pending && (
                      <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent">
                        正式時程公布前以此為準
                      </span>
                    )}
                  </dt>
                  <dd className="mt-1.5 text-pretty text-foreground/85">{s.value}</dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section muted>
        <SectionHeading eyebrow="路況查詢" title="常見問題" />
        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {applyInfo.faq.map((f, i) => (
            <ScrollReveal key={f.q} delay={i * 80}>
              <details className="group rounded-2xl border border-border bg-card open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="text-xl font-light text-primary transition-transform group-open:rotate-45"
                  >
                    ＋
                  </span>
                </summary>
                <p className="px-5 pb-5 text-pretty leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* CTA：表單連結到位前導向聯絡頁 */}
      <Section>
        <ScrollReveal className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-balance text-2xl font-bold text-foreground sm:text-3xl">準備好啟程了嗎？</h2>
          <p className="max-w-xl text-pretty text-muted-foreground">
            線上報名表單即將開放；現在就想出發的話，直接寫信給我們，嚮導會親自回覆你。
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 px-7"
              render={<Link href={applyInfo.formUrl ?? "/contact"} />}
            >
              聯絡我們報名
              <ArrowRight className="size-5" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-7" render={<Link href="/programs/journey" />}>
              再看一次 16 週走法
            </Button>
          </div>
        </ScrollReveal>
      </Section>
    </>
  )
}
