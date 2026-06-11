import type { Metadata } from "next"
import { brand } from "@/lib/site"

/** 正式網域以環境變數覆寫；預設為基金會網域 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.countryedu.org.tw"

/** 為各頁產生獨立 metadata（title／description／canonical／Open Graph） */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string
  description?: string
  path: string
}): Metadata {
  const fullTitle = `${title}｜${brand.shortName}`
  const desc = description ?? brand.description
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`
  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: brand.shortName,
      locale: "zh_TW",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
  }
}
