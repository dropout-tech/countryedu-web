import type { Metadata } from "next"
import { StubPage } from "@/components/page-shell"
import { pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
  title: "捐款支持",
  description: "一筆小額捐款，就是替一個青年點亮路上的一盞燈；本會已完成勸募字號申請。",
  path: "/involve/donate",
})

export default function Page() {
  return (
    <StubPage
      href={"/involve/donate"}
      eyebrow={"參與我們"}
      title={"捐款支持"}
      lead={"一筆小額捐款，就是替一個青年點亮路上的一盞燈；本會已完成勸募字號申請。"}
      outline={["捐款方式","NTC 第三方金流導流","捐款者權益說明","定期定額與單筆捐款"]}
    />
  )
}
