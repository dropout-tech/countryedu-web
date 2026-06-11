import type { Metadata } from "next"
import { StubPage } from "@/components/page-shell"
import { pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
  title: "我是學生",
  description: "你的路不用一個人找——從認識自己啟程，把迷惘走成方向。",
  path: "/for/students",
})

export default function Page() {
  return (
    <StubPage
      href={"/for/students"}
      eyebrow={"為你而來"}
      title={"我是學生"}
      lead={"你的路不用一個人找——從認識自己啟程，把迷惘走成方向。"}
      outline={["為什麼是你","三階段探索旅程","學生故事","立即報名 CTA"]}
    />
  )
}
