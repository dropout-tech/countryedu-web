import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Compass, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConvergingJourney, NetworkWeave } from "./banner-graphics"
import { heroStats } from "@/lib/site"

/**
 * variant 預設＝版本 A 舊版（白底匯聚旅程）；
 * "flow"＝版本 A（連續敘事版）：米白暖底＋全彩路徑線＋底部曲線過渡；
 * "path"＝版本 B（敘事版）：無箭頭的交錯路網，呼應「尋路」路途語彙。
 * "card"＝版本 C（卡片版）：用版本 B 的滿幅路網、透明度提回 100%，
 *   左側標題／描述／影響力數據改成卡片——卡片本身提供不透明襯底，
 *   故路網可滿彩不需淡化（2026-06-12 使用者指定）。
 *   底色不用純白，改極淺米白 #fbf8f1（自 v4 陶土米／麥田米暖米族大幅提亮；2026-06-12 使用者指定）。
 */
export function HeroBanner({ variant }: { variant?: "path" | "flow" | "card" }) {
  const Journey = variant === "path" || variant === "card" ? NetworkWeave : ConvergingJourney
  const card = variant === "card"
  const flow = variant === "flow"
  return (
    <section
      aria-label="鄉育教育基金會主視覺"
      className={`relative isolate w-full overflow-hidden ${card ? "bg-[#fbf8f1]" : "bg-background"}`}
    >
      {/* 創意背景：全幅路徑圖，統一低透明度當背景紋理——
         無漸層、無光暈，深色標題直接壓在淡化的路網上仍可讀（2026-06-12 使用者指定）。
         劑量靠這一個 opacity 類別調整。card＝版本 C：文字改卡片有不透明襯底，故路網滿彩 100%。 */}
      <Journey
        preserveAspectRatio="xMidYMid slice"
        strokeWidth={18}
        className={`pointer-events-none absolute inset-0 -z-10 h-full w-full ${card ? "opacity-100" : variant ? "opacity-20" : "opacity-50"}`}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:px-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:py-28">
        {/* 左：文字 */}
        <div className="flex flex-col items-start text-left">
          {/* path／card：基金會徽章移除（2026-06-11 使用者指定），標題直接開場 */}
          {variant !== "path" && !card && (
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Compass className="size-4" aria-hidden="true" />
              <span>財團法人鄉育教育基金會 CountryEDU</span>
            </div>
          )}

          {/* card＝版本 C：標題＋描述＋按鈕包進一張卡片，於滿彩路網上提供不透明襯底。
             非 card 用 display:contents，版本 A／B 版面完全不受影響。 */}
          <div className={card ? "w-full rounded-3xl border border-border bg-card p-7 sm:p-8" : "contents"}>
          <h1
            className={`text-4xl font-black leading-[1.2] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem] ${variant === "path" || card ? "mt-0" : "mt-7"}`}
          >
            陪青年
            <span className="whitespace-nowrap">
            銜接
            <span className="relative whitespace-nowrap text-primary">
              真實世界
              <svg
                aria-hidden="true"
                viewBox="0 0 300 16"
                preserveAspectRatio="none"
                className={`absolute -bottom-2 left-0 h-3 w-full ${variant === "path" ? "text-sun-gold" : "text-accent"}`}
              >
                <path
                  d="M4 11 C 80 4, 220 4, 296 9"
                  stroke="currentColor"
                  strokeWidth={5}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
            ，
            </span>
            <br />
            縮短學校與職場的落差
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            學校到職場之間，存在一段明顯的斷裂。鄉育用真實專案的學習設計，讓大學生在校期間就練習定義問題、整合資源、與人協作——把迷惘，轉化為選擇的力量。
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" className="group h-12 px-7 text-base" render={<Link href="/about/mission" />}>
              認識鄉育
              <ArrowRight
                className="ml-1 size-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 border-primary/40 px-7 text-base text-foreground hover:bg-secondary"
              render={<Link href="/programs" />}
            >
              探索尋路計畫
            </Button>
          </div>
          </div>

          {/* 影響力數據（card＝版本 C：每項數據獨立成卡片） */}
          <dl className="mt-10 grid grid-cols-3 gap-6 sm:gap-10">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className={`flex flex-col gap-0.5 ${card ? "rounded-2xl border border-border bg-card px-4 py-3" : ""}`}
              >
                <dt className="text-2xl font-black text-primary sm:text-3xl">
                  {stat.value}
                  {variant === "path" && (
                    <span aria-hidden="true" className="mt-1 block h-1.5 w-10 rounded-full bg-neon-leaf" />
                  )}
                </dt>
                <dd className="text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 右：橫式照片 —— 匯聚旅程的終點 */}
        <div className="relative">
          <div
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border-4 border-card bg-card ring-1 ring-border sm:aspect-[16/11]"
          >
            <Image
              src="/banner/students.jpg"
              alt="鄉育教育基金會陪伴的青年學子在校園中合影"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 640px"
              className="object-cover object-center"
            />

            {/* 明亮資訊標籤 */}
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-card/90 px-4 py-2 backdrop-blur-sm sm:left-5 sm:top-5">
              <Sparkles
                className={`size-4 ${variant === "path" ? "text-sun-gold" : "text-accent"}`}
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-foreground">
                你的藍圖，從這裡開始
              </span>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
