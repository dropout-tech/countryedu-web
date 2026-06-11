import type { Metadata } from "next"
import { StubPage } from "@/components/page-shell"
import { pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
  title: "計畫總覽",
  description: "三階段培訓架構，帶領學生從「認識自己」到「驗證自己」。",
  path: "/programs",
})

export default function Page() {
  return (
    <StubPage
      href={"/programs"}
      eyebrow={"計畫"}
      title={"計畫總覽"}
      lead={"三階段培訓架構，帶領學生從「認識自己」到「驗證自己」。"}
      outline={["三階段架構關係圖","16 週學習旅程","三階段詳述子頁","報名、大學合作與企業專班"]}
    />
  )
}
