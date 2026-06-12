import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Noto_Sans_TC } from 'next/font/google'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Cursor } from '@/components/cursor'
import { SITE_URL } from '@/lib/seo'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
})

// 靜態輸出部署在子路徑（GitHub Pages）時，icon 連結需要手動補 basePath
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '鄉育教育基金會｜撥開職涯的迷霧，看見你的專屬藍圖',
  description:
    '鄉育教育基金會陪伴青年探索自我、設定目標、連結未來。透過三階段的職涯探索框架，讓迷惘轉化為選擇的力量。',
  icons: {
    icon: [
      { url: `${basePath}/favicon-32.png`, sizes: '32x32', type: 'image/png' },
      { url: `${basePath}/icon.png`, sizes: '256x256', type: 'image/png' },
    ],
    apple: `${basePath}/apple-icon.png`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-Hant"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansTC.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {/* 進場動畫漸進增強：早於 body 內容同步標記 JS 可用；無 JS 時 .reveal 維持可見（見 globals.css） */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
        <a
          href="#main"
          className="sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[var(--z-skip)] focus-visible:rounded-lg focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-primary-foreground"
        >
          跳至主要內容
        </a>
        <Cursor />
        <SiteHeader />
        <main id="main" className="min-h-screen">
          {children}
        </main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
