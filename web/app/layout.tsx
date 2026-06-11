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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '鄉育教育基金會｜撥開職涯的迷霧，看見你的專屬藍圖',
  description:
    '鄉育教育基金會陪伴青年探索自我、設定目標、連結未來。透過三階段的職涯探索框架，讓迷惘轉化為選擇的力量。',
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '256x256', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
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
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansTC.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-lg focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-primary-foreground"
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
