import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Quote } from "lucide-react"
import { PageHeader, Section, SectionHeading, findCrumbs } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { pageMeta } from "@/lib/seo"
import { brand, futureSkills, generationIssue, journeyVocab, missionPillars } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = pageMeta({
  title: "使命與願景",
  description: "教育不只是升學與知識傳遞，更重要的是幫助青年建立面對未來世界的「選擇」能力。",
  path: "/about/mission",
})

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="關於我們"
        title="使命與願景"
        lead={`${brand.mission}——教育不只是升學與知識傳遞，更重要的是幫助青年建立面對未來世界的「選擇」能力。`}
        crumbs={findCrumbs("/about/mission")}
      />

      {/* 世代課題 Why Now */}
      <Section>
        <SectionHeading
          eyebrow={`Why Now・${journeyVocab.mist}`}
          title="台灣社會正在面對的世代課題"
          description={generationIssue.lead}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <ScrollReveal className="grid gap-6 sm:grid-cols-2">
            {generationIssue.data.map((d) => (
              <div key={d.label} className="rounded-3xl border border-border bg-card p-7">
                <p className="text-5xl font-black text-primary">{d.value}</p>
                <p className="mt-3 font-semibold text-foreground">{d.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{d.source}</p>
              </div>
            ))}
          </ScrollReveal>
          <ScrollReveal delay={120} className="rounded-3xl border border-border bg-card p-7">
            <p className="font-semibold text-foreground">青年實際心聲</p>
            <ul className="mt-4 space-y-3">
              {generationIssue.voices.map((v) => (
                <li key={v} className="flex items-start gap-3 text-muted-foreground">
                  <Quote className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
        <ScrollReveal className="mt-8 rounded-2xl bg-primary/10 p-6 text-center">
          <p className="text-pretty text-lg font-semibold text-primary">{generationIssue.conclusion}</p>
        </ScrollReveal>
      </Section>

      {/* 三大使命支柱 */}
      <Section muted>
        <SectionHeading eyebrow="使命" title="鄉育的三大使命" description="從支持、追蹤到共創，建立一條可累積的人才培育路徑。" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
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
      </Section>

      {/* 培育未來就業核心能力 */}
      <Section>
        <SectionHeading eyebrow="未來就業力" title="培育未來就業核心能力" description={futureSkills.intro} />
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <ScrollReveal>
            <div className="rounded-3xl border border-border bg-card p-8">
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
                前十大核心技能中，八項屬於軟實力——這正是鄉育三階段培訓的重心。
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} className="grid gap-2.5 sm:grid-cols-2">
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
