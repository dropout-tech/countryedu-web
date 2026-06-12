import type { Metadata } from "next"
import { Hourglass } from "lucide-react"
import { PageHeader, Section, SectionHeading, findCrumbs } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { pageMeta } from "@/lib/seo"
import { digitalPortfolio, futureSkills, journeyVocab } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "成果摘要",
  description: "從動態成長數位履歷到能力證據——尋路計畫的質化與量化成果。",
  path: "/impact/outcomes",
})

/** 成果摘要：五大成長證據＋未來能力對標。前後測數據待基金會彙整（TODO），先以準備中卡呈現。 */
export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow={`影響力・${journeyVocab.footprints}`}
        title="成果摘要"
        lead="走完一段路，留下的不是證書，而是可比較、可累積、可被理解的成長證據。"
        crumbs={findCrumbs("/impact/outcomes")}
      />

      <Section>
        <SectionHeading
          eyebrow="五種足跡"
          title="動態成長數位履歷的五大證據"
          description="每位學生在 16 週裡累積的真實紀錄——讓軟實力說得出口、拿得出手。"
        />
        {/* 順序卡：直排或單行，不換行成格（2026-06-12 甲方回饋） */}
        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-5">
          {digitalPortfolio.map((d, i) => (
            <ScrollReveal key={d.title} delay={i * 80} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6">
                <span className="text-sm font-black text-primary">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-bold text-foreground">{d.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{d.meta}</p>
              </div>
            </ScrollReveal>
          ))}
          {/* 前後測數據：TODO 待基金會彙整正式數據後替換為圖表 */}
          <ScrollReveal delay={200} className="h-full">
            <div className="flex h-full flex-col items-start rounded-3xl border border-dashed border-border bg-secondary/40 p-6">
              <Hourglass className="size-5 text-muted-foreground" aria-hidden="true" />
              <p className="mt-2 font-bold text-foreground">前後測成長數據</p>
              <p className="mt-1 text-sm text-muted-foreground">資料彙整中，將以課程前後測對比呈現能力成長。</p>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          eyebrow="對標國際"
          title="我們培養的，是 AI 難以取代的能力"
          description={futureSkills.intro}
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <ScrollReveal className="rounded-3xl border border-border bg-card p-8">
            <p className="text-sm font-semibold text-muted-foreground">未來十大核心技能中</p>
            <p className="mt-2 text-5xl font-black text-primary">
              {futureSkills.soft}%<span className="ml-2 text-xl font-bold text-foreground">屬於軟實力</span>
            </p>
            <div className="mt-6 flex h-4 overflow-hidden rounded-full bg-border">
              <span className="bg-primary" style={{ width: `${futureSkills.soft}%` }} aria-hidden="true" />
              <span className="bg-accent/60" style={{ width: `${futureSkills.hard}%` }} aria-hidden="true" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              軟實力 {futureSkills.soft}%・硬實力 {futureSkills.hard}%（WEF《2025 未來就業報告》前十大技能）
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <ul className="flex flex-wrap gap-2.5">
              {futureSkills.skills.map((s) => (
                <li
                  key={s.zh}
                  className={
                    s.soft
                      ? "rounded-full bg-primary/12 px-4 py-2 text-sm font-semibold text-primary"
                      : "rounded-full bg-card px-4 py-2 text-sm font-medium text-muted-foreground"
                  }
                >
                  {s.zh}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">綠色＝軟實力；其餘為硬實力。</p>
          </ScrollReveal>
        </div>
      </Section>
    </>
  )
}
