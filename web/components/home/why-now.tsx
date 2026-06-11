import { CloudFog, Quote } from "lucide-react"
import { Container } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ContourBg } from "@/components/section-decor"
import { FlowCap } from "@/components/home/flow-decor"
import { generationIssue, journeyVocab } from "@/lib/site"

/**
 * 世代課題（Why Now）：青年焦慮數據 + 實際心聲。
 * variant="path"（版本 B）：eyebrow 套路途語彙「迷霧」＋圖標、無框線（與 WaveSeam 接縫相鄰）、等高線底紋。
 * variant="flow"（版本 A 連續敘事版）：白底無框線，與前後段以曲線銜接。
 */
export function WhyNow({ variant }: { variant?: "path" | "flow" } = {}) {
  return (
    <section
      className={
        variant === "flow"
          ? "relative bg-primary py-24 md:py-28"
          : variant === "path"
            ? "relative bg-secondary/40 py-16 md:py-24"
            : "border-y border-border bg-secondary/40 py-16 md:py-24"
      }
    >
      {/* flow：上下白底以曲線咬入綠帶 */}
      {variant === "flow" && <FlowCap position="top" className="text-background" />}
      {variant === "flow" && <FlowCap position="bottom" className="text-background" />}
      {variant === "path" && <ContourBg />}
      <Container>
        <ScrollReveal className="max-w-2xl">
          <p
            className={`mb-3 text-sm font-semibold uppercase tracking-wide ${variant === "flow" ? "text-white/85" : "text-primary"}`}
          >
            {variant === "path" ? (
              <span className="inline-flex items-center gap-1.5">
                <CloudFog className="size-4" aria-hidden="true" />
                {journeyVocab.mist}・世代課題
              </span>
            ) : (
              "世代課題"
            )}
          </p>
          <h2
            className={`text-balance text-3xl font-black tracking-tight sm:text-4xl ${variant === "flow" ? "text-white" : "text-foreground"}`}
          >
            {variant === "path" ? (
              <>
                台灣社會正在面對的<span className="hl-sun">世代課題</span>
              </>
            ) : (
              "台灣社會正在面對的世代課題"
            )}
          </h2>
          <p
            className={`mt-4 text-pretty text-lg leading-relaxed ${variant === "flow" ? "text-white/90" : "text-muted-foreground"}`}
          >
            {generationIssue.lead}
          </p>
        </ScrollReveal>

        {/* path：白卡改亮葉綠粗框（明亮鮮豔方向，2026-06-11 使用者指定） */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <ScrollReveal className="grid gap-6 sm:grid-cols-2">
            {generationIssue.data.map((d) => (
              <div
                key={d.label}
                className={`rounded-3xl bg-card p-7 ${variant === "path" ? "border-2 border-leaf-bright glow-neon" : "border border-border"}`}
              >
                <p className="text-5xl font-black text-primary">{d.value}</p>
                <p className="mt-3 font-semibold text-foreground">{d.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{d.source}</p>
              </div>
            ))}
          </ScrollReveal>

          <ScrollReveal
            delay={120}
            className={`rounded-3xl bg-card p-7 ${variant === "path" ? "border-2 border-leaf-bright glow-neon" : "border border-border"}`}
          >
            <p className="font-semibold text-foreground">青年實際心聲</p>
            <ul className="mt-5 space-y-4">
              {generationIssue.voices.map((v) => (
                <li key={v} className="flex items-start gap-3 text-lg font-medium text-foreground/80">
                  <Quote className="mt-1.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        <ScrollReveal
          className={`mt-10 rounded-3xl p-8 text-center ${variant === "flow" ? "bg-card shadow-lg" : "bg-primary"}`}
        >
          <p
            className={`text-balance text-xl font-bold sm:text-2xl ${variant === "flow" ? "text-primary" : "text-primary-foreground"}`}
          >
            {generationIssue.conclusion}
          </p>
          <p
            className={`mx-auto mt-3 max-w-2xl text-pretty ${variant === "flow" ? "text-muted-foreground" : "text-primary-foreground/85"}`}
          >
            未來職場需要的，不再是知道答案的人，而是能定義問題、整合資源去解決問題的人。
          </p>
        </ScrollReveal>
      </Container>
    </section>
  )
}
