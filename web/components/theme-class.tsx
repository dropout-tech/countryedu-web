"use client"

import { useEffect } from "react"

/**
 * 審閱用：掛載期間在 <html> 加上指定 theme class、卸載即移除。
 * 用於 /home-b 試穿色票 v4（.theme-v4 定義於 globals.css）——
 * 套在 <html> 才能連同 layout 的 Header／Footer 一起換色。
 * 注意：首次載入會先以 :root（v3）渲染、hydration 後切換，審閱用可接受。
 */
export function ThemeClass({ name }: { name: string }) {
  useEffect(() => {
    document.documentElement.classList.add(name)
    return () => document.documentElement.classList.remove(name)
  }, [name])
  return null
}
