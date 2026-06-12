import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * 甲方審閱用：首頁 A／B／C 版本切換膠囊。
 * 掛在 /（版本 A）、/home-b（版本 B）與 /home-c（版本 C・只有 banner）三頁；
 * 版本定案後整組移除：刪本檔＋各頁的 <VersionSwitch />，並把勝出版本內容搬至 /。
 */
export function VersionSwitch({ current }: { current: "a" | "b" | "c" }) {
  const pill = (active: boolean) =>
    cn(
      "rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors",
      active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
    )
  return (
    <div className="fixed bottom-5 left-1/2 z-[var(--z-overlay)] flex -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-card/95 p-1 pl-4 shadow-lg backdrop-blur-sm">
      <span className="mr-1 whitespace-nowrap text-xs font-medium text-muted-foreground">首頁版本</span>
      <Link href="/" className={pill(current === "a")} aria-current={current === "a" ? "page" : undefined}>
        A
      </Link>
      <Link href="/home-b" className={pill(current === "b")} aria-current={current === "b" ? "page" : undefined}>
        B
      </Link>
      <Link href="/home-c" className={pill(current === "c")} aria-current={current === "c" ? "page" : undefined}>
        C
      </Link>
    </div>
  )
}
