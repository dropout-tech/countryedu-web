"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Compass } from "lucide-react"
import { Container } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { journeyVocab, spiralPhases } from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * 能力螺旋區塊：四象限＋由內向外的螺旋（甲方示意圖的網頁版）。
 * 象限標籤為漂浮卡，點擊後與右側能力清單雙向連動 highlight。
 * 四階段標籤為暫時詞，正式命名由 lib/site.ts 的 spiralPhases 一處替換。
 */

const CX = 210
const CY = 210
const R = 178
const GAP = 7
const DRAW_MS = 2400
const DRAW_DELAY_MS = 200

/** 阿基米德螺旋（順時針、由內向外）＋終點切線角度（給箭頭用） */
function buildSpiral() {
  const turns = 2.6
  const steps = 240
  const maxTheta = turns * Math.PI * 2
  const b = 42 / (Math.PI * 2) // 每圈外擴 42px
  const pts: [number, number][] = []
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * maxTheta
    const r = 6 + b * t
    // -t → 順時針；起始角朝上
    pts.push([CX + r * Math.sin(t), CY - r * Math.cos(t)])
  }
  const [px, py] = pts[pts.length - 2]
  const [ex, ey] = pts[pts.length - 1]
  const angle = (Math.atan2(ey - py, ex - px) * 180) / Math.PI
  return {
    d: `M ${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ")}`,
    end: { x: ex, y: ey, angle },
  }
}

/** 四分之一圓 wedge，往對角線方向外推 GAP 形成十字留白 */
function wedgePath(quadrant: 0 | 1 | 2 | 3) {
  // 0=NW 1=NE 2=SE 3=SW（順時針，對應 spiralPhases 順序）
  const sx = quadrant === 1 || quadrant === 2 ? 1 : -1
  const sy = quadrant === 2 || quadrant === 3 ? 1 : -1
  const cx = CX + sx * GAP
  const cy = CY + sy * GAP
  const vx = cx
  const vy = cy + sy * R
  const hx = cx + sx * R
  const hy = cy
  const sweep = sx * sy < 0 ? 1 : 0
  return `M ${cx} ${cy} L ${vx} ${vy} A ${R} ${R} 0 0 ${sweep} ${hx} ${hy} Z`
}

/** 漂浮卡位置（相對 SVG 容器的百分比，對應四個象限中心） */
const CHIP_POS: Record<number, { left: string; top: string }> = {
  0: { left: "26%", top: "26%" },
  1: { left: "74%", top: "26%" },
  2: { left: "74%", top: "74%" },
  3: { left: "26%", top: "74%" },
}

export function SpiralAbilities({ variant }: { variant?: "path" | "flow" } = {}) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [drawn, setDrawn] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const { d, end } = buildSpiral()
  const toggle = (key: string) => setActive((prev) => (prev === key ? null : key))

  return (
    <section
      ref={sectionRef}
      className={variant === "flow" ? "relative bg-background py-16 md:py-24" : "py-16 md:py-24"}
    >
      <Container>
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
            {variant === "path" ? (
              <span className="inline-flex items-center gap-1.5">
                <Compass className="size-4" aria-hidden="true" />
                {journeyVocab.walk}・路上的羅盤
              </span>
            ) : (
              "能力系統"
            )}
          </p>
          <h2 className="text-balance text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            {variant === "flow" ? (
              <>
                <span className="text-primary">四種能力</span>，螺旋式長出來
              </>
            ) : variant === "path" ? (
              <>
                四種能力，<span className="hl-leaf">螺旋式長出來</span>
              </>
            ) : (
              "四種能力，螺旋式長出來"
            )}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            沒有先後，沒有高低。在每一次真實專案裡，四種能力被反覆使用、一圈一圈加深。
          </p>
        </ScrollReveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* 左：四象限＋螺旋＋漂浮卡 */}
          <ScrollReveal className="relative mx-auto w-full max-w-[34rem]">
            <svg
              viewBox="0 0 420 420"
              role="img"
              aria-label="四種核心能力的螺旋成長圖：發現問題、定義問題、驗證問題、設計方案，在專案中循環深化"
              className="h-auto w-full"
            >
              {spiralPhases.map((p, i) => (
                <path
                  key={p.key}
                  d={wedgePath(i as 0 | 1 | 2 | 3)}
                  fill={p.hue}
                  opacity={active === null ? 0.92 : active === p.key ? 1 : 0.35}
                  className="transition-opacity duration-300"
                />
              ))}

              <path
                d={d}
                fill="none"
                stroke="var(--foreground)"
                strokeWidth={8}
                strokeLinecap="round"
                pathLength={1}
                className="motion-draw"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: drawn ? 0 : 1,
                  transition: `stroke-dashoffset ${DRAW_MS}ms ease-in-out ${DRAW_DELAY_MS}ms`,
                }}
              />
              {/* 箭頭與線條相接，待線畫完才現身（避免動畫途中箭頭落單） */}
              <path
                d="M -4 -9 L 18 0 L -4 9 Z"
                fill="var(--foreground)"
                transform={`translate(${end.x} ${end.y}) rotate(${end.angle})`}
                className="motion-node"
                style={{
                  opacity: drawn ? 1 : 0,
                  transition: `opacity 300ms ease ${DRAW_MS + DRAW_DELAY_MS - 150}ms`,
                }}
              />
            </svg>

            {/* 漂浮標籤卡：點擊與右側清單連動 */}
            {spiralPhases.map((p, i) => (
              <button
                key={p.key}
                type="button"
                aria-pressed={active === p.key}
                onClick={() => toggle(p.key)}
                className={cn(
                  "absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center rounded-2xl border bg-card/95 px-3 py-2 text-center shadow-md backdrop-blur-sm transition-all hover:-translate-y-[calc(50%+3px)] hover:shadow-lg sm:px-4 sm:py-2.5",
                  active === p.key ? "border-transparent shadow-lg" : "border-border",
                  variant === "path" && active !== p.key && "glow-neon",
                )}
                style={{
                  left: CHIP_POS[i].left,
                  top: CHIP_POS[i].top,
                  boxShadow: active === p.key ? `0 0 0 3px ${p.hue}, 0 10px 24px -8px ${p.hue}99` : undefined,
                }}
              >
                <span className="text-sm font-bold text-foreground sm:text-base">{p.title}</span>
                <span className="text-[11px] font-medium text-muted-foreground sm:text-xs">{p.label}</span>
              </button>
            ))}
          </ScrollReveal>

          {/* 右：四階段一句話說明（與漂浮卡連動 highlight；細節在子頁） */}
          <div className="flex flex-col gap-2">
            {spiralPhases.map((p, i) => (
              <ScrollReveal key={p.key} delay={i * 110}>
                <button
                  type="button"
                  aria-pressed={active === p.key}
                  onClick={() => toggle(p.key)}
                  className={cn(
                    "flex w-full cursor-pointer items-start gap-4 rounded-2xl px-4 py-3 text-left transition-all",
                    active === p.key ? "shadow-sm" : "hover:bg-secondary/50",
                  )}
                  style={{
                    backgroundColor: active === p.key ? `${p.hue}1f` : undefined,
                    boxShadow: active === p.key ? `inset 0 0 0 2px ${p.hue}` : undefined,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-3.5 shrink-0 rounded-full transition-transform"
                    style={{ backgroundColor: p.hue, transform: active === p.key ? "scale(1.35)" : undefined }}
                  />
                  <span>
                    <span className="font-bold text-foreground">
                      {p.title}
                      <span className="ml-2 text-sm font-medium text-muted-foreground">{p.label}</span>
                    </span>
                    <span className="mt-1 block text-pretty text-sm leading-relaxed text-muted-foreground">
                      {p.text}
                    </span>
                  </span>
                </button>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={460}>
              <Button variant="outline" className="ml-4 mt-3 h-11 w-fit" render={<Link href="/programs/journey" />}>
                看 16 週課程如何運作
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
