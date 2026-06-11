"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type ScrollRevealProps = {
  children: React.ReactNode
  /** 延遲毫秒數，用於同一區塊內元素的錯落出現 */
  delay?: number
  className?: string
  /** 渲染的標籤，預設 div */
  as?: React.ElementType
}

/**
 * 捲動進入視窗時淡入上移（搭配 globals.css 的 .reveal 樣式）。
 * 以 IntersectionObserver 觸發一次；尊重 prefers-reduced-motion（由 CSS 處理）。
 */
export function ScrollReveal({ children, delay = 0, className, as: Tag = "div" }: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible")
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={cn("reveal", className)} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  )
}
