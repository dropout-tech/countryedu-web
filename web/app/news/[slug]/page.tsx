import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays } from "lucide-react"
import { PageHeader, Section } from "@/components/page-shell"
import { pageMeta } from "@/lib/seo"
import { news } from "@/lib/site"

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const item = news.find((n) => n.slug === slug)
  if (!item) return {}
  return pageMeta({ title: item.title, description: item.excerpt, path: `/news/${slug}` })
}

export default async function Page({ params }: Params) {
  const { slug } = await params
  const item = news.find((n) => n.slug === slug)
  if (!item) notFound()

  return (
    <>
      <PageHeader
        eyebrow={item.category}
        title={item.title}
        crumbs={[
          { title: "最新消息", href: "/news" },
          { title: item.title, href: `/news/${slug}` },
        ]}
      />
      <Section>
        <article className="mx-auto max-w-2xl">
          <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarDays className="size-4" aria-hidden="true" />
            {item.date}
          </p>
          <div className="mt-6 space-y-5 text-pretty text-lg leading-relaxed text-foreground/85">
            {item.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-10 border-t border-border pt-6">
            <Link href="/news" className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
              <ArrowLeft className="size-4" aria-hidden="true" />
              回最新消息
            </Link>
          </div>
        </article>
      </Section>
    </>
  )
}
