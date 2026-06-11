import type { Metadata } from "next"
import { StubPage } from "@/components/page-shell"
import { pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
  title: "企業合作",
  description: "與鄉育同行——四種企業合作方案、Sales Kit 下載與合作洽詢入口。",
  path: "/involve/corporate",
})

export default function Page() {
  return (
    <StubPage
      href={"/involve/corporate"}
      eyebrow={"參與我們"}
      title={"企業合作"}
      lead={"與鄉育同行——四種企業合作方案、Sales Kit 下載與合作洽詢入口。"}
      outline={["四種企業合作方案（10／30／60／100 萬）","ESG 影響力與人才媒合","Sales Kit 下載","合作洽詢"]}
    />
  )
}
