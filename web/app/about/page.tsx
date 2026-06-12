import { redirect } from "next/navigation"

/**
 * 關於我們採四子頁結構（2026-06-12 決議）：mission／story／team／approach，不設 hub。
 * /about 保留路由（導覽列、Footer 與麵包屑仍連向此處），導向第一子頁「使命與願景」。
 */
export default function Page() {
  redirect("/about/mission")
}
