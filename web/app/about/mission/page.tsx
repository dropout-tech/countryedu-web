import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Quote } from "lucide-react"
import { Figure, PageHeader, Section, findCrumbs } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { pageMeta } from "@/lib/seo"
import { brand, futureSkills, generationIssue, journeyVocab, missionPillars } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = pageMeta({
  title: "使命與願景",
  description: "從看見迷霧、立下使命到裝備未來——鄉育為什麼此刻出發（Why Now），又要帶青年走向哪裡。",
  path: "/about/mission",
})

/**
 * 路線圖站點：timeline 式呈現的骨架（2026-06 決議：mission 頁採 timeline 式）。
 * 節點＋虛線路徑串起三站：迷霧（Why Now）→ 使命 → 未來就業力。
 */
function Station({
  no,
  eyebrow,
  title,
  description,
  children,
  last = false,
}: {
  no: string
  eyebrow: string
  title: string
  description?: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <li className="relative pl-12 sm:pl-16">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 flex size-9 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-black text-primary sm:size-10"
      >
        {no}
      </span>
      {!last && (
        <span
          aria-hidden="true"
          className="absolute -bottom-16 left-[17px] top-12 border-l-2 border-dashed border-primary/30 sm:left-[19px] md:-bottom-20"
        />
      )}
      <ScrollReveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
        <h2 className="mt-2 text-balance text-3xl font-black tracking-tight text-foreground sm:text-4xl">{title}</h2>
        {description && (
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground md:text-lg">{description}</p>
        )}
      </ScrollReveal>
      <div className="mt-8">{children}</div>
    </li>
  )
}

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="關於我們"
        title="使命與願景"
        lead={`${brand.mission}——教育不只是升學與知識傳遞，更重要的是幫助青年建立面對未來世界的「選擇」能力。`}
        crumbs={findCrumbs("/about/mission")}
      />

      {/* 三站路線圖：迷霧 → 使命 → 未來 */}
      <Section>
        <Figure
          src="/about/students-walking-park.jpg"
          alt="四位青年學子在綠意校園中邊走邊談、開懷而笑"
          caption="鄉育想陪伴的，是正在尋找方向、準備走向未來的青年世代"
          priority
          className="mb-16 md:mb-20"
        />
        <ol className="space-y-16 md:space-y-20">
          {/* 站 01：Why Now 世代課題 */}
          <Station
            no="01"
            eyebrow={`Why Now・${journeyVocab.mist}`}
            title="台灣社會正在面對的世代課題"
            description={generationIssue.lead}
          >
            {/* 數據一行四卡＋心聲整幅（2026-06-12 甲方回饋：原雙欄高低交錯的排法不對齊） */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                generationIssue.data[0],
                { ...generationIssue.subData[0], source: generationIssue.data[0].source },
                { ...generationIssue.subData[1], source: generationIssue.data[0].source },
                generationIssue.data[1],
              ].map((d, i) => (
                <ScrollReveal key={d.label} delay={i * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6">
                    <p className="text-4xl font-black text-primary lg:text-5xl">{d.value}</p>
                    <p className="mt-3 flex-1 text-pretty font-semibold text-foreground">{d.label}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{d.source}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={120} className="mt-4 rounded-3xl border border-border bg-card p-7">
              <p className="font-semibold text-foreground">青年實際心聲</p>
              <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {generationIssue.voices.map((v) => (
                  <li key={v} className="flex items-start gap-3 text-muted-foreground">
                    <Quote className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal className="mt-6 rounded-2xl bg-primary/10 p-6 text-center">
              <p className="text-pretty text-lg font-semibold text-primary">{generationIssue.conclusion}</p>
            </ScrollReveal>
          </Station>

          {/* 站 02：三大使命 */}
          <Station
            no="02"
            eyebrow="使命"
            title="鄉育的三大使命"
            description="從支持、追蹤到共創，建立一條可累積的人才培育路徑。"
          >
            <div className="grid gap-6 md:grid-cols-3">
              {missionPillars.map((p, i) => (
                <ScrollReveal key={p.no} delay={i * 120} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7">
                    <div
                      className={cn(
                        "flex size-12 items-center justify-center rounded-2xl text-lg font-black",
                        p.color === "accent" ? "bg-accent/15 text-accent" : "bg-primary/15 text-primary",
                      )}
                    >
                      {p.no}
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-foreground">{p.title}</h3>
                    <p className="mt-3 flex-1 text-pretty leading-relaxed text-muted-foreground">{p.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Station>

          {/* 站 03：未來就業力 */}
          <Station
            no="03"
            eyebrow="未來就業力"
            title="裝備面對未來的能力"
            description="對標美國 NACE 職業準備度指標（Career Readiness），把企業雇主最重視、AI 最難取代的軟實力，放進培訓的重心。"
            last
          >
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="grid gap-6">
                <ScrollReveal className="rounded-3xl border border-border bg-card p-7">
                  <p className="text-5xl font-black text-primary">{futureSkills.disruption.value}</p>
                  <p className="mt-3 text-pretty font-semibold text-foreground">{futureSkills.disruption.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{futureSkills.disruption.source}</p>
                </ScrollReveal>
                <ScrollReveal delay={100} className="rounded-3xl border border-border bg-card p-7">
                  <p className="text-center text-sm font-medium text-muted-foreground">企業雇主最重視的能力組成</p>
                  <div className="mt-6 flex h-5 overflow-hidden rounded-full">
                    <div
                      className="flex items-center justify-center bg-primary text-xs font-bold text-primary-foreground"
                      style={{ width: `${futureSkills.soft}%` }}
                    >
                      {futureSkills.soft}%
                    </div>
                    <div
                      className="flex items-center justify-center bg-accent text-xs font-bold text-accent-foreground"
                      style={{ width: `${futureSkills.hard}%` }}
                    >
                      {futureSkills.hard}%
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between text-sm">
                    <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                      <span className="size-3 rounded-full bg-primary" />軟實力 Soft Skills
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                      <span className="size-3 rounded-full bg-accent" />硬實力 Hard Skills
                    </span>
                  </div>
                  <p className="mt-6 text-pretty text-sm leading-relaxed text-muted-foreground">
                    超過 1,000 個企業雇主最重視的前十大核心技能中，八項屬於軟實力——這正是鄉育培訓的重心。
                  </p>
                </ScrollReveal>
              </div>

              <ScrollReveal delay={160} className="grid gap-2.5 sm:grid-cols-2">
                {futureSkills.skills.map((s) => (
                  <div key={s.en} className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{s.zh}</p>
                      <p className="text-xs text-muted-foreground">{s.en}</p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
                        s.soft ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent",
                      )}
                    >
                      {s.soft ? "軟實力" : "硬實力"}
                    </span>
                  </div>
                ))}
              </ScrollReveal>
            </div>
          </Station>
        </ol>
      </Section>

      {/* CTA */}
      <Section muted>
        <ScrollReveal className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-balance text-2xl font-bold text-foreground sm:text-3xl">想知道我們如何把使命化為行動？</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-12 px-7" render={<Link href="/programs/overview" />}>
              認識尋路計畫
              <ArrowRight className="size-5" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-7" render={<Link href="/about/story" />}>
              閱讀創立故事
            </Button>
          </div>
        </ScrollReveal>
      </Section>
    </>
  )
}
