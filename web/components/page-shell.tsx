import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Compass, Hammer } from "lucide-react"
import { cn } from "@/lib/utils"
import { audiences, nav } from "@/lib/site"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"

/** 內容置中容器——兩側留白刻意偏寬（2026-06-12 甲方回饋：內容不要太靠兩側） */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-7 md:px-12 lg:px-16", className)}>{children}</div>
}

/** 區段垂直留白包裹 */
export function Section({
  className,
  children,
  muted = false,
}: {
  className?: string
  children: React.ReactNode
  muted?: boolean
}) {
  return (
    <section className={cn("py-16 md:py-24", muted && "bg-secondary/50", className)}>
      <Container>{children}</Container>
    </section>
  )
}

/** 區段標題：eyebrow + 標題 + 說明 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: React.ReactNode
  title: string
  description?: string
  align?: "left" | "center"
}) {
  return (
    <ScrollReveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
      )}
      <h2 className="text-balance text-3xl font-black tracking-tight text-foreground sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>}
    </ScrollReveal>
  )
}

/**
 * 內容照片：沿用 hero-banner 的相框語彙（border-4 border-card + ring）。
 * 預設 16/9 橫式帶狀，可用 aspect 覆寫；caption 為選填圖說。
 */
export function Figure({
  src,
  alt,
  caption,
  aspect = "aspect-[16/9]",
  sizes = "(max-width: 1024px) 92vw, 1024px",
  priority = false,
  className,
}: {
  src: string
  alt: string
  caption?: string
  aspect?: string
  sizes?: string
  priority?: boolean
  className?: string
}) {
  return (
    <ScrollReveal as="figure" className={cn("group", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-[2rem] border-4 border-card bg-card ring-1 ring-border",
          aspect,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">{caption}</figcaption>
      )}
    </ScrollReveal>
  )
}

/** 依 href 由 nav／分眾資料推導麵包屑 */
export function findCrumbs(href: string): { title: string; href: string }[] {
  for (const sec of nav) {
    if (sec.href === href) return [{ title: sec.title, href: sec.href }]
    const item = sec.items.find((i) => i.href === href)
    if (item) return [{ title: sec.title, href: sec.href }, { title: item.title, href: item.href }]
  }
  const aud = audiences.find((a) => a.href === href)
  if (aud) return [{ title: "為你而來", href: "/" }, { title: aud.title, href: aud.href }]
  return []
}

function Breadcrumbs({ crumbs }: { crumbs: { title: string; href: string }[] }) {
  return (
    <nav aria-label="麵包屑" className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
      <Link href="/" className="hover:text-primary">
        首頁
      </Link>
      {crumbs.map((c) => (
        <span key={c.href} className="flex items-center gap-1.5">
          <ChevronRight className="size-3.5 opacity-50" aria-hidden="true" />
          <Link href={c.href} className="hover:text-primary">
            {c.title}
          </Link>
        </span>
      ))}
    </nav>
  )
}

/** 子頁頁首：晨霧綠色帶 + 麵包屑 + 標題 + 導言 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
}: {
  eyebrow?: string
  title: string
  lead?: string
  crumbs?: { title: string; href: string }[]
}) {
  return (
    <header className="relative isolate overflow-hidden border-b border-border bg-secondary/60">
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-24 -z-10 size-[26rem] rounded-full bg-primary/10 blur-3xl"
      />
      <Container className="py-14 md:py-20">
        {crumbs && crumbs.length > 0 && (
          <div className="mb-5">
            <Breadcrumbs crumbs={crumbs} />
          </div>
        )}
        {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>}
        <h1 className="max-w-3xl text-balance text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        {lead && <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{lead}</p>}
      </Container>
    </header>
  )
}

/**
 * 佔位頁主體：清楚標示「建置中」並列出本頁規劃內容，
 * 讓資訊架構於驗收時可被完整導覽與確認。
 */
export function StubBody({ outline, backHref = "/", backLabel = "回首頁" }: { outline?: string[]; backHref?: string; backLabel?: string }) {
  return (
    <Section>
      <ScrollReveal className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 text-center shadow-sm md:p-12">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary">
          <Hammer className="size-7" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-foreground">本頁內容建置中</h2>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
          設計系統與資訊架構已就緒，此頁面的文案與視覺正依品牌規範陸續上線。
        </p>

        {outline && outline.length > 0 && (
          <div className="mt-8 rounded-2xl bg-secondary/60 p-6 text-left">
            <p className="mb-3 text-sm font-semibold text-primary">本頁將包含</p>
            <ul className="space-y-2">
              {outline.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <Compass className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8">
          <Button render={<Link href={backHref} />}>{backLabel}</Button>
        </div>
      </ScrollReveal>
    </Section>
  )
}

/** 一頁式佔位頁（頁首 + 建置中主體），給尚未撰寫內容的路由共用 */
export function StubPage({
  href,
  eyebrow,
  title,
  lead,
  outline,
}: {
  href: string
  eyebrow?: string
  title: string
  lead?: string
  outline?: string[]
}) {
  const crumbs = findCrumbs(href)
  const back = crumbs.length > 1 ? crumbs[0] : { title: "首頁", href: "/" }
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lead={lead} crumbs={crumbs} />
      <StubBody outline={outline} backHref={back.href} backLabel={`回${back.title}`} />
    </>
  )
}
