"use client"

import { useState } from "react"
import { CheckCircle2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

/** Formspree（或相容服務）端點，由環境變數提供 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT

type Status = "idle" | "sending" | "sent" | "error"

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    // 蜜罐反垃圾：機器人才會填這個隱藏欄位
    if ((form.elements.namedItem("company") as HTMLInputElement)?.value) return

    if (!ENDPOINT) {
      setStatus("error")
      return
    }

    setStatus("sending")
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
      if (res.ok) {
        setStatus("sent")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-border bg-secondary/50 p-10 text-center">
        <CheckCircle2 className="size-12 text-primary" aria-hidden="true" />
        <p className="text-lg font-bold text-foreground">已收到你的訊息！</p>
        <p className="text-sm text-muted-foreground">我們會盡快與你聯繫，謝謝你願意與鄉育對話。</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* 蜜罐欄位（對使用者隱藏） */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label>
          公司（請勿填寫）
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            姓名
          </label>
          <input id="name" name="name" required autoComplete="name" className={inputClass} placeholder="你的名字" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@example.com" />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-foreground">
          主旨
        </label>
        <input id="subject" name="subject" required className={inputClass} placeholder="想與我們聊聊什麼？" />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          訊息內容
        </label>
        <textarea id="message" name="message" required rows={5} className={inputClass} placeholder="請描述你的需求或想法⋯⋯" />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">
          {ENDPOINT ? "送出失敗，請稍後再試，或直接來信聯繫。" : "表單服務尚未串接（請設定 NEXT_PUBLIC_FORMSPREE_ENDPOINT），目前請直接來信聯繫。"}
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "sending"} className="h-12 px-7">
        {status === "sending" ? "送出中⋯" : "送出訊息"}
        <Send className="size-4" aria-hidden="true" />
      </Button>
    </form>
  )
}
