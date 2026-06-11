"use client"

import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import type { threeStages } from "@/lib/site"
import { cn } from "@/lib/utils"

type Stage = (typeof threeStages)[number]

/** 階段色票對應的圓角標籤樣式——三階段卡片與彈窗共用。 */
export function stageBadgeClass(color: Stage["color"]) {
  return cn(
    "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold",
    color === "accent" ? "bg-accent/15 text-accent" : "bg-primary/15 text-primary",
  )
}

/**
 * 三階段詳述彈窗內容——首頁與「專案整體架構」頁共用，
 * 確保兩處點擊卡片後呈現一致；彈窗內仍保留前往完整介紹頁的入口。
 * 須置於 <Dialog> 之內，與卡片觸發鈕（DialogTrigger）為兄弟節點。
 */
export function StageDialogContent({ stage }: { stage: Stage }) {
  return (
    <DialogContent>
      <div className="pr-10">
        <span className={stageBadgeClass(stage.color)}>{stage.phase}</span>
        <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">{stage.en}</p>
        <DialogTitle className="mt-1">{stage.title}</DialogTitle>
        <p className="mt-1 text-sm font-medium text-muted-foreground">{stage.subtitle}</p>
      </div>

      <DialogDescription className="mt-5">{stage.summary}</DialogDescription>

      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">本階段重點</p>
        <ul className="mt-3 space-y-2.5">
          {stage.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-pretty text-foreground/85">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-7 flex items-center justify-between gap-4 border-t border-border pt-5">
        <Link
          href={`/programs/${stage.slug}`}
          className="group/link inline-flex items-center gap-1 text-sm font-semibold text-primary"
        >
          查看完整介紹
          <ArrowRight
            className="size-4 transition-transform group-hover/link:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
        <DialogClose className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-5")}>關閉</DialogClose>
      </div>
    </DialogContent>
  )
}
