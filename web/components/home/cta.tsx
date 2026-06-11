import Link from "next/link"
import { ArrowRight, Heart } from "lucide-react"
import { Container } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { FlowCap } from "@/components/home/flow-decor"
import { brand } from "@/lib/site"

/** variant="flow"（版本 A 連續敘事版）：路徑橘滿版收尾——全站唯一橘色大面積，上緣以米白曲線咬入。 */
export function HomeCta({ variant }: { variant?: "flow" } = {}) {
  const flow = variant === "flow"
  return (
    <section className={flow ? "relative bg-path-orange py-24 md:py-28" : "py-16 md:py-24"}>
      {flow && <FlowCap position="top" className="text-background" />}
      <Container>
        <ScrollReveal
          className={
            flow
              ? "relative isolate text-center"
              : "relative isolate overflow-hidden rounded-[2.5rem] bg-primary px-6 py-16 text-center md:px-12"
          }
        >
          <div aria-hidden="true" className="absolute -left-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl" />
          <div
            aria-hidden="true"
            className={`absolute -bottom-16 -right-16 size-64 rounded-full blur-2xl ${flow ? "bg-white/10" : "bg-accent/20"}`}
          />
          <h2 className="text-balance text-3xl font-black text-primary-foreground sm:text-4xl">{brand.tagline}</h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-primary-foreground/85">{brand.motto}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="secondary" className="h-12 px-7 text-base" render={<Link href="/involve/donate" />}>
              <Heart className="size-5" aria-hidden="true" />
              支持我們
            </Button>
            <Button
              size="lg"
              className="h-12 border border-primary-foreground/40 bg-transparent px-7 text-base text-primary-foreground hover:bg-primary-foreground/10"
              render={<Link href="/programs" />}
            >
              認識計畫
              <ArrowRight className="size-5" aria-hidden="true" />
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
