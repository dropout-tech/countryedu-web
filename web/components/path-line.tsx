"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * 路徑母題：可複用的「捲動繪製路徑線」，全站「尋路」敘事的視覺串接。
 *
 * 繪製技法沿用 spiral-abilities：pathLength={1} + strokeDasharray 1，
 * 免 getTotalLength、零量測。reduced-motion 由 globals.css 的
 * .motion-draw／.motion-node 規則接管（靜態完整顯示）。
 * 純裝飾，整個 svg 固定 aria-hidden。
 */

const PRESETS = {
  /** 緩升：由左下走向右上（區塊邁向高潮前） */
  rise: {
    d: ["M 0 132 C 200 124 340 64 520 78 C 700 92 880 36 1200 30"],
    end: { x: 1200, y: 30, angle: -4 },
  },
  /** 蜿蜒：S 形小徑（一般區塊銜接） */
  wind: {
    d: ["M 0 84 C 140 24 280 140 440 84 C 600 28 740 132 900 84 C 1020 48 1110 96 1200 72"],
    end: { x: 1200, y: 72, angle: -10 },
  },
  /** 岔路：主路之外分出一條新路（分眾／選擇語境） */
  fork: {
    d: ["M 0 100 C 220 92 420 70 620 78 C 820 86 1000 60 1200 64", "M 620 78 C 760 64 900 28 1060 20"],
    end: { x: 1200, y: 64, angle: 1 },
  },
  /** 緩降：收束沉澱（接向結尾或 muted 區塊） */
  descend: {
    d: ["M 0 36 C 200 44 360 96 560 88 C 760 80 940 128 1200 122"],
    end: { x: 1200, y: 122, angle: 4 },
  },
} as const

type PathLineProps = {
  /** 自訂 path（單條或多條）；未提供時用 preset */
  d?: string | string[]
  preset?: keyof typeof PRESETS
  viewBox?: string
  /** draw＝進視窗一次畫完（預設）；scrub＝隨捲動進度推進 */
  mode?: "draw" | "scrub"
  stroke?: string
  strokeWidth?: number
  duration?: number
  delay?: number
  /** 路上的節點座標（線畫完後淡入；以圓點呈現） */
  nodes?: readonly (readonly [number, number])[]
  /** 終點箭頭（僅 preset 有端點資料；自訂 d 時無效） */
  arrow?: boolean
  className?: string
}

export function PathLine({
  d,
  preset = "wind",
  viewBox = "0 0 1200 160",
  mode = "draw",
  stroke = "currentColor",
  strokeWidth = 4,
  duration = 1800,
  delay = 0,
  nodes,
  arrow = false,
  className,
}: PathLineProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const pathRefs = useRef<(SVGPathElement | null)[]>([])
  const [drawn, setDrawn] = useState(false)

  const presetData = PRESETS[preset]
  const ds = d ? (Array.isArray(d) ? d : [d]) : presetData.d
  const end = !d && arrow ? presetData.end : null

  // draw：進視窗一次性觸發後即斷開 observer
  useEffect(() => {
    if (mode !== "draw") return
    const el = svgRef.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setDrawn(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [mode])

  // scrub：僅在可視範圍附近掛 passive scroll listener，rAF 內直寫 style，不經 setState
  useEffect(() => {
    if (mode !== "scrub") return
    const el = svgRef.current
    if (!el) return
    const setOffset = (v: number) => {
      for (const p of pathRefs.current) if (p) p.style.strokeDashoffset = String(v)
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOffset(0)
      return
    }
    // scroll 事件本身已由瀏覽器以幀率節流，直接更新（rAF 在背景分頁會停擺，不可依賴）
    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.6 + rect.height)))
      setOffset(1 - progress)
    }
    let listening = false
    const listen = (on: boolean) => {
      if (on === listening) return
      listening = on
      if (on) {
        window.addEventListener("scroll", update, { passive: true })
        update()
      } else {
        window.removeEventListener("scroll", update)
      }
    }
    if (typeof IntersectionObserver === "undefined") {
      listen(true)
      return () => listen(false)
    }
    const observer = new IntersectionObserver((entries) => listen(entries.some((e) => e.isIntersecting)), {
      rootMargin: "20% 0px",
    })
    observer.observe(el)
    update()
    return () => {
      observer.disconnect()
      listen(false)
    }
  }, [mode])

  const revealed = mode === "scrub" || drawn

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
      fill="none"
      className={cn("block", className)}
    >
      {ds.map((pathD, i) => (
        <path
          key={i}
          ref={(node) => {
            pathRefs.current[i] = node
          }}
          d={pathD}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          className="motion-draw"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: mode === "draw" ? (drawn ? 0 : 1) : 1,
            transition:
              mode === "draw" ? `stroke-dashoffset ${duration}ms ease-in-out ${delay + i * 220}ms` : undefined,
          }}
        />
      ))}
      {/* 節點以零長度 path＋round cap 呈現：preserveAspectRatio="none" 下仍是正圓 */}
      {nodes?.map(([x, y], i) => (
        <path
          key={`node-${i}`}
          d={`M ${x} ${y} l 0.01 0`}
          stroke="var(--color-accent)"
          strokeWidth={strokeWidth * 2.4}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="motion-node"
          style={{
            opacity: revealed ? 1 : 0,
            transition: `opacity 320ms ease ${delay + duration - 240 + i * 140}ms`,
          }}
        />
      ))}
      {end ? (
        <path
          d="M -4 -8 L 16 0 L -4 8 Z"
          fill={stroke}
          transform={`translate(${end.x} ${end.y}) rotate(${end.angle})`}
          className="motion-node"
          style={{
            opacity: revealed ? 1 : 0,
            transition: `opacity 300ms ease ${delay + duration - 150}ms`,
          }}
        />
      ) : null}
    </svg>
  )
}

/**
 * 區塊之間的路徑分隔線——一行嵌入，負邊距疊進相鄰 Section 的垂直留白。
 * 顏色由 currentColor 控制（外層 text-* class）。
 * 注意：與 muted 背景相鄰時請目視確認接縫，必要時改放進 Section 內部首行。
 */
export function PathConnector({
  preset = "wind",
  flip = false,
  className,
}: {
  preset?: keyof typeof PRESETS
  flip?: boolean
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none relative z-10 -my-8 overflow-hidden md:-my-12", className)}
    >
      <PathLine
        preset={preset}
        strokeWidth={3.5}
        className={cn("h-16 w-full text-primary/40 md:h-24", flip && "-scale-x-100")}
      />
    </div>
  )
}
