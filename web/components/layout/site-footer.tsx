import Image from "next/image"
import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import { audiences, brand, nav } from "@/lib/site"

export function SiteFooter() {
  const columns = nav.filter((s) => s.items.length > 0)

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto w-full max-w-6xl px-7 py-14 md:px-12 md:py-16 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          {/* 品牌區 */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex" aria-label={`${brand.shortName}首頁`}>
              <Image src="/logo.png" alt={brand.name} width={1046} height={201} className="h-11 w-auto" />
            </Link>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">{brand.description}</p>
            <p className="mt-4 text-sm font-semibold text-primary">「{brand.motto}」</p>
          </div>

          {/* 導覽欄位 */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((section) => (
              <div key={section.href}>
                <Link href={section.href} className="text-sm font-bold text-foreground hover:text-primary">
                  {section.title}
                </Link>
                <ul className="mt-3 space-y-2">
                  {section.items.slice(0, 5).map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 分眾 + 聯絡 */}
        <div className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold text-foreground">為你而來</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {audiences.map((a) => (
                <li key={a.href}>
                  <Link href={a.href} className="text-sm text-muted-foreground hover:text-primary">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:text-right">
            <p className="text-sm font-bold text-foreground">聯絡我們</p>
            <div className="mt-3 flex flex-col gap-2 md:items-end">
              <a href={`mailto:${brand.email}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                <Mail className="size-4" aria-hidden="true" />
                {brand.email}
              </a>
              <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                <Phone className="size-4" aria-hidden="true" />
                {brand.phone}
              </a>
            </div>
          </div>
        </div>

        {/* 版權列 */}
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {brand.name}　{brand.nameEn}
          </p>
          <p>本網站之勸募字號與隱私權政策將於上線前補上。</p>
        </div>
      </div>
    </footer>
  )
}
