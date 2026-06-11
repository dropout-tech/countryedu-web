import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, HelpCircle } from "lucide-react"
import { PageHeader, Section, SectionHeading, findCrumbs } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { PathLine } from "@/components/path-line"
import { pageMeta } from "@/lib/seo"
import { coreSkills, journeyVocab, spirals } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "學習旅程",
  description: "16 週螺旋課程，可遷移的核心工作能力在四個循環中逐步加深。",
  path: "/programs/journey",
})

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow={`計畫・${journeyVocab.walk}`}
        title="學習旅程"
        lead="以可遷移的問題解決與整合能力為核心，透過 16 週螺旋式專案實作，讓核心工作能力在一圈一圈的循環中逐步加深。"
        crumbs={findCrumbs("/programs/journey")}
      />

      {/* 16 週螺旋課程 */}
      <Section>
        <SectionHeading
          eyebrow="螺旋課程設計"
          title="16 週，四個螺旋循環"
          description="每個螺旋都是一次「發現問題 → 定義問題 → 驗證問題 → 設計方案」的完整循環，一圈比一圈走得更深。"
        />
        <ol className="relative mt-12 space-y-6 pl-10">
          {/* 路徑母題：隨捲動推進的縱向小徑，取代靜態邊線 */}
          <div aria-hidden="true" className="absolute left-[11px] top-3 h-[calc(100%-2rem)] w-2">
            <PathLine
              d="M 4 0 C 9 120 -1 240 4 360 C 9 480 -1 600 4 720 C 8 840 2 930 4 1000"
              viewBox="0 0 8 1000"
              mode="scrub"
              strokeWidth={3}
              className="h-full w-full text-primary/50"
            />
          </div>
          {spirals.map((s, i) => (
            <ScrollReveal as="li" key={s.title} delay={i * 90} className="relative">
              <span className="absolute -left-10 top-0 flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <div className="rounded-3xl border border-border bg-card p-6 md:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-bold text-foreground">
                    Spiral {i + 1}：{s.title}
                  </h3>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {s.weeks}
                  </span>
                </div>
                <p className="mt-3 flex items-start gap-2 text-pretty text-sm font-medium text-accent">
                  <HelpCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {s.question}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li key={p} className="rounded-lg bg-secondary/60 px-3 py-1.5 text-sm text-foreground/80">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </ol>
      </Section>

      {/* 七大核心工作能力 */}
      <Section muted>
        <SectionHeading
          eyebrow="核心能力"
          title="課程培養的七大核心工作能力"
          description="這不是某個職稱的職前訓練，而是一套跨產業、跨職能皆可遷移的核心工作能力。"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreSkills.map((skill, i) => (
            <ScrollReveal key={skill} delay={(i % 3) * 100} className="h-full">
              <div className="flex h-full items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-sm font-black text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-semibold text-foreground">{skill}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <ScrollReveal className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-balance text-2xl font-bold text-foreground sm:text-3xl">準備好開始你的探索旅程了嗎？</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-12 px-7" render={<Link href="/programs/apply" />}>
              查看報名資訊
              <ArrowRight className="size-5" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-7" render={<Link href="/programs/overview" />}>
              回三階段架構
            </Button>
          </div>
        </ScrollReveal>
      </Section>
    </>
  )
}
