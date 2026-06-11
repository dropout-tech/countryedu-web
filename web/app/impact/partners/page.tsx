import type { Metadata } from "next"
import { MapPin } from "lucide-react"
import { PageHeader, Section, SectionHeading, findCrumbs } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { pageMeta } from "@/lib/seo"
import { partners } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "合作夥伴",
  description: "與企業、大學與公益組織同行——鄉育的合作網絡遍及全台 12 縣市。",
  path: "/impact/partners",
})

/** 合作夥伴頁。企業 Logo 授權未確認前一律以文字呈現（會議決議），授權後再替換為 logo 牆。 */
const GROUPS = [
  { title: "企業夥伴", desc: "以導師、參訪與資源投入，陪青年走進真實世界。", items: partners.companies },
  { title: "合作大專院校", desc: "把尋路計畫帶進課堂，與我們共創 16 週的學習旅程。", items: partners.schools },
  { title: "公益夥伴", desc: "攜手把探索的機會，帶給更多資源受限的青年。", items: partners.ngos },
] as const

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="影響力・同行"
        title="一起開路的夥伴"
        lead="這條路不是鄉育一個人走出來的——企業、學校與公益組織，都是路上的同行者。"
        crumbs={findCrumbs("/impact/partners")}
      />

      <Section>
        <div className="space-y-12">
          {GROUPS.map((g, gi) => (
            <ScrollReveal key={g.title} delay={gi * 100}>
              <h2 className="text-2xl font-bold text-foreground">{g.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{g.desc}</p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {g.items.map((name) => (
                  <li
                    key={name}
                    className="rounded-full border border-border bg-card px-5 py-2.5 font-medium text-foreground/85"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          align="center"
          eyebrow="足跡遍及"
          title={`${partners.counties.length} 個縣市，路越走越遠`}
          description="從本島到離島，從都會到非山非市——探索的機會，不該由出生地決定。"
        />
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {partners.counties.map((c, i) => (
            <ScrollReveal key={c} delay={i * 60}>
              <div className="flex items-center justify-center gap-1.5 rounded-2xl border border-border bg-card px-3 py-3 text-sm font-semibold text-foreground">
                <MapPin className="size-3.5 text-primary" aria-hidden="true" />
                {c}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </>
  )
}
