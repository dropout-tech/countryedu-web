"use client"

import { useEffect, useRef } from "react"

/**
 * 自訂游標：實心圓點即時跟隨，外環以 rAF 緩動尾隨；
 * 滑過可互動元素時外環放大。僅在桌機（hover + fine pointer）且未開啟
 * 減少動態偏好時啟用，否則保留原生游標。
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!finePointer || reduceMotion) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.documentElement.classList.add("cursor-none")

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
      dot.style.opacity = "1"
      ring.style.opacity = "1"
    }

    const onLeave = () => {
      dot.style.opacity = "0"
      ring.style.opacity = "0"
    }

    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']")

    const onOver = (e: MouseEvent) => ring.classList.toggle("cursor-ring--active", isInteractive(e.target))

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseover", onOver, { passive: true })
    document.addEventListener("mouseleave", onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseleave", onLeave)
      document.documentElement.classList.remove("cursor-none")
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] size-2 rounded-full bg-primary opacity-0"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9999] rounded-full opacity-0 transition-[width,height,background-color,border-color] duration-200"
      />
    </>
  )
}
