# 財團法人鄉育教育基金會 官方形象網站

CountryEDU Charity Foundation — 官方形象網站。

> 撥開職涯的迷霧，看見你的專屬藍圖。

## 技術棧

- **框架**：Next.js 16（App Router / React Server Components）
- **語言**：TypeScript
- **樣式**：Tailwind CSS 4 + shadcn（base-nova）+ Base UI
- **字型**：Noto Sans TC + Geist（`next/font`）
- **分析**：Vercel Analytics（僅 production）
- **套件管理**：pnpm

## 開始開發

```bash
pnpm install
cp .env.example .env.local   # 視需要填入環境變數
pnpm dev                     # http://localhost:3000
```

### 常用指令

| 指令 | 說明 |
| --- | --- |
| `pnpm dev` | 啟動開發伺服器 |
| `pnpm build` | 產生 production 建置 |
| `pnpm start` | 啟動 production 伺服器 |
| `pnpm lint` | ESLint 檢查 |

## 環境變數

| 變數 | 用途 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 正式網域，影響 canonical / sitemap / Open Graph |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | 聯絡／報名表單送出端點 |
| `NEXT_PUBLIC_DONATE_URL` | 捐款第三方金流（NTC）導流網址 |

## 專案結構

```
app/                  # 路由（App Router），每頁含獨立 metadata
  layout.tsx          # 全站外殼：Header / Footer / Cursor / 跳轉連結
  page.tsx            # 首頁
  sitemap.ts          # 自動產生 sitemap.xml
  robots.ts           # 自動產生 robots.txt
  about/ programs/ impact/ involve/ news/ contact/ for/
components/
  layout/             # SiteHeader、SiteFooter、BrandMark
  home/               # 首頁各區塊
  programs/           # 三階段詳述共用版型
  ui/                 # shadcn 元件
  scroll-reveal.tsx   # 捲動淡入（IntersectionObserver）
  cursor.tsx          # 自訂游標（僅桌機 fine pointer）
  page-shell.tsx      # PageHeader / Section / StubPage 等共用版型
lib/
  site.ts             # 全站單一資料源：品牌、IA、三階段、消息⋯
  seo.ts              # per-page metadata 產生器
  utils.ts            # cn()
```

## 資訊架構（IA）

導覽與所有路由皆由 `lib/site.ts` 的 `nav` / `audiences` 驅動，修改一處即同步更新導覽列、Footer 與 sitemap。

- **首頁** `/`
- **關於我們** `/about`（mission、story、team、approach）
- **計畫** `/programs`（overview、journey、apply、university、corporate＋三階段：know-yourself / make-it-real / become-your-future）
- **影響力** `/impact`（data、outcomes、learning-story、partners、reports）
- **參與我們** `/involve`（donate、corporate、university、careers）
- **最新消息** `/news`（含 `/news/[slug]` 靜態化內頁）
- **聯絡我們** `/contact`
- **分眾專區** `/for/students`、`/for/companies`、`/for/donors`、`/for/universities`

> 分眾互動入口採**方案 B：導覽列下拉「為你而來」**；方案 A（懸浮 bar）與 C（首頁觸發按鈕）保留為未來迭代選項。

## 部署

建議部署於 Vercel：

1. 連結 Git repository，框架選 Next.js。
2. 設定上述環境變數（Production / Preview）。
3. 綁定網域並設定 DNS / SSL。

## 待辦（後續迭代）

- 各子頁內容由佔位頁逐步替換為完整文案與視覺。
- 接上表單服務（Formspree）與捐款金流（NTC）。
- 補上 Open Graph 圖片與各頁 OG 視覺。
- 上線前確認 `next.config.mjs`：移除 `typescript.ignoreBuildErrors`、評估開啟圖片最佳化（影響 Lighthouse）。
- 統一影響力數據口徑（驗收清單 150+/2,500+/10+ 與 Sales Kit 1,668/35+/106+）。
