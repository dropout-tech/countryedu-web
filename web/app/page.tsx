import { HeroBanner } from "@/components/home/hero-banner"
import { WhyNow } from "@/components/home/why-now"
import { SpiralAbilities } from "@/components/home/spiral-abilities"
import { ProgramStrip } from "@/components/home/program-strip"
import { Stories } from "@/components/home/stories"
import { ImpactStrip } from "@/components/home/impact"
import { AudienceEntries } from "@/components/home/audience-entries"
import { HomeCta } from "@/components/home/cta"
import { VersionSwitch } from "@/components/home/version-switch"

/**
 * 首頁敘事（2026-06 會議改版）：
 * 第一印象（基金會理念）→ 為什麼（世代課題）→ 怎麼做（能力螺旋）
 * → 是什麼（尋路計畫宏觀三階段）→ 故事 → 影響力 → CTA。
 * 由上而下單一閱讀方向；課程細節留給子頁與彈窗。
 *
 * 本頁＝甲方審閱「版本 A」（連續敘事版 variant="flow"）：
 * 米白 Hero → 白 → 深綠隧道（計畫）→ 米白 → 白 → 米白 → 橘 CTA，
 * 區塊間以曲線過渡（FlowCap）自然咬合——不做貫穿線（2026-06-11 決議）、
 * 不做「一塊塊投影片」的硬切；同一套 Sales Kit 色票拉高劑量。
 * 敘事版「版本 B」在 /home-b（語彙與波浪接縫不同，元件以 variant="path" 區分）。
 * VersionSwitch 為審閱期暫掛，版本定案後移除。
 */
export default function Page() {
  return (
    <>
      <HeroBanner variant="flow" />
      <WhyNow variant="flow" />
      <SpiralAbilities variant="flow" />
      <ProgramStrip variant="flow" />
      <Stories variant="flow" />
      <ImpactStrip variant="flow" />
      <AudienceEntries variant="flow" />
      <HomeCta variant="flow" />
      <VersionSwitch current="a" />
    </>
  )
}
