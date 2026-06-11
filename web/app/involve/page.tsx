import type { Metadata } from "next"
import { StubPage } from "@/components/page-shell"
import { pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
  title: "參與我們",
  description: "每個人都有陪青年走一段的方式——捐款、合作或加入我們，都是同行。",
  path: "/involve",
})

export default function Page() {
  return (
    <StubPage
      href={"/involve"}
      eyebrow={"參與我們"}
      title={"參與我們"}
      lead={"每個人都有陪青年走一段的方式——捐款、合作或加入我們，都是同行。"}
      outline={["捐款支持","企業合作","學校合作","徵才與志工"]}
    />
  )
}
