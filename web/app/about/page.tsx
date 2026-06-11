import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHeader, Section, SectionHeading, findCrumbs } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { pageMeta } from "@/lib/seo"
import { brand, journeyVocab, nav } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "關於鄉育",
  description: "鄉育教育基金會——青年路上的嚮導。從地方教育出發，陪青年把迷惘走成方向。",
  path: "/about",
})

const aboutNav = nav.find((s) => s.href === "/about")?.items ?? []

/** 關於我們 hub：嚮導定位一句話＋四張子頁導覽卡 */
export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="關於我們"
        title="青年路上的嚮導"
        lead={`${brand.mission}。媒合只是一種結果，選擇才是一種能力——我們陪青年把迷惘走成方向。`}
        crumbs={findCrumbs("/about")}
      />

      <Section>
        <SectionHeading
          eyebrow={journeyVocab.company}
          title="認識帶路的人"
          description="為什麼出發、走過哪些路、誰在帶路、用什麼方法陪伴——四個面向認識鄉育。"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {aboutNav.map((item, i) => (
            <ScrollReveal key={item.href} delay={i * 100} className="h-full">
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <span className="text-sm font-black text-primary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-xl font-bold text-foreground">{item.title}</h3>
                <p className="mt-1 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  前往
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </>
  )
}
