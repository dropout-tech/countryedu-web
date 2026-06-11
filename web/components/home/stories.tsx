import Link from "next/link"
import { ArrowRight, Footprints } from "lucide-react"
import { Container } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { journeyVocab, storyActs } from "@/lib/site"

/**
 * 學生故事：四幕成長旅程（資料源 lib/site.ts storyActs，與 impact/learning-story 共用）。
 * 依會議回饋改為「第一幕→第四幕」由左至右的故事推進（桌機），
 * 行動版自然降為由上而下，幕與幕之間以一條連續的路串接。
 * variant="path"（版本 B）：eyebrow 套「足跡」並加完整故事連結。
 * variant="flow"（版本 A 連續敘事版）：米白底，承接深綠隧道段的曲線出口。
 */
export function Stories({ variant }: { variant?: "path" | "flow" } = {}) {
  const flow = variant === "flow"
  return (
    <section className="py-16 md:py-24">
      <Container>
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
            {variant === "path" ? (
              <span className="inline-flex items-center gap-1.5">
                <Footprints className="size-4" aria-hidden="true" />
                {journeyVocab.footprints}・學生故事
              </span>
            ) : (
              "學生故事"
            )}
          </p>
          <h2 className="text-balance text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            {flow ? (
              <>
                一段<span className="text-primary">四幕</span>的成長旅程
              </>
            ) : variant === "path" ? (
              <>
                一段四幕的<span className="hl-leaf">成長旅程</span>
              </>
            ) : (
              "一段四幕的成長旅程"
            )}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            每個青年的旅程，都是從迷惘走向看見的過程。
          </p>
        </ScrollReveal>

        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* 桌機：貫穿四幕的路 */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-5 hidden h-0.5 w-full bg-gradient-to-r from-primary/15 via-primary to-accent md:block"
          />
          {/* 行動版：縱向的路 */}
          <span
            aria-hidden="true"
            className="absolute left-5 top-0 h-full w-0.5 bg-gradient-to-b from-primary/15 via-primary to-accent md:hidden"
          />

          {storyActs.map((a, i) => (
            <ScrollReveal key={a.act} as="li" delay={i * 140} className="relative pl-14 md:pl-0 md:pt-14">
              <span
                className={`absolute left-0 top-0 inline-flex size-10 items-center justify-center rounded-full text-sm font-bold text-primary-foreground ring-4 md:left-0 ${flow && i % 2 === 1 ? "bg-accent" : "bg-primary"} ring-background`}
              >
                {i + 1}
              </span>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">{a.act}</p>
              <h3 className="mt-1 text-xl font-bold text-foreground">{a.q}</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{a.a}</p>
            </ScrollReveal>
          ))}
        </ol>

        {variant === "path" && (
          <ScrollReveal className="mt-12 text-center">
            <Link
              href="/impact/learning-story"
              className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
            >
              走進完整的四幕故事
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </ScrollReveal>
        )}
      </Container>
    </section>
  )
}
