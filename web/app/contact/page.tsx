import type { Metadata } from "next"
import { Mail, MapPin, Phone, User } from "lucide-react"
import { PageHeader, Section } from "@/components/page-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ContactForm } from "@/components/contact-form"
import { pageMeta } from "@/lib/seo"
import { brand } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "聯絡我們",
  description: "與鄉育教育基金會聯繫——合作洽詢、捐款、媒體與一般問題。",
  path: "/contact",
})

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="聯絡我們"
        title="與鄉育對話"
        lead="無論是合作洽詢、捐款支持或任何想法，都歡迎與我們聯繫。"
        crumbs={[{ title: "聯絡我們", href: "/contact" }]}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <ScrollReveal className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">聯絡資訊</h2>
              <p className="mt-2 text-pretty text-muted-foreground">
                我們會盡快回覆你的來信；企業與學校合作亦可直接來信索取提案資料。
              </p>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <User className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-foreground/85">
                  {brand.contactTitle}　{brand.contactPerson}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <a href={`mailto:${brand.email}`} className="text-foreground/85 hover:text-primary">
                  {brand.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="text-foreground/85 hover:text-primary">
                  {brand.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-foreground/85">{brand.name}</span>
              </li>
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={120} className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <ContactForm />
          </ScrollReveal>
        </div>
      </Section>
    </>
  )
}
