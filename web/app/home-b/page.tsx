import type { Metadata } from "next"
import { HeroBanner } from "@/components/home/hero-banner"
import { WhyNow } from "@/components/home/why-now"
import { SpiralAbilities } from "@/components/home/spiral-abilities"
import { ProgramStrip } from "@/components/home/program-strip"
import { Stories } from "@/components/home/stories"
import { ImpactStrip } from "@/components/home/impact"
import { AudienceEntries } from "@/components/home/audience-entries"
import { HomeCta } from "@/components/home/cta"
import { VersionSwitch } from "@/components/home/version-switch"
import { WaveSeam } from "@/components/section-decor"
import { ThemeClass } from "@/components/theme-class"
import { pageMeta } from "@/lib/seo"

/**
 * 首頁版本 B（敘事版・甲方審閱用）——「尋路」路途語彙＋區塊間靜態波浪過渡。
 * 區塊結構與版本 A（/）相同，差異在語彙與圖標（variant="path"）、
 * WaveSeam 自然波浪接縫（無動畫無互動）與 muted 區的等高線底紋。
 * 不進 nav／sitemap，且 noindex；版本定案後：勝出內容搬至 /，本路由刪除。
 */
export const metadata: Metadata = {
  ...pageMeta({
    title: "首頁版本 B（敘事版・審閱用）",
    description: "尋路計畫敘事版首頁——學生是找路的主角，鄉育是嚮導。",
    path: "/home-b",
  }),
  robots: { index: false, follow: false },
}

export default function HomeBPage() {
  return (
    <>
      {/* 版本 B 試穿色票 v4「向陽而生」（.theme-v4，含 Header/Footer 一起換色） */}
      <ThemeClass name="theme-v4" />
      <HeroBanner variant="path" />
      <WaveSeam top="white" />
      <WhyNow variant="path" />
      <WaveSeam top="muted" shape="b" />
      <SpiralAbilities variant="path" />
      <WaveSeam top="white" shape="b" flip />
      <ProgramStrip variant="path" />
      <WaveSeam top="muted" flip />
      <Stories variant="path" />
      <ImpactStrip />
      <WaveSeam top="white" shape="b" />
      <AudienceEntries variant="path" />
      <WaveSeam top="muted" shape="a" flip />
      <HomeCta />
      <VersionSwitch current="b" />
    </>
  )
}
