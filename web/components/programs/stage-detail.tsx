import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Container, PageHeader, Section, SectionHeading, findCrumbs } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { threeStages } from "@/lib/site"
import { cn } from "@/lib/utils"

/** 三階段詳述共用版型 */
export function StageDetail({ slug }: { slug: string }) {
  const idx = threeStages.findIndex((s) => s.slug === slug)
  const stage = threeStages[idx]
  const next = threeStages[idx + 1]
  const crumbs = findCrumbs(`/programs/${slug}`)

  return (
    <>
      <PageHeader
        eyebrow={`${stage.waypoint}・${stage.phase} · ${stage.en}`}
        title={`${stage.title}｜${stage.subtitle}`}
        lead={stage.summary}
        crumbs={crumbs}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">本階段重點</p>
            <h2 className="mt-2 text-2xl font-bold text-foreground">{stage.title}會帶來什麼</h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{stage.summary}</p>
          </ScrollReveal>
          <ScrollReveal delay={120} className="space-y-3">
            {stage.points.map((p) => (
              <div key={p} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
                <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-pretty text-foreground/85">{p}</span>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </Section>

      <Section muted>
        <SectionHeading align="center" title="三階段，環環相扣" description="每一階段都建立在前一階段的基礎上，讓能力被看見、被證明。" />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {threeStages.map((s, i) => (
            <span
              key={s.slug}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium",
                i === idx ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground",
              )}
            >
              {s.phase}　{s.title}
            </span>
          ))}
        </div>
        <div className="mt-8 text-center">
          {next ? (
            <Button size="lg" className="h-12 px-7" render={<Link href={`/programs/${next.slug}`} />}>
              往下一站：{next.title}
              <ArrowRight className="size-5" aria-hidden="true" />
            </Button>
          ) : (
            <Button size="lg" className="h-12 px-7" render={<Link href="/programs/apply" />}>
              整裝出發，前往報名
              <ArrowRight className="size-5" aria-hidden="true" />
            </Button>
          )}
        </div>
      </Section>
    </>
  )
}
