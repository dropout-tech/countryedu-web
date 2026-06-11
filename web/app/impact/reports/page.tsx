import type { Metadata } from "next"
import { FileText, Hourglass } from "lucide-react"
import { PageHeader, Section, findCrumbs } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { pageMeta } from "@/lib/seo"
import { reportsList } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "年度報告",
  description: "鄉育教育基金會年度報告與影響力白皮書下載。",
  path: "/impact/reports",
})

/** 年度報告：reportsList 驅動；preparing 顯示準備中、不可點，PDF 到位後改 status/href 即上線。 */
export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="影響力"
        title="年度報告"
        lead="把一年的足跡整理成可以攤開來看的地圖——對支持者誠實交代每一步。"
        crumbs={findCrumbs("/impact/reports")}
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          {reportsList.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 110} className="h-full">
              {r.status === "available" && r.href ? (
                <a
                  href={r.href}
                  className="group flex h-full items-center gap-4 rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                >
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <FileText className="size-6" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-bold text-foreground">{r.title}</span>
                    <span className="mt-0.5 block text-sm text-primary">下載 PDF</span>
                  </span>
                </a>
              ) : (
                <div className="flex h-full items-center gap-4 rounded-3xl border border-dashed border-border bg-secondary/40 p-6">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-card text-muted-foreground">
                    <Hourglass className="size-6" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-bold text-foreground">{r.title}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{r.note ?? "準備中"}</span>
                  </span>
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal className="mt-8 text-sm text-muted-foreground">
          報告發布後將於本頁開放下載；如需歷年結案影響力報告，歡迎與我們聯絡。
        </ScrollReveal>
      </Section>
    </>
  )
}
