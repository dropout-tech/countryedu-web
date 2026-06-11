import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Quote } from "lucide-react"
import { PageHeader, Section, SectionHeading, findCrumbs } from "@/components/page-shell"
import { CompanionCtas } from "@/components/programs/companion-ctas"
import { PathLine } from "@/components/path-line"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { pageMeta } from "@/lib/seo"
import { journeyVocab, storyActs } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "學習成果故事",
  description: "一段四幕的成長敘事：我原本是誰、我嘗試了什麼、我發現了什麼、我走向了哪裡。",
  path: "/impact/learning-story",
})

/**
 * 四幕學生故事完整版（資料源 storyActs，與首頁 stories 共用）。
 * 幕與幕之間以縱向 scrub 路徑線串接——故事本身就是一條路。
 * TODO：目前為通用文案，真實學生語錄與個案授權待基金會提供後替換。
 */
export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow={`影響力・${journeyVocab.footprints}`}
        title="一段四幕的成長故事"
        lead="每個青年的旅程，都是從迷惘走向看見的過程。這是一條許多學生都走過的路。"
        crumbs={findCrumbs("/impact/learning-story")}
      />

      <Section>
        <ol className="relative space-y-14 pl-12 md:pl-16">
          {/* 縱向的路：隨捲動推進 */}
          <div aria-hidden="true" className="absolute left-[17px] top-4 h-[calc(100%-3rem)] w-2 md:left-[21px]">
            <PathLine
              d="M 4 0 C 9 120 -1 240 4 360 C 9 480 -1 600 4 720 C 8 840 2 930 4 1000"
              viewBox="0 0 8 1000"
              mode="scrub"
              strokeWidth={3}
              className="h-full w-full text-primary/50"
            />
          </div>

          {storyActs.map((act, i) => (
            <ScrollReveal as="li" key={act.act} className="relative">
              <span className="absolute -left-12 top-0 inline-flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground ring-4 ring-background md:-left-16 md:size-11">
                {i + 1}
              </span>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">{act.act}</p>
              <h2 className="mt-1 text-2xl font-black text-foreground sm:text-3xl">{act.q}</h2>

              <blockquote className="mt-4 flex items-start gap-3 rounded-3xl bg-secondary/60 p-6">
                <Quote className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
                <p className="text-pretty text-lg font-medium leading-relaxed text-foreground">{act.a}</p>
              </blockquote>

              <div className="mt-5 space-y-3">
                {act.detail.map((p) => (
                  <p key={p} className="text-pretty leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {act.evidence.map((e) => (
                  <div key={e.title} className="rounded-2xl border border-border bg-card px-5 py-3">
                    <p className="text-sm font-semibold text-foreground">
                      <span className="mr-2 text-xs font-medium uppercase tracking-wide text-primary">足跡</span>
                      {e.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{e.meta}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </ol>

        <ScrollReveal className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-pretty text-muted-foreground">
            想看故事背後的方法？四幕的走法，就藏在 16 週的學習旅程裡。
          </p>
          <Button size="lg" variant="outline" className="h-12 px-7" render={<Link href="/programs/journey" />}>
            看 16 週怎麼走
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
        </ScrollReveal>
      </Section>

      <Section muted>
        <SectionHeading
          align="center"
          eyebrow={journeyVocab.company}
          title="下一段故事，可以從你開始"
        />
        <CompanionCtas />
      </Section>
    </>
  )
}
