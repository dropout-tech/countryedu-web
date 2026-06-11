import { CloudFog, Compass, Flag, Footprints, Map, Tent, Users, type LucideIcon } from "lucide-react"

/**
 * 路途語彙的圖標映射——與 lib/site.ts 的敘事資料對應，全站一致：
 * 迷霧=CloudFog、地圖=Map、走法=Compass（羅盤）、足跡=Footprints、同行=Users。
 */
export const actIcons: Record<string, LucideIcon> = {
  mist: CloudFog,
  map: Map,
  walk: Compass,
  footprints: Footprints,
  company: Users,
}

/** 三階段 waypoint 旗標——keyed by threeStages.slug：啟程=足跡、紮營=帳篷、抵達=旗幟 */
export const stageIcons: Record<string, LucideIcon> = {
  "know-yourself": Footprints,
  "make-it-real": Tent,
  "become-your-future": Flag,
}
