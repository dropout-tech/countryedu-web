"use client"

import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import { audiences, brand, nav, type NavLink, type NavSection } from "@/lib/site"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * 主導覽選單：將「參與我們」slot 改以分眾入口「為你而來」呈現（互動入口方案 B）。
 * /involve 仍保留於 Footer 與 sitemap，相關頁面不致從網站架構中孤立。
 * 「為你而來」尚無 /for 落地頁，故以 button（hover／focus 開啟下拉）呈現而非連結。
 */
const headerMenu: NavSection[] = nav.map((section) =>
  section.href === "/involve"
    ? { title: "為你而來", href: "/for", accent: true, items: audiences }
    : section,
)

const NAV_LINK =
  "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-primary"

/** 當前頁判定：精確命中或其子路由（首頁除外，避免全站皆 active）。 */
function matchPath(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href + "/"))
}

/** 依 item.group 將平面清單收斂為「群組欄」，保留首次出現順序；無 group 者落入單一未命名群組。 */
function groupNavItems(items: NavLink[]) {
  const groups: { label?: string; items: NavLink[] }[] = []
  for (const item of items) {
    const key = item.group ?? ""
    let group = groups.find((g) => (g.label ?? "") === key)
    if (!group) {
      group = { label: item.group, items: [] }
      groups.push(group)
    }
    group.items.push(item)
  }
  return groups
}

/** 三階段序號徽章。內容已由說明文字（「第一階段…」）涵蓋，故對輔助技術隱藏避免重複播報。 */
function StageBadge({ value, active }: { value: string; active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-5 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-bold tabular-nums",
        active ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
      )}
    >
      {value}
    </span>
  )
}

/** 桌機下拉項目：序號徽章（三階段）＋標題＋說明，當前頁高亮。 */
function PanelItem({ item, active }: { item: NavLink; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-start gap-2.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary",
        active && "bg-secondary",
      )}
    >
      {item.badge && <StageBadge value={item.badge} active={active} />}
      <span className="min-w-0">
        <span className={cn("block text-sm font-semibold text-foreground", active && "text-primary")}>
          {item.title}
        </span>
        {item.desc && <span className="mt-0.5 block text-xs text-muted-foreground">{item.desc}</span>}
      </span>
    </Link>
  )
}

/** 桌機大選單面板：有分組時分欄並加上欄標題；否則沿用單欄／雙欄平面排版。由 open 控制顯隱。 */
function MegaPanel({ section, open, pathname }: { section: NavSection; open: boolean; pathname: string }) {
  const groups = groupNavItems(section.items)
  const grouped = groups.length > 1 || groups.some((g) => g.label)

  return (
    <div
      className={cn(
        "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-[opacity,transform] duration-150",
        open ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-1 opacity-0",
      )}
    >
      <div
        className={cn(
          "rounded-2xl border border-border bg-card p-2 shadow-lg shadow-foreground/5",
          grouped ? "flex gap-2" : section.items.length > 5 ? "grid w-[34rem] grid-cols-2 gap-1" : "w-72",
        )}
      >
        {grouped
          ? groups.map((group, i) => (
              <div key={group.label ?? i} className="min-w-[13.5rem]">
                {group.label && (
                  <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {group.label}
                  </p>
                )}
                {group.items.map((item) => (
                  <PanelItem key={item.href} item={item} active={matchPath(pathname, item.href)} />
                ))}
              </div>
            ))
          : section.items.map((item) => (
              <PanelItem key={item.href} item={item} active={matchPath(pathname, item.href)} />
            ))}
      </div>
    </div>
  )
}

type DesktopSectionProps = {
  section: NavSection
  open: boolean
  pathname: string
  onOpen: () => void
  onCloseSoon: () => void
  onClose: () => void
}

/** 桌機單一導覽項：無子項→純連結；其餘→觸發器＋大選單，hover／focus 開啟、Esc 關閉並還原焦點。 */
function DesktopSection({ section, open, pathname, onOpen, onCloseSoon, onClose }: DesktopSectionProps) {
  const active = matchPath(pathname, section.href)

  if (section.items.length === 0) {
    return (
      <li>
        <Link
          href={section.href}
          aria-current={active ? "page" : undefined}
          className={cn(NAV_LINK, active && "text-primary")}
        >
          {section.title}
        </Link>
      </li>
    )
  }

  const handleBlur = (e: FocusEvent<HTMLLIElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onCloseSoon()
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "Escape" && open) {
      onClose()
      e.currentTarget.querySelector<HTMLElement>("a, button")?.focus()
    }
  }

  const chevron = (
    <ChevronDown
      className={cn("size-4 opacity-60 transition-transform", open && "rotate-180")}
      aria-hidden="true"
    />
  )

  return (
    <li
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onCloseSoon}
      onFocus={onOpen}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {section.accent ? (
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={open}
          className={cn(NAV_LINK, "inline-flex items-center gap-1 text-accent")}
        >
          {section.title}
          {chevron}
        </button>
      ) : (
        <Link
          href={section.href}
          aria-haspopup="true"
          aria-expanded={open}
          className={cn(NAV_LINK, "inline-flex items-center gap-1", active && "text-primary")}
        >
          {section.title}
          {chevron}
        </Link>
      )}
      <MegaPanel section={section} open={open} pathname={pathname} />
    </li>
  )
}

/** 行動版單一導覽項：無子項→純連結；其餘→手風琴，展開後依群組顯示（含欄標題與序號徽章）。 */
function MobileSection({
  section,
  open,
  pathname,
  onToggle,
}: {
  section: NavSection
  open: boolean
  pathname: string
  onToggle: () => void
}) {
  const active = matchPath(pathname, section.href)

  if (section.items.length === 0) {
    return (
      <li>
        <Link
          href={section.href}
          aria-current={active ? "page" : undefined}
          className={cn(
            "block rounded-xl px-4 py-3 text-base font-semibold hover:bg-secondary",
            active && "text-primary",
          )}
        >
          {section.title}
        </Link>
      </li>
    )
  }

  return (
    <li className="border-b border-border/60 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold hover:bg-secondary",
          section.accent && "text-accent",
        )}
      >
        {section.title}
        <ChevronDown
          className={cn("size-5 opacity-60 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="pb-2 pl-4">
          {groupNavItems(section.items).map((group, i) => (
            <div key={group.label ?? i}>
              {group.label && (
                <p className="px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {group.label}
                </p>
              )}
              <ul>
                {group.items.map((item) => {
                  const itemActive = matchPath(pathname, item.href)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={itemActive ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm text-muted-foreground hover:text-primary",
                          itemActive && "text-primary",
                        )}
                      >
                        {item.badge && <StageBadge value={item.badge} active={itemActive} />}
                        {item.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </li>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // 換頁時收合所有選單
  useEffect(() => {
    setMobileOpen(false)
    setOpenSection(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    },
    [],
  )

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }
  // 桌機：hover／focus 立即開啟；離開後延遲收合（hover-intent，避免斜切滑出即關閉）
  const openSectionNow = (key: string) => {
    cancelClose()
    setOpenSection(key)
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpenSection(null), 140)
  }
  const closeNow = () => {
    cancelClose()
    setOpenSection(null)
  }
  const toggleSection = (key: string) => setOpenSection((s) => (s === key ? null : key))

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-colors",
          scrolled || mobileOpen
            ? "border-border bg-background/90 backdrop-blur-md"
            : "border-transparent bg-background/70 backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-7 md:px-12 lg:px-16">
          <Link href="/" className="flex items-center" aria-label={`${brand.shortName}首頁`}>
            <Image
              src="/logo.png"
              alt={brand.name}
              width={1046}
              height={201}
              priority
              className="hidden h-9 w-auto sm:block"
            />
            <Image
              src="/logo-mark.png"
              alt={brand.name}
              width={278}
              height={201}
              priority
              className="h-9 w-auto sm:hidden"
            />
          </Link>

          {/* 桌機導覽 */}
          <nav aria-label="主導覽" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {headerMenu.map((section) => (
                <DesktopSection
                  key={section.href}
                  section={section}
                  pathname={pathname}
                  open={openSection === section.href}
                  onOpen={() => openSectionNow(section.href)}
                  onCloseSoon={scheduleClose}
                  onClose={closeNow}
                />
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button size="lg" className="hidden h-10 px-5 sm:inline-flex" render={<Link href="/involve/donate" />}>
              支持我們
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "關閉選單" : "開啟選單"}
              aria-expanded={mobileOpen}
              className="inline-flex size-10 items-center justify-center rounded-lg text-foreground hover:bg-secondary lg:hidden"
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* 行動選單（置於 header 之外，避免 header 的 backdrop-filter 成為 fixed 包含區塊） */}
      {mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-border bg-background lg:hidden">
          <nav aria-label="行動選單" className="mx-auto w-full max-w-7xl px-7 py-6">
            <ul className="flex flex-col gap-1">
              {headerMenu.map((section) => (
                <MobileSection
                  key={section.href}
                  section={section}
                  pathname={pathname}
                  open={openSection === section.href}
                  onToggle={() => toggleSection(section.href)}
                />
              ))}
            </ul>

            <Button size="lg" className="mt-6 h-12 w-full text-base" render={<Link href="/involve/donate" />}>
              支持我們
            </Button>
          </nav>
        </div>
      )}
    </>
  )
}
