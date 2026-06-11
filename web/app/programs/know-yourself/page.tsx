import type { Metadata } from "next"
import { StageDetail } from "@/components/programs/stage-detail"
import { pageMeta } from "@/lib/seo"
import { threeStages } from "@/lib/site"

const stage = threeStages[0]

export const metadata: Metadata = pageMeta({
  title: `${stage.title}｜${stage.subtitle}`,
  description: stage.summary,
  path: `/programs/${stage.slug}`,
})

export default function Page() {
  return <StageDetail slug="know-yourself" />
}
