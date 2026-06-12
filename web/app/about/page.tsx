import type { Metadata } from "next"
import { AboutForward } from "./forward"

export const metadata: Metadata = {
  title: "關於我們",
  robots: { index: false, follow: true },
}

/**
 * 關於我們採四子頁結構（2026-06-12 決議）：mission／story／team／approach，不設 hub。
 * /about 保留路由（導覽列、Footer 與麵包屑仍連向此處），導向第一子頁「使命與願景」。
 * 靜態匯出（output: export）下伺服器 redirect() 會輸出空白錯誤殼，故改用客戶端導向。
 */
export default function Page() {
  return <AboutForward />
}
