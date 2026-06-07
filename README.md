# countryedu-web

鄉育（CountryEDU）官方網站 — monorepo。

## 結構

```
.
├── web/                 # Next.js 16 網站本體（App Router · Tailwind v4 · shadcn/ui）
└── design/              # 設計素材（不部署、僅供參考）
    ├── banner-refs/     # 客戶提供的 banner 參考圖（現行視覺方向依據）
    └── color-system/    # 色彩系統交付（color-system.html / .pdf / 色彩規格.md）
```

> 商務／法務／個資文件（會議記錄、契約、sales kit…）依規不進版控，僅留本機。

## 開發

```bash
cd web
npm install
npm run dev        # http://localhost:3000
```

| 指令 | 說明 |
|------|------|
| `npm run dev`   | 本機開發伺服器 |
| `npm run build` | production 建置 |
| `npm run start` | 啟動 production server |
| `npm run lint`  | ESLint 檢查 |

## 技術棧

- Next.js 16 / React 19
- TypeScript 5.7
- Tailwind CSS v4
- shadcn/ui、framer-motion
