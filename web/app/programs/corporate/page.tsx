import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { PageHeader, Section, SectionHeading, findCrumbs } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { pageMeta } from "@/lib/seo"
import { corporateProgram, journeyVocab } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "企業專班",
  description: "企業導師制度與真實案例——成為青年路上的同行者，連結未來人才。",
  path: "/programs/corporate",
})

/** 企業專班：corporateProgram 驅動；合作方案金額詳情導向 /involve/corporate（corporateTiers）。 */
export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow={`計畫・${journeyVocab.company}`}
        title="企業專班"
        lead={corporateProgram.lead}
        crumbs={findCrumbs("/programs/corporate")}
      />

      {/* 企業參與方式 */}
      <Section>
        <SectionHeading
          eyebrow="陪走一段"
          title="企業可以怎麼參與"
          description="不只是出資，而是把真實的職場視角帶進課堂——這正是學生最缺、學校最難給的。"
        />
        <div className="mt-10 grid gap-3 lg:grid-cols-3">
          {corporateProgram.mentorPoints.map((p, i) => (
            <ScrollReveal key={p} delay={i * 100} className="h-full">
              <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-card p-5">
                <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-pretty text-foreground/85">{p}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* 合作流程 */}
      <Section muted>
        <SectionHeading eyebrow="同行的節奏" title="合作流程" />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {corporateProgram.flow.map((f, i) => (
            <ScrollReveal as="li" key={f.step} delay={i * 100} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6">
                <span className="text-sm font-black text-primary">{f.step}</span>
                <h3 className="mt-2 font-bold text-foreground">{f.title}</h3>
                <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </ol>
      </Section>

      {/* CTA：方案金額在 involve/corporate */}
      <Section>
        <ScrollReveal className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-balance text-2xl font-bold text-foreground sm:text-3xl">
            想看四種合作方案的具體內容？
          </h2>
          <p className="max-w-xl text-pretty text-muted-foreground">
            從種子教育夥伴到未來人才戰略夥伴，找到最適合貴公司 ESG 目標的同行方式。
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-12 px-7" render={<Link href="/involve/corporate" />}>
              看企業合作方案
              <ArrowRight className="size-5" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-7" render={<Link href="/contact" />}>
              直接與我們聊聊
            </Button>
          </div>
        </ScrollReveal>
      </Section>
    </>
  )
}
