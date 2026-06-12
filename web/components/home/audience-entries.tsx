import type { CSSProperties } from "react"
import Link from "next/link"
import { ArrowRight, Building2, GraduationCap, HeartHandshake, School } from "lucide-react"
import { Container } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ContourBg } from "@/components/section-decor"
import { audiences } from "@/lib/site"

/**
 * 分眾入口（CTA 前）：學生／企業／捐款人／學校，連到既有 /for/* 入口頁。
 * 角色色依色彩系統「06 分眾 Accent」（design/color-system/color-system.html）：
 * 學生＝暖陽橘、企業＝藍圖青、捐款人＝珊瑚暖、學校＝深松綠。
 * fg＝該 accent 滿底時的文字色——暖陽橘／珊瑚暖上禁壓白字，配深色字。
 */
const ROLES = {
  "/for/students": { icon: GraduationCap, hue: "#f5921e", fg: "#2a1b05" },
  "/for/companies": { icon: Building2, hue: "#1a7479", fg: "#ffffff" },
  "/for/donors": { icon: HeartHandshake, hue: "#ff7a5c", fg: "#3a1206" },
  "/for/universities": { icon: School, hue: "#2e6b4e", fg: "#ffffff" },
} as const

/**
 * variant="flow"（版本 A 連續敘事版）：米白底無框線，銜接後方橘色 CTA 的曲線。
 * variant="path"（版本 B）：無框線（與 WaveSeam 接縫相鄰）＋等高線底紋。
 */
export function AudienceEntries({ variant }: { variant?: "flow" | "path" } = {}) {
  return (
    <section
      className={
        variant === "flow"
          ? "bg-background py-16 md:py-24"
          : variant === "path"
            ? "relative bg-secondary/40 py-16 md:py-24"
            : "border-y border-border bg-secondary/40 py-16 md:py-24"
      }
    >
      {variant === "path" && <ContourBg />}
      <Container>
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">為你而來</p>
          <h2 className="text-balance text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            {variant === "flow" ? (
              <>
                <span className="text-primary">你是誰？</span>從這裡開始
              </>
            ) : (
              "你是誰？從這裡開始"
            )}
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {audiences.map((a, i) => {
            const role = ROLES[a.href as keyof typeof ROLES]
            const Icon = role?.icon ?? ArrowRight
            return (
              <ScrollReveal key={a.href} delay={i * 110} className="h-full">
                <Link
                  href={a.href}
                  style={
                    {
                      "--role": role?.hue ?? "var(--primary)",
                      "--role-fg": role?.fg ?? "#ffffff",
                    } as CSSProperties
                  }
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-[var(--role)] ${variant === "flow" ? "hover:shadow-[0_16px_36px_-12px_var(--role)]" : "hover:shadow-lg"}`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1.5 bg-[var(--role)] opacity-80 transition-opacity group-hover:opacity-100"
                  />
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--role)_14%,transparent)] text-[var(--role)] transition-colors group-hover:bg-[var(--role)] group-hover:text-[var(--role-fg)]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-foreground">{a.title}</h3>
                  <p className="mt-1 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--role)]">
                    前往專屬入口
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
