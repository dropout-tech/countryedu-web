import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Info } from "lucide-react"
import { PageHeader, Section, SectionHeading, findCrumbs } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { pageMeta } from "@/lib/seo"
import { guideRoles, journeyVocab, team, type TeamMember } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "團隊成員",
  description: "認識鄉育的嚮導們——團隊成員、董事會與顧問群，以及陪青年走路的三層陪伴結構。",
  path: "/about/team",
})

/** 治理名單卡（董事會／顧問群共用） */
function GovernanceGrid({ list }: { list: readonly TeamMember[] }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((m) => (
        <div key={m.name} className="rounded-3xl border border-border bg-card p-6">
          <p className="font-bold text-foreground">{m.name}</p>
          <p className="mt-1 text-sm text-primary">{m.title}</p>
        </div>
      ))}
    </div>
  )
}

/**
 * 團隊頁：team／guideRoles（lib/site.ts）驅動。
 * TODO：完整名單、董事會／顧問群與照片素材待基金會提供；
 * 照片缺席時以姓名字首圓形 placeholder 呈現，治理名單空缺時顯示「整理中」誠實空狀態。
 */
export default function Page() {
  const hasGovernance = team.board.length > 0 || team.advisors.length > 0
  return (
    <>
      <PageHeader
        eyebrow="關於我們"
        title="帶路的人"
        lead="嚮導不是替你走路的人，而是陪你看清地圖、在岔路口與你討論的人。"
        crumbs={findCrumbs("/about/team")}
      />

      {/* 工作團隊 */}
      <Section>
        <SectionHeading eyebrow="工作團隊" title="團隊成員" />
        <ScrollReveal className="mt-8 flex items-start gap-3 rounded-3xl border border-border bg-secondary/50 p-5">
          <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{team.note}</p>
        </ScrollReveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map((m, i) => (
            <ScrollReveal key={m.name} delay={i * 100} className="h-full">
              <div className="flex h-full flex-col items-start rounded-3xl border border-border bg-card p-7">
                {/* 照片素材待提供，先以示意大頭貼／姓名字首圓示意 */}
                {m.avatar ? (
                  <img
                    src={m.avatar}
                    alt=""
                    aria-hidden="true"
                    className="size-16 rounded-full bg-primary/12 object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="inline-flex size-16 items-center justify-center rounded-full bg-primary/12 text-2xl font-black text-primary"
                  >
                    {m.name.charAt(0)}
                  </span>
                )}
                <h3 className="mt-4 text-xl font-bold text-foreground">
                  {m.name}
                  {m.en && <span className="ml-2 text-sm font-medium text-muted-foreground">{m.en}</span>}
                </h3>
                <p className="mt-1 text-sm font-semibold text-primary">{m.title}</p>
                {m.bio && <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">{m.bio}</p>}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* 三層陪伴結構 */}
      <Section muted>
        <SectionHeading
          eyebrow={`${journeyVocab.company}・陪伴結構`}
          title="帶路的，不只一個人"
          description="在每一段旅程裡，學生身邊有三種同行者——各自走在不同的位置，缺一不可。"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {guideRoles.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 110} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7">
                <p className="text-sm font-semibold text-primary">{r.subtitle}</p>
                <h3 className="mt-1.5 text-xl font-bold text-foreground">{r.title}</h3>
                <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* 董事會與顧問群 */}
      <Section>
        <SectionHeading eyebrow="治理" title="董事會與顧問群" />
        {hasGovernance ? (
          <div className="mt-6 space-y-10">
            {team.board.length > 0 && (
              <div>
                <ScrollReveal>
                  <h3 className="text-xl font-bold text-foreground">董事會</h3>
                </ScrollReveal>
                <GovernanceGrid list={team.board} />
              </div>
            )}
            {team.advisors.length > 0 && (
              <div>
                <ScrollReveal>
                  <h3 className="text-xl font-bold text-foreground">顧問群</h3>
                </ScrollReveal>
                <GovernanceGrid list={team.advisors} />
              </div>
            )}
          </div>
        ) : (
          <ScrollReveal className="mt-8 rounded-3xl border border-dashed border-border bg-card/60 p-8 text-center">
            <p className="font-semibold text-foreground">名單整理中</p>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
              董事會與顧問群名單正由基金會彙整確認，將於確認後在此公布。
            </p>
          </ScrollReveal>
        )}
      </Section>

      {/* CTA */}
      <Section muted>
        <ScrollReveal className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-balance text-2xl font-bold text-foreground">想加入帶路的行列？</h2>
          <Button size="lg" className="h-12 px-7" render={<Link href="/involve/careers" />}>
            看徵才與志工機會
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
        </ScrollReveal>
      </Section>
    </>
  )
}
