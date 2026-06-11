import type { Metadata } from "next"
import { StubPage } from "@/components/page-shell"
import { pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
  title: "我是企業",
  description: "成為青年路上的同行者——連結未來人才，放大你的 ESG 影響力。",
  path: "/for/companies",
})

export default function Page() {
  return (
    <StubPage
      href={"/for/companies"}
      eyebrow={"為你而來"}
      title={"我是企業"}
      lead={"成為青年路上的同行者——連結未來人才，放大你的 ESG 影響力。"}
      outline={["企業為什麼參與","合作方案總覽","人才媒合與導師制度","聯絡洽詢 CTA"]}
    />
  )
}
