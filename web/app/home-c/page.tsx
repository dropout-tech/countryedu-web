import type { Metadata } from "next"
import { HeroBanner } from "@/components/home/hero-banner"
import { VersionSwitch } from "@/components/home/version-switch"
import { ThemeClass } from "@/components/theme-class"
import { pageMeta } from "@/lib/seo"

/**
 * 首頁版本 C（卡片版・甲方審閱用）——只放 banner（不接其他區塊）。
 * 沿用版本 B 的滿幅路網（variant="card"，透明度提回 100%），
 * 左側標題／描述／影響力數據改成卡片，於滿彩路網上提供不透明襯底。
 * 與版本 B 同套色票 v4「向陽而生」。
 * 不進 nav／sitemap，且 noindex；版本定案後：勝出內容搬至 /，本路由刪除。
 */
export const metadata: Metadata = {
  ...pageMeta({
    title: "首頁版本 C（卡片版・審閱用）",
    description: "卡片版 banner——滿幅路網＋左側標題與數據卡片化。",
    path: "/home-c",
  }),
  robots: { index: false, follow: false },
}

export default function HomeCPage() {
  return (
    <>
      {/* 版本 C 沿用版本 B 試穿色票 v4「向陽而生」（.theme-v4，含 Header/Footer 一起換色） */}
      <ThemeClass name="theme-v4" />
      <HeroBanner variant="card" />
      <VersionSwitch current="c" />
    </>
  )
}
