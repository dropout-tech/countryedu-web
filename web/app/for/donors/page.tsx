import type { Metadata } from "next"
import { StubPage } from "@/components/page-shell"
import { pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
  title: "我是捐款人",
  description: "你的支持，會變成一個青年路上的裝備與底氣。",
  path: "/for/donors",
})

export default function Page() {
  return (
    <StubPage
      href={"/for/donors"}
      eyebrow={"為你而來"}
      title={"我是捐款人"}
      lead={"你的支持，會變成一個青年路上的裝備與底氣。"}
      outline={["你的支持如何運作","捐款影響力","捐款者權益","立即捐款 CTA"]}
    />
  )
}
