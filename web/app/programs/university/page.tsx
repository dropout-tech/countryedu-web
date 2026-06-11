import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { PageHeader, Section, SectionHeading, findCrumbs } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { pageMeta } from "@/lib/seo"
import { brand, journeyVocab, universityProgram } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "大學合作計畫",
  description: "把尋路計畫帶進校園——以 16 週選修課程為核心，與大專院校共創職涯探索學習經驗。",
  path: "/programs/university",
})

/** 大學合作計畫：universityProgram 驅動，合作案例取自 milestones 既有事實。 */
export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow={`計畫・開路`}
        title="大學合作計畫"
        lead={universityProgram.lead}
        crumbs={findCrumbs("/programs/university")}
      />

      {/* 合作內容 */}
      <Section>
        <SectionHeading
          eyebrow={`${brand.programName} ${brand.programNameEn}`}
          title="學校能與我們共創什麼"
          description="從一門選修課開始，把真實世界帶進課堂，把可追蹤的成長帶給學生。"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {universityProgram.offerings.map((o, i) => (
            <ScrollReveal key={o} delay={(i % 2) * 100}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-card p-5">
                <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-pretty text-foreground/85">{o}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* 合作案例 */}
      <Section muted>
        <SectionHeading
          eyebrow={`${journeyVocab.footprints}・合作案例`}
          title="已經一起開出來的路"
        />
        <ol className="relative mx-auto mt-12 max-w-3xl space-y-8 pl-8">
          <span aria-hidden="true" className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5 bg-border" />
          {universityProgram.cases.map((c, i) => (
            <ScrollReveal as="li" key={c.org} delay={i * 90} className="relative">
              <span className="absolute -left-[1.55rem] top-1.5 size-4 rounded-full border-2 border-primary bg-background" />
              <p className="text-sm font-bold text-primary">{c.years}</p>
              <h3 className="mt-1 text-xl font-bold text-foreground">{c.org}</h3>
              <p className="mt-1.5 text-pretty leading-relaxed text-muted-foreground">{c.text}</p>
            </ScrollReveal>
          ))}
        </ol>
      </Section>

      {/* 合作流程 + CTA */}
      <Section>
        <SectionHeading eyebrow="怎麼開始" title="合作流程" />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {universityProgram.steps.map((s, i) => (
            <ScrollReveal as="li" key={s} delay={i * 100} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6">
                <span className="text-sm font-black text-primary">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-bold text-foreground">{s}</p>
              </div>
            </ScrollReveal>
          ))}
        </ol>
        <ScrollReveal className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-pretty text-muted-foreground">
            無論你是老師、系辦或學務處夥伴，歡迎與我們聊聊貴校的需求。
          </p>
          <Button size="lg" className="h-12 px-7" render={<Link href="/involve/university" />}>
            洽談學校合作
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
        </ScrollReveal>
      </Section>
    </>
  )
}
