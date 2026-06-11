"use client"

import { ArrowRight, Check, MoveRight } from "lucide-react"

import { ScrollReveal } from "@/components/scroll-reveal"
import { StageDialogContent, stageBadgeClass } from "@/components/programs/stage-dialog"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { threeStages } from "@/lib/site"

/**
 * 「專案整體架構」頁的三階段關係圖。
 * 點「進入這個階段」（觸發區撐滿整張卡片）以彈窗呈現該階段詳述，與首頁一致，
 * 取代原本跳轉至 /programs/[slug] 的頁面；彈窗內仍保留前往完整介紹的入口。
 */
export function OverviewStages() {
  return (
    <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
      {threeStages.map((s, i) => (
        <ScrollReveal key={s.slug} delay={i * 140} className="contents">
          <Dialog>
            {/* 卡片為靜態容器以保留 <h3> 語意；「進入這個階段」為觸發鈕，
                以 after:absolute 撐滿整張卡片，維持整張卡片皆可點擊。 */}
            <div className="group relative flex flex-col rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-lg">
              <span className={stageBadgeClass(s.color)}>{s.phase}</span>
              <p className="mt-4 font-mono text-sm uppercase tracking-widest text-muted-foreground">{s.en}</p>
              <h3 className="mt-1 text-2xl font-bold text-foreground">{s.title}</h3>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{s.subtitle}</p>
              <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-pretty">{p}</span>
                  </li>
                ))}
              </ul>
              <DialogTrigger
                aria-label={`進入這個階段：${s.title}`}
                className="mt-6 inline-flex w-fit cursor-pointer items-center gap-1 text-sm font-semibold text-primary outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
              >
                進入這個階段
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </DialogTrigger>
            </div>

            <StageDialogContent stage={s} />
          </Dialog>

          {i < threeStages.length - 1 && (
            <div className="flex items-center justify-center py-1 lg:py-0">
              <MoveRight className="size-7 rotate-90 text-border lg:rotate-0" aria-hidden="true" />
            </div>
          )}
        </ScrollReveal>
      ))}
    </div>
  )
}
