import type { Metadata } from "next"
import { StubPage } from "@/components/page-shell"
import { pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
  title: "學校合作",
  description: "把尋路計畫帶進校園——與學校共創課程、工作坊與引導員培訓。",
  path: "/involve/university",
})

export default function Page() {
  return (
    <StubPage
      href={"/involve/university"}
      eyebrow={"參與我們"}
      title={"學校合作"}
      lead={"把尋路計畫帶進校園——與學校共創課程、工作坊與引導員培訓。"}
      outline={["學校合作提案入口","課程與工作坊","引導員培訓","合作流程"]}
    />
  )
}
