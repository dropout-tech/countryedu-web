import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Info } from "lucide-react"
import { PageHeader, Section, SectionHeading, findCrumbs } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { pageMeta } from "@/lib/seo"
import { team } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "團隊成員",
  description: "認識鄉育的嚮導們——由教育、職涯與產業背景的夥伴組成。",
  path: "/about/team",
})

/**
 * 團隊頁：team（lib/site.ts）驅動。
 * TODO：完整名單、董事會／顧問群與照片素材待基金會提供；
 * 照片缺席時以姓名字首圓形 placeholder 呈現，board/advisors 為空陣列時整段隱藏。
 */
export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="關於我們"
        title="帶路的人"
        lead="嚮導不是替你走路的人，而是陪你看清地圖、在岔路口與你討論的人。"
        crumbs={findCrumbs("/about/team")}
      />

      <Section>
        <ScrollReveal className="flex items-start gap-3 rounded-3xl border border-border bg-secondary/50 p-5">
          <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{team.note}</p>
        </ScrollReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map((m, i) => (
            <ScrollReveal key={m.name} delay={i * 100} className="h-full">
              <div className="flex h-full flex-col items-start rounded-3xl border border-border bg-card p-7">
                {/* 照片素材待提供，先以姓名字首圓示意 */}
                <span
                  aria-hidden="true"
                  className="inline-flex size-16 items-center justify-center rounded-full bg-primary/12 text-2xl font-black text-primary"
                >
                  {m.name.charAt(0)}
                </span>
                <h2 className="mt-4 text-xl font-bold text-foreground">
                  {m.name}
                  {m.en && <span className="ml-2 text-sm font-medium text-muted-foreground">{m.en}</span>}
                </h2>
                <p className="mt-1 text-sm font-semibold text-primary">{m.title}</p>
                {m.bio && <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">{m.bio}</p>}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {team.board.length > 0 && (
        <Section muted>
          <SectionHeading title="董事會" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.board.map((m) => (
              <div key={m.name} className="rounded-3xl border border-border bg-card p-6">
                <p className="font-bold text-foreground">{m.name}</p>
                <p className="mt-1 text-sm text-primary">{m.title}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {team.advisors.length > 0 && (
        <Section>
          <SectionHeading title="顧問群" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.advisors.map((m) => (
              <div key={m.name} className="rounded-3xl border border-border bg-card p-6">
                <p className="font-bold text-foreground">{m.name}</p>
                <p className="mt-1 text-sm text-primary">{m.title}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

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
