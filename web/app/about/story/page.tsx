import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { PageHeader, Section, SectionHeading, findCrumbs } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { pageMeta } from "@/lib/seo"
import { journeyVocab, milestones, partners } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "創立故事",
  description: "從 2021 年偏鄉學習歷程工作坊，到 2026 年大學職涯探索與學術研究合作。",
  path: "/about/story",
})

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="關於我們"
        title="創立故事"
        lead="從地方教育出發，培養青年探索自己未來的藍圖。"
        crumbs={findCrumbs("/about/story")}
      />

      {/* 創立敘事 */}
      <Section>
        <ScrollReveal className="mx-auto max-w-2xl space-y-5 text-pretty text-lg leading-relaxed text-foreground/85">
          <p>
            鄉育教育基金會長期關注台灣青年教育與人才發展議題。2021 年起，我們從偏鄉與非都會地區的高中生支持開始，
            陪伴學生面對升學與職涯的迷惘。
          </p>
          <p>
            2025 年起，服務逐步延伸至大學生職涯探索、跨域能力培養與產學合作。我們相信，教育不只是升學與知識傳遞，
            更重要的，是幫助青年建立面對未來世界的「選擇」能力。
          </p>
        </ScrollReveal>
      </Section>

      {/* 大事紀 */}
      <Section muted>
        <SectionHeading eyebrow={`${journeyVocab.footprints}・大事紀`} title="一路走來的關鍵里程碑" />
        <ol className="relative mx-auto mt-12 max-w-3xl space-y-8 pl-8">
          <span aria-hidden="true" className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5 bg-border" />
          {milestones.map((m, i) => (
            <ScrollReveal as="li" key={m.year} delay={i * 80} className="relative">
              <span className="absolute -left-[1.55rem] top-1.5 size-4 rounded-full border-2 border-primary bg-background" />
              <p className="text-xl font-black text-primary">{m.year}</p>
              <p className="mt-1.5 text-pretty leading-relaxed text-foreground/85">{m.text}</p>
            </ScrollReveal>
          ))}
        </ol>
      </Section>

      {/* 合作版圖 */}
      <Section>
        <SectionHeading
          eyebrow="合作版圖"
          title="從地方扎根，遍及全台"
          description="截至目前，鄉育已與 12 縣市、35+ 所大專院校與高中職合作。"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <ScrollReveal className="rounded-3xl border border-border bg-card p-7">
            <p className="font-semibold text-foreground">服務縣市（12）</p>
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
          <ScrollReveal delay={120} className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-border bg-secondary/50 p-7 text-center">
              <p className="text-5xl font-black text-primary">12</p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">合作縣市</p>
            </div>
            <div className="rounded-3xl border border-border bg-secondary/50 p-7 text-center">
              <p className="text-5xl font-black text-primary">35+</p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">大專院校 & 高中職</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-7 sm:col-span-2">
              <p className="text-sm font-semibold text-foreground">代表性合作大學</p>
              <p className="mt-2 text-pretty text-sm text-muted-foreground">{partners.schools.join("、")}</p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-10 text-center">
          <Button size="lg" variant="outline" className="h-12 px-7" render={<Link href="/impact/partners" />}>
            看完整合作夥伴
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
        </ScrollReveal>
      </Section>
    </>
  )
}
