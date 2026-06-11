import type { CSSProperties } from "react"
import Link from "next/link"
import { ArrowRight, Building2, Footprints, School } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { companions } from "@/lib/site"

/**
 * 第⑤段「同行」三分流卡（學生／大學／企業 → programs 區轉換頁）。
 * 與首頁 audience-entries（/for/* 分眾入口）是不同層級的分流，勿混用。
 */
const ROLES = {
  student: { icon: Footprints, hue: "#4a9023" },
  university: { icon: School, hue: "#b87fe0" },
  corporate: { icon: Building2, hue: "#2f9df0" },
} as const

export function CompanionCtas() {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:gap-6">
      {companions.map((c, i) => {
        const role = ROLES[c.key as keyof typeof ROLES]
        const Icon = role?.icon ?? ArrowRight
        return (
          <ScrollReveal key={c.key} delay={i * 110} className="h-full">
            <Link
              href={c.href}
              style={{ "--role": role?.hue ?? "var(--primary)" } as CSSProperties}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-[var(--role)] hover:shadow-lg"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1.5 bg-[var(--role)] opacity-80 transition-opacity group-hover:opacity-100"
              />
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--role)_14%,transparent)] text-[var(--role)] transition-colors group-hover:bg-[var(--role)] group-hover:text-white">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl font-bold text-foreground">{c.title}</h3>
              <p className="mt-1 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--role)]">
                {c.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </ScrollReveal>
        )
      })}
    </div>
  )
}
