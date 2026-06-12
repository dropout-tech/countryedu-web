"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

/** 客戶端導向至第一子頁；無 JS 時保留可見連結後援（靜態匯出無伺服器 redirect） */
export function AboutForward() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/about/mission")
  }, [router])
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-muted-foreground">正在前往「使命與願景」…</p>
      <Link
        href="/about/mission"
        className="font-semibold text-primary underline underline-offset-4 hover:opacity-80"
      >
        若未自動跳轉，點此前往
      </Link>
    </div>
  )
}
