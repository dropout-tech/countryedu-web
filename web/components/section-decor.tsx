import { cn } from "@/lib/utils"

/**
 * 區塊之間的靜態裝飾（無動畫、無互動、無 JS）。
 *
 * WaveSeam：兩個背景色不同的區塊之間的「自然波浪接縫」。
 * 條帶本身鋪下方區塊的底色，內部的波浪形 path 鋪上方區塊的底色——
 * 直線切邊因此變成一道緩波。顏色用 Tailwind 靜態 class 以精準對齊
 * 相鄰區塊（home 區塊＝secondary/40、page-shell Section muted＝secondary/50）。
 */
const SHAPES = {
  a: "M0 0 H1440 V18 Q1110 56 660 30 Q320 8 0 26 Z",
  b: "M0 0 H1440 V28 Q1160 2 740 30 Q340 56 0 18 Z",
} as const

export function WaveSeam({
  top,
  muted = 40,
  shape = "a",
  flip = false,
  className,
}: {
  /** 上方區塊的底色：white＝上白下綠、muted＝上綠下白 */
  top: "white" | "muted"
  /** muted 的透明度檔位：40（首頁區塊）或 50（page-shell Section muted） */
  muted?: 40 | 50
  shape?: keyof typeof SHAPES
  flip?: boolean
  className?: string
}) {
  const mutedBg = muted === 50 ? "bg-secondary/50" : "bg-secondary/40"
  const mutedFill = muted === 50 ? "fill-secondary/50" : "fill-secondary/40"
  return (
    <div
      aria-hidden="true"
      className={cn("relative h-10 w-full md:h-14", top === "white" && mutedBg, className)}
    >
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className={cn("absolute inset-0 h-full w-full", flip && "-scale-x-100")}
      >
        <path d={SHAPES[shape]} className={top === "white" ? "fill-background" : mutedFill} />
      </svg>
    </div>
  )
}

/* 註：IconField（路途圖樣壓背景）已依使用者回饋移除，需要時可從 git 1b251ed 取回。 */

/**
 * ContourBg：淡淡的等高線底紋（地圖語境）。
 * 鋪在 muted 區塊背景，極低對比、純裝飾；外層 section 需 relative。
 */
export function ContourBg({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className={cn("pointer-events-none absolute inset-0 h-full w-full text-primary/[0.12]", className)}
    >
      <g stroke="currentColor" strokeWidth="2">
        {/* 左下等高線丘 */}
        <path d="M40 470 C40 396 122 348 226 358 C348 370 414 438 394 508 C374 578 250 612 148 580 C76 556 40 526 40 470 Z" />
        <path d="M96 470 C96 416 156 380 232 388 C322 397 370 446 356 497 C342 548 252 572 178 549 C124 532 96 510 96 470 Z" />
        <path d="M150 468 C150 434 188 412 236 417 C292 423 322 454 313 486 C304 518 248 532 202 518 C168 507 150 494 150 468 Z" />
        {/* 右上等高線丘 */}
        <path d="M828 36 C880 -18 992 -22 1078 22 C1170 70 1198 158 1142 216 C1086 274 952 274 866 222 C788 174 778 88 828 36 Z" />
        <path d="M884 64 C920 26 998 24 1058 54 C1122 88 1142 148 1104 188 C1064 228 972 228 912 192 C858 158 850 100 884 64 Z" />
        <path d="M938 94 C960 70 1008 70 1044 88 C1084 108 1096 144 1072 168 C1048 194 992 192 956 170 C922 150 916 116 938 94 Z" />
        {/* 中段開放等高線 */}
        <path d="M-40 250 C160 210 330 290 540 262 C740 236 900 300 1080 280 C1140 273 1200 260 1260 250" />
        <path d="M-40 320 C180 290 350 352 560 330 C760 310 920 360 1100 344 C1150 339 1210 330 1260 322" />
      </g>
    </svg>
  )
}
