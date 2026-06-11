import type { Metadata } from "next"
import { StubPage } from "@/components/page-shell"
import { pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
  title: "我是學校",
  description: "把尋路計畫帶進校園，陪學生把選擇變成能力。",
  path: "/for/universities",
})

export default function Page() {
  return (
    <StubPage
      href={"/for/universities"}
      eyebrow={"為你而來"}
      title={"我是學校"}
      lead={"把尋路計畫帶進校園，陪學生把選擇變成能力。"}
      outline={["學校為什麼合作","課程與工作坊","引導員培訓","合作洽詢 CTA"]}
    />
  )
}
