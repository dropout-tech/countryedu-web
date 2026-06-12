import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { Figure, PageHeader, Section, SectionHeading, findCrumbs } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { pageMeta } from "@/lib/seo"
import { impactStats, journeyVocab, milestoneChapters, milestones, originStory, partners } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "創立故事",
  description: "2016 看見、2020 走入、1,000 多場第一線訪談——鄉育如何從一個念頭，走成遍及 12 縣市的一條路。",
  path: "/about/story",
})

/** 創立故事：起點關鍵轉折 → 三章大事紀 → 足跡數據帶（2026-06 四子頁決議） */
export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="關於我們"
        title="創立故事"
        lead="一條從「看見」開始的路——鄉育如何從一個念頭，走成一條許多人同行的路。"
        crumbs={findCrumbs("/about/story")}
      />

      {/* 起點：兩個關鍵轉折 */}
      <Section>
        <SectionHeading
          eyebrow={`起點・${journeyVocab.mist}`}
          title="從看見，到走入"
          description="嚮導之所以能帶路，是因為先走過。鄉育的起點，是兩個關鍵轉折。"
        />
        {/* 轉折卡直排＋照片並排右側（2026-06-12 甲方回饋：順序卡片直排、照片在右） */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="flex flex-col gap-4">
            {originStory.turns.map((t, i) => (
              <ScrollReveal key={t.year} delay={i * 120}>
                <div className="flex flex-col rounded-3xl border border-border bg-card p-7 md:p-8">
                  <p className="text-sm font-black text-primary">{t.year}</p>
                  <h3 className="mt-2 text-2xl font-bold text-foreground">{t.title}</h3>
                  <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{t.text}</p>
                  {t.stat && (
                    <div className="mt-5 rounded-2xl bg-primary/10 p-5">
                      <p className="text-4xl font-black text-primary">{t.stat.value}</p>
                      <p className="mt-1 text-sm font-medium text-foreground/80">{t.stat.label}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
          <Figure
            src="/about/students-walking-campus.jpg"
            alt="三位青年學生在校園戶外邊走邊交談"
            caption="嚮導之所以能帶路，是因為先走進了現場、走到青年身邊"
            aspect="aspect-[16/10] lg:aspect-auto lg:flex-1"
            sizes="(max-width: 1024px) 92vw, 560px"
            className="flex flex-col lg:h-full"
          />
        </div>
        <ScrollReveal className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-pretty text-lg font-semibold leading-relaxed text-foreground">{originStory.bridge}</p>
        </ScrollReveal>
      </Section>

      {/* 大事紀：三段路程 */}
      <Section muted>
        <SectionHeading
          eyebrow={`${journeyVocab.footprints}・大事紀`}
          title="一路走來的足跡"
          description="三段路程：從看見與走入，到扎根高中，再走向大學與系統合作。"
        />
        <div className="mx-auto mt-12 max-w-3xl space-y-14">
          {milestoneChapters.map((ch) => {
            const items = milestones.filter((m) => (ch.years as readonly string[]).includes(m.year))
            return (
              <div key={ch.no}>
                <ScrollReveal className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-sm font-black text-primary">{ch.no}</span>
                  <h3 className="text-xl font-bold text-foreground">{ch.title}</h3>
                  <span className="text-sm font-medium text-muted-foreground">{ch.range}</span>
                </ScrollReveal>
                <ol className="relative mt-6 space-y-8 pl-8">
                  <span aria-hidden="true" className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5 bg-border" />
                  {items.map((m, i) => (
                    <ScrollReveal as="li" key={m.year} delay={i * 80} className="relative">
                      <span className="absolute -left-[1.55rem] top-1.5 size-4 rounded-full border-2 border-primary bg-background" />
                      <p className="text-xl font-black text-primary">{m.year}</p>
                      <p className="mt-1.5 text-pretty leading-relaxed text-foreground/85">{m.text}</p>
                    </ScrollReveal>
                  ))}
                </ol>
              </div>
            )
          })}
        </div>
      </Section>

      {/* 足跡數據帶 */}
      <Section>
        <SectionHeading
          eyebrow="這條路走到哪了"
          title="從北門出發，遍及全台"
          description="從台南北門的第一場工作坊出發，鄉育的足跡已遍及全台 12 縣市。"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 80} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 text-center">
                <p className="text-4xl font-black text-primary">
                  {s.value}
                  {s.unit && <span className="ml-1 text-lg">{s.unit}</span>}
                </p>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={120} className="mt-6 rounded-3xl border border-border bg-card p-7">
          <p className="text-sm font-semibold text-foreground">服務縣市（12）</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {partners.counties.map((c) => (
              <li
                key={c}
                className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
              >
                <MapPin className="size-3.5 text-primary" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </ScrollReveal>
        <ScrollReveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="h-12 px-7" render={<Link href="/impact/partners" />}>
            看完整合作夥伴
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-7" render={<Link href="/impact/data" />}>
            看累積數據
          </Button>
        </ScrollReveal>
      </Section>
    </>
  )
}
