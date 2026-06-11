import { cn } from "@/lib/utils"

/**
 * 版本 A（連續敘事版）專屬裝飾。
 *
 * FlowCap：區塊間的曲線過渡——用「上／下一段的底色」以波浪咬進本段，
 * 取代直線切邊，消除『一張張投影片』的硬切感（顏色由 className text-* 指定）。
 *
 * 註：原 PathwaySpine（綠×橘貫穿雙線）已依 2026-06-11 決議移除
 * （區塊間只留靜態波浪、不做貫穿線與動畫），需要時可從 git 29958aa 取回。
 */
/**
 * Mark：標題關鍵字色框——鮮豔色不鋪滿版，改當「螢光筆色塊」打在標題關鍵字上。
 * 淡色底＋鮮豔標題框＝v3.1 鮮豔策略（背景乾淨、彩度集中在字）。
 * 白字 on 亮綠 3.3:1／on 橘 2.5:1，僅限大標使用，不得用於正文。
 */
export function Mark({
  tone = "green",
  children,
}: {
  tone?: "green" | "orange"
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        "inline-block -rotate-1 rounded-xl px-3 py-0.5 text-white",
        tone === "green" ? "bg-primary" : "bg-path-orange",
      )}
    >
      {children}
    </span>
  )
}

/* 註：PathCorner（路徑角飾）已依 2026-06-11 決議移除（角落不放裝飾線），需要時可從 git 歷史取回。 */

export function FlowCap({
  position,
  className,
}: {
  position: "top" | "bottom"
  className?: string
}) {
  const d =
    position === "top"
      ? "M0 0 H1440 V16 Q1110 52 660 28 Q330 12 0 24 Z"
      : "M0 48 H1440 V30 Q1080 -2 620 20 Q300 36 0 22 Z"
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-x-0 z-10 h-8 w-full md:h-12",
        position === "top" ? "top-0" : "bottom-0",
        className,
      )}
    >
      <path fill="currentColor" d={d} />
    </svg>
  )
}
