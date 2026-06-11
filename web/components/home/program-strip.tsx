"use client"

import { ChevronRight } from "lucide-react"
import { Container } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { StageDialogContent, stageBadgeClass } from "@/components/programs/stage-dialog"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { FlowCap } from "@/components/home/flow-decor"
import { ContourBg } from "@/components/section-decor"
import { stageIcons } from "@/components/journey-icons"
import { brand, threeStages } from "@/lib/site"

/**
 * 尋路計畫宏觀旅程窄帶：一條由左至右的路（認識自己→勇敢實踐→成為未來）。
 * 外層只留階段名稱與一句副標，細節以點擊彈窗承接（會議肯定的「點開再看」模式）。
 * 與「能力螺旋」是不同層級：這裡是宏觀旅程，螺旋是專案內的能力循環。
 * variant="path"（版本 B）：階段徽章與導言套 waypoint 路途語彙。
 * variant="flow"（版本 A 連續敘事版）：深林綠滿版（路徑開進隧道），上下曲線過渡。
 */
export function ProgramStrip({ variant }: { variant?: "path" | "flow" } = {}) {
  const flow = variant === "flow"
  return (
    <section
      className={
        flow
          ? "relative bg-path-orange py-24 md:py-28"
          : variant === "path"
            ? "relative bg-secondary/40 py-16 md:py-24"
            : "border-y border-border bg-secondary/40 py-16 md:py-24"
      }
    >
      {/* flow：上下白底以曲線咬入橘帶 */}
      {flow && <FlowCap position="top" className="text-background" />}
      {variant === "path" && <ContourBg />}
      <Container>
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p
            className={`mb-3 text-sm font-semibold uppercase tracking-wide ${flow ? "text-white/85" : "text-primary"}`}
          >
            {brand.programName} {brand.programNameEn}
          </p>
          <h2
            className={`text-balance text-3xl font-black tracking-tight sm:text-4xl ${flow ? "text-white" : "text-foreground"}`}
          >
            {variant === "path" ? (
              <>
                <span className="hl-sun">一條路</span>，三個階段
              </>
            ) : (
              "一條路，三個階段"
            )}
          </h2>
          <p
            className={`mt-4 text-pretty text-lg leading-relaxed ${flow ? "text-white/90" : "text-muted-foreground"}`}
          >
            {variant === "path"
              ? "從認識自己啟程，在真實世界紮營實踐，抵達屬於自己的未來——每一次抵達，都是新的啟程。"
              : "合作形式會變，核心不變：從認識自己出發，在真實專案中實踐，走向自己的未來。"}
          </p>
        </ScrollReveal>

        <ol className="mt-12 flex flex-col items-stretch gap-4 md:flex-row md:items-center">
          {threeStages.map((s, i) => {
            const WaypointIcon = stageIcons[s.slug]
            return (
            <ScrollReveal
              key={s.slug}
              delay={i * 120}
              as="li"
              className="flex flex-1 items-center gap-4 md:gap-0"
            >
              <Dialog>
                <div
                  className={`group relative flex w-full flex-col items-start gap-1 rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 md:items-center md:text-center ${variant === "path" ? "glow-neon" : flow ? "hover:shadow-xl" : "hover:shadow-lg"}`}
                >
                  <span className={`${stageBadgeClass(s.color)} inline-flex items-center gap-1`}>
                    {variant === "path" && WaypointIcon && (
                      <WaypointIcon className="size-3.5" aria-hidden="true" />
                    )}
                    {variant === "path" ? `${s.waypoint}・${s.phase}` : s.phase}
                  </span>
                  <h3 className="mt-2 text-2xl font-black text-foreground">{s.title}</h3>
                  <DialogTrigger
                    aria-label={`展開${s.phase}：${s.title}`}
                    className="cursor-pointer text-sm font-medium text-muted-foreground outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
                  >
                    {s.subtitle}
                  </DialogTrigger>
                </div>
                <StageDialogContent stage={s} />
              </Dialog>

              {i < threeStages.length - 1 && (
                <ChevronRight
                  aria-hidden="true"
                  className={`mx-1 hidden size-7 shrink-0 md:block ${flow ? "text-white" : "text-primary"}`}
                />
              )}
            </ScrollReveal>
            )
          })}
        </ol>
      </Container>
      {flow && <FlowCap position="bottom" className="text-background" />}
    </section>
  )
}
