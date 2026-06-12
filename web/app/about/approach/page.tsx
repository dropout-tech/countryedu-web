import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"
import { Figure, PageHeader, Section, SectionHeading, findCrumbs } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { pageMeta } from "@/lib/seo"
import { approachPrinciples, coreSkills, digitalPortfolio, journeyVocab, spiralPhases } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "陪伴哲學",
  description: "嚮導的方法論：從自我理解出發、在真實世界中實作、以螺旋循環加深、讓證據說話。",
  path: "/about/approach",
})

/**
 * 陪伴哲學：四原則＋方法層說明（四象限循環＋七大核心工作能力）。
 * 詞彙紀律：本頁屬方法層，談 spiralPhases 一律用「循環／象限」，不用「階段」。
 */
export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="關於我們"
        title="嚮導的方法"
        lead="我們不替學生決定方向，而是給地圖、給羅盤、陪走一段——讓選擇成為一種能力。"
        crumbs={findCrumbs("/about/approach")}
      />

      {/* 四原則：直排卡片＋照片並排右側（2026-06-12 甲方回饋：順序卡片不換行成格） */}
      <Section>
        <SectionHeading
          eyebrow="陪伴哲學"
          title="四個帶路的原則"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="flex flex-col gap-4">
            {approachPrinciples.map((p, i) => (
              <ScrollReveal key={p.no} delay={i * 90}>
                <div className="flex gap-5 rounded-3xl border border-border bg-card p-6 md:p-7">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-primary text-sm font-black text-primary">
                    {p.no}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground md:text-xl">{p.title}</h3>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <Figure
            src="/about/students-reading-grass.jpg"
            alt="三位學生坐在草地上一起翻書閱讀、交流討論"
            caption="先看懂自己，再決定往哪裡走——陪伴，從自我理解開始"
            aspect="aspect-[16/10] lg:aspect-auto lg:flex-1"
            sizes="(max-width: 1024px) 92vw, 560px"
            className="flex flex-col lg:h-full"
          />
        </div>
      </Section>

      {/* 方法層：四象限循環 */}
      <Section muted>
        <SectionHeading
          eyebrow="路上的羅盤"
          title="四種能力，循環使用"
          description="在每一次真實專案裡，四種能力像羅盤一樣被反覆使用——沒有先後高低，一圈一圈加深。"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="flex flex-col gap-4">
            {spiralPhases.map((p, i) => (
              <ScrollReveal key={p.key} delay={i * 90}>
                <div className="flex gap-4 rounded-3xl border border-border bg-card p-6">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 inline-flex size-3.5 shrink-0 rounded-full"
                    style={{ backgroundColor: p.hue }}
                  />
                  <div>
                    <p className="font-bold text-foreground">
                      {p.title}
                      <span className="ml-2 text-sm font-medium text-muted-foreground">{p.label}</span>
                    </p>
                    <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <Figure
            src="/about/students-discussion-grass.jpg"
            alt="三位青年圍坐在草地上，一人持筆電與同伴熱絡討論"
            caption="在每一次真實專案裡，四種能力像羅盤一樣被反覆使用、一圈圈加深"
            aspect="aspect-[16/10] lg:aspect-auto lg:flex-1"
            sizes="(max-width: 1024px) 92vw, 560px"
            className="flex flex-col lg:h-full"
          />
        </div>
      </Section>

      {/* 七大核心工作能力 */}
      <Section>
        <SectionHeading
          eyebrow="累積的裝備"
          title="七大核心工作能力"
          description="跨產業、跨職能皆可遷移的能力——學生走完這條路時背包裡帶走的東西。"
        />
        {/* 順序清單：單欄直排（2026-06-12 甲方回饋：編號項目不換行成格） */}
        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
          {coreSkills.map((skill, i) => (
            <ScrollReveal key={skill} delay={i * 60}>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-sm font-black text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-semibold text-foreground">{skill}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* 讓證據說話：動態成長數位履歷（呼應原則 04） */}
      <Section muted>
        <SectionHeading
          eyebrow={`${journeyVocab.footprints}・成長證據`}
          title="讓證據說話"
          description="走過的路要看得見——16 週結束時，學生帶走的不是一張證書，而是一份動態成長數位履歷。"
        />
        <div className="mt-12 grid items-center gap-6 lg:grid-cols-[0.8fr_auto_1.2fr]">
          <ScrollReveal className="h-full">
            <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/60 p-7 text-center">
              <FileText className="size-8 text-muted-foreground" aria-hidden="true" />
              <p className="mt-3 font-bold text-muted-foreground">傳統靜態履歷</p>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                一頁紙上的自述——能力停在形容詞，看不見過程與證據。
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80} className="flex justify-center">
            <ArrowRight className="size-8 text-primary max-lg:rotate-90" aria-hidden="true" />
          </ScrollReveal>
          <ScrollReveal delay={140} className="rounded-3xl border-2 border-primary/40 bg-card p-7">
            <p className="font-bold text-foreground">動態成長數位履歷</p>
            <ul className="mt-4 space-y-2.5">
              {digitalPortfolio.map((d) => (
                <li
                  key={d.title}
                  className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl bg-secondary/60 px-4 py-2.5 text-sm"
                >
                  <span className="font-semibold text-foreground">{d.title}</span>
                  <span className="text-xs text-muted-foreground">{d.meta}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
        <ScrollReveal className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="h-12 px-7" render={<Link href="/programs/journey" />}>
            看這套方法在 16 週裡怎麼運作
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-7" render={<Link href="/impact/outcomes" />}>
            看學生留下的成果
          </Button>
        </ScrollReveal>
      </Section>
    </>
  )
}
