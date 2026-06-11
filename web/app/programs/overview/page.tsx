import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, FileText, MoveRight, Sparkles } from "lucide-react"
import { PageHeader, Section, SectionHeading, findCrumbs } from "@/components/page-shell"
import { CompanionCtas } from "@/components/programs/companion-ctas"
import { OverviewStages } from "@/components/programs/overview-stages"
import { actIcons } from "@/components/journey-icons"
import { WaveSeam } from "@/components/section-decor"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { pageMeta } from "@/lib/seo"
import { brand, digitalPortfolio, generationIssue, pathfinderActs, spiralPhases, storyActs } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "計畫總覽｜尋路計畫",
  description: "尋路計畫 Pathfinder Program——學生是找路的人，鄉育是嚮導。五段路程：迷霧、地圖、走法、足跡、同行。",
  path: "/programs/overview",
})

/**
 * 計畫總覽：五段敘事弧（lib/site.ts pathfinderActs）。
 * ①迷霧（為什麼）→②地圖（宏觀三階段）→③走法（四能力循環）→④足跡（數位履歷＋故事）→⑤同行（三分流）。
 * 詞彙紀律：②談「階段」（旅程層）、③只談「循環／象限」（方法層）。
 */
const [actMist, actMap, actWalk, actFootprints, actCompany] = pathfinderActs

/** 段落 eyebrow：路途圖標＋編號＋路途語彙（圖標映射見 components/journey-icons.tsx） */
function ActEyebrow({ act }: { act: (typeof pathfinderActs)[number] }) {
  const Icon = actIcons[act.key]
  return (
    <span className="inline-flex items-center gap-1.5">
      {Icon && <Icon className="size-4" aria-hidden="true" />}
      {act.no}・{act.waypoint}
    </span>
  )
}

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow={`${brand.programName} ${brand.programNameEn}`}
        title="一條把迷惘走成方向的路"
        lead="學生是找路的人，鄉育是嚮導。從認識自己啟程，在真實世界實踐，帶著有證據的成長走向未來。"
        crumbs={findCrumbs("/programs/overview")}
      />

      {/* ① 迷霧：為什麼需要尋路（簡短橋接，完整論述在 about/mission） */}
      <Section>
        <SectionHeading eyebrow={<ActEyebrow act={actMist} />} title={actMist.title} description={actMist.lead} />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <ScrollReveal className="grid gap-4 sm:grid-cols-2">
            {generationIssue.data.map((d) => (
              <div key={d.label} className="rounded-3xl border border-border bg-card p-6">
                <p className="text-4xl font-black text-primary">{d.value}</p>
                <p className="mt-2 font-semibold text-foreground">{d.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{d.source}</p>
              </div>
            ))}
          </ScrollReveal>
          <ScrollReveal delay={120} className="flex flex-col justify-center gap-4 rounded-3xl bg-secondary/60 p-7">
            <p className="text-pretty text-lg font-medium leading-relaxed text-foreground">
              {generationIssue.conclusion}
            </p>
            <Link
              href={actMist.href}
              className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
            >
              了解我們看見的世代課題
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>
      </Section>

      <WaveSeam top="white" muted={50} />

      {/* ② 地圖：宏觀三階段（旅程層，保留「階段」一詞） */}
      <Section muted>
        <SectionHeading eyebrow={<ActEyebrow act={actMap} />} title={actMap.title} description={actMap.lead} />
        <OverviewStages />
      </Section>

      <WaveSeam top="muted" muted={50} shape="b" />

      {/* ③ 走法：四能力螺旋循環（方法層，只談循環／象限） */}
      <Section>
        <SectionHeading eyebrow={<ActEyebrow act={actWalk} />} title={actWalk.title} description={actWalk.lead} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {spiralPhases.map((p, i) => (
            <ScrollReveal key={p.key} delay={i * 100} className="h-full">
              <div
                className="flex h-full flex-col gap-2 rounded-3xl border border-border bg-card p-6"
                style={{ borderTopColor: p.hue, borderTopWidth: 4 }}
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-3.5 rounded-full"
                  style={{ backgroundColor: p.hue }}
                />
                <p className="font-bold text-foreground">
                  {p.title}
                  <span className="ml-2 text-sm font-medium text-muted-foreground">{p.label}</span>
                </p>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal className="mt-10 text-center">
          <Button size="lg" className="h-12 px-7" render={<Link href={actWalk.href} />}>
            看 16 週怎麼走
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
        </ScrollReveal>
      </Section>

      <WaveSeam top="white" muted={50} shape="b" flip />

      {/* ④ 足跡：動態成長數位履歷＋四幕故事預告 */}
      <Section muted>
        <SectionHeading
          eyebrow={<ActEyebrow act={actFootprints} />}
          title={actFootprints.title}
          description={actFootprints.lead}
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
          <ScrollReveal className="flex items-center justify-center gap-4">
            <div className="flex w-28 flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-card p-5 text-center">
              <FileText className="size-8 text-muted-foreground" aria-hidden="true" />
              <span className="text-xs font-medium text-muted-foreground">傳統靜態紙本履歷</span>
            </div>
            <MoveRight className="size-7 shrink-0 text-primary" aria-hidden="true" />
            <div className="flex w-28 flex-col items-center gap-2 rounded-2xl border-2 border-primary bg-card p-5 text-center">
              <Sparkles className="size-8 text-primary" aria-hidden="true" />
              <span className="text-xs font-bold text-foreground">動態成長數位履歷</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} className="grid gap-3 sm:grid-cols-2">
            {digitalPortfolio.map((d) => (
              <div key={d.title} className="rounded-2xl border border-border bg-card px-5 py-4">
                <p className="text-sm font-semibold text-foreground">{d.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{d.meta}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>

        {/* 四幕故事預告：一句話＋導流 */}
        <ScrollReveal className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-border bg-card p-7 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-pretty font-medium text-foreground">
            「{storyActs[3].a}」——每一段足跡，都是一個四幕的成長故事。
          </p>
          <Link
            href="/impact/learning-story"
            className="inline-flex shrink-0 items-center gap-1 font-semibold text-primary hover:underline"
          >
            走進完整故事
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </ScrollReveal>
      </Section>

      <WaveSeam top="muted" muted={50} flip />

      {/* ⑤ 同行：學生／大學／企業三分流 */}
      <Section>
        <SectionHeading
          align="center"
          eyebrow={<ActEyebrow act={actCompany} />}
          title={actCompany.title}
          description={actCompany.lead}
        />
        <CompanionCtas />
      </Section>
    </>
  )
}
