import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { FlowCap } from "@/components/home/flow-decor"
import { impactStats } from "@/lib/site"

/** 影響力三格：取 impactStats 中與 Hero 數據互補、不衝突的三項（口徑備註見 lib/site.ts） */
const STATS = impactStats.slice(1)

/**
 * variant="flow"（版本 A 連續敘事版）：亮綠滿版彩帶（v3.2 提亮方案 ⑤）——
 * 與結尾橘 CTA 形成綠橘雙高潮；白卡浮在亮綠上、數字綠、單位橘、金底線。
 */
export function ImpactStrip({ variant }: { variant?: "flow" } = {}) {
  const flow = variant === "flow"
  return (
    <section className={flow ? "relative bg-primary py-24 md:py-28" : "py-16 md:py-24"}>
      {/* flow：上下白底以曲線咬入亮綠帶 */}
      {flow && <FlowCap position="top" className="text-background" />}
      <Container>
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p
            className={`mb-3 text-sm font-semibold uppercase tracking-wide ${flow ? "text-white/85" : "text-primary"}`}
          >
            影響力
          </p>
          <h2
            className={`text-balance text-3xl font-black tracking-tight sm:text-4xl ${flow ? "text-white" : "text-foreground"}`}
          >
            用可累積的證據，創造三贏
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <ScrollReveal
              key={s.label}
              delay={i * 120}
              className={`rounded-3xl p-8 text-center ${flow ? "bg-card shadow-lg" : "border border-border bg-secondary/50"}`}
            >
              <p className="text-5xl font-black text-primary">
                {s.value}
                {s.unit && (
                  <span className={`ml-1 text-2xl font-bold ${flow ? "text-accent" : ""}`}>{s.unit}</span>
                )}
              </p>
              {flow && <span aria-hidden="true" className="mx-auto mt-3 block h-1.5 w-12 rounded-full bg-sun-gold" />}
              <p className="mt-3 text-sm font-medium text-muted-foreground">{s.label}</p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-10 text-center">
          <Link
            href="/impact"
            className={`inline-flex items-center gap-1 font-semibold hover:underline ${flow ? "text-white" : "text-primary"}`}
          >
            看見更多影響力
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </ScrollReveal>
      </Container>
      {flow && <FlowCap position="bottom" className="text-background" />}
    </section>
  )
}
