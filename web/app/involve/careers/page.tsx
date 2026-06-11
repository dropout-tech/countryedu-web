import type { Metadata } from "next"
import { StubPage } from "@/components/page-shell"
import { pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
  title: "徵才與志工",
  description: "成為帶路的人——加入鄉育團隊，或以志工身分陪青年走一段。",
  path: "/involve/careers",
})

export default function Page() {
  return (
    <StubPage
      href={"/involve/careers"}
      eyebrow={"參與我們"}
      title={"徵才與志工"}
      lead={"成為帶路的人——加入鄉育團隊，或以志工身分陪青年走一段。"}
      outline={["徵才資訊","實習機會","志工招募","應徵方式"]}
    />
  )
}
