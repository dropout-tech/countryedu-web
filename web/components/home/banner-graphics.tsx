type Pt = [number, number]

function toPath(pts: Pt[]) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ")
}

type Line = { color: string; pts: Pt[] }

/**
 * 匯聚旅程 —— 以程式碼（SVG）繪製的 hero 創意主軸（靜態）。版本 A 使用。
 *
 * 概念：多條彩色路徑由四面八方（迷霧中的多元選項）階梯式收斂，
 * 最終匯聚成一支明亮的箭頭，指向右側 —— 象徵「撥開迷霧、找到專屬藍圖」。
 */
export function ConvergingJourney({
  className = "",
  preserveAspectRatio = "xMidYMid meet",
  strokeWidth = 20,
}: {
  className?: string
  preserveAspectRatio?: string
  strokeWidth?: number
}) {
  // 匯聚點
  const hub: Pt = [820, 300]

  const lines: Line[] = [
    {
      color: "#4A9023", // 鄉育綠 BRAND GREEN
      pts: [
        [0, 70],
        [170, 70],
        [270, 150],
        [430, 150],
        [580, 230],
        hub,
      ],
    },
    {
      color: "#E8941A", // 路徑橘 PATH ORANGE（Sales Kit 對齊，鄉育的指引線）
      pts: [
        [0, 185],
        [150, 185],
        [260, 250],
        [460, 250],
        [620, 285],
        hub,
      ],
    },
    {
      color: "#6FB23E", // 鄉育綠（亮）
      pts: [
        [0, 300],
        [240, 300],
        [520, 300],
        hub,
      ],
    },
    {
      color: "#F7B52C", // 暖陽黃 SUN GOLD（Sales Kit 對齊）
      pts: [
        [0, 415],
        [170, 415],
        [300, 350],
        [490, 350],
        [640, 320],
        hub,
      ],
    },
    {
      color: "#E8941A", // 路徑橘 PATH ORANGE（Sales Kit 對齊）
      pts: [
        [0, 530],
        [220, 530],
        [350, 440],
        [540, 440],
        [680, 345],
        hub,
      ],
    },
  ]

  return (
    <svg
      viewBox="0 0 1160 600"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio={preserveAspectRatio}
      className={className}
    >
      {/* 彩色匯聚路徑 */}
      {lines.map((line, i) => (
        <g key={i}>
          <path
            d={toPath(line.pts)}
            stroke={line.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {line.pts.slice(0, -1).map((p, j) => (
            <circle
              key={j}
              cx={p[0]}
              cy={p[1]}
              r={10}
              fill="#ffffff"
              stroke={line.color}
              strokeWidth={6}
            />
          ))}
        </g>
      ))}

      {/* 匯聚後的主箭頭（鄉育綠，指向藍圖方向） */}
      <path
        d="M 800 300 L 1110 300"
        stroke="#4A9023"
        strokeWidth={26}
        strokeLinecap="round"
      />
      <polyline
        points="1075,255 1135,300 1075,345"
        stroke="#4A9023"
        strokeWidth={26}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* 匯聚點高亮（綠×橘交會：綠＝學生路徑、橘＝鄉育指引） */}
      <circle cx={hub[0]} cy={hub[1]} r={16} fill="#4A9023" />
      <circle
        cx={hub[0]}
        cy={hub[1]}
        r={26}
        fill="none"
        stroke="#E8941A"
        strokeWidth={3}
        opacity={0.55}
      />
    </svg>
  )
}

/**
 * 路網 —— 捷運路線圖式的交錯路網（靜態）。版本 B（敘事版）使用。
 *
 * 概念：城市路網般彼此交會的多條路線 —— 沒有單一終點與箭頭，
 * 每一次轉彎都是一站；路是網狀的，怎麼走都能相遇。
 * 與 ConvergingJourney 同一套視覺簽名：粗線、白底大節點、品牌五色。
 */
export function NetworkWeave({
  className = "",
  preserveAspectRatio = "xMidYMid meet",
  strokeWidth = 18,
}: {
  className?: string
  preserveAspectRatio?: string
  strokeWidth?: number
}) {
  // stations 未指定時＝轉彎處（首尾端點不放，維持路線「穿出畫面」的延伸感）。
  // 幾何依 hero 版面配置：節點集中在實際可見區——上帶（標題上方）、
  // 下帶（照片下方）、照片右側細條；中段被標題遮罩淡化、照片覆蓋，僅作穿越層。
  const lines: (Line & { stations?: Pt[] })[] = [
    {
      color: "#4A9023", // 鄉育綠：上帶橫貫線
      pts: [
        [0, 55],
        [240, 55],
        [310, 120],
        [520, 120],
        [600, 55],
        [1160, 55],
      ],
    },
    {
      color: "#FCD600", // 晨光黃：左側縱貫線
      pts: [
        [150, 0],
        [150, 140],
        [240, 220],
        [240, 420],
        [150, 500],
        [150, 600],
      ],
    },
    {
      color: "#A7C957", // 黃綠：中帶橫貫線（穿越層）
      pts: [
        [0, 300],
        [200, 300],
        [290, 230],
        [560, 230],
        [650, 300],
        [1160, 300],
      ],
    },
    {
      color: "#6FB23E", // 鄉育綠（亮）：下帶橫貫線
      pts: [
        [0, 545],
        [300, 545],
        [390, 475],
        [700, 475],
        [790, 545],
        [1160, 545],
      ],
    },
    {
      color: "#F5921E", // 暖陽橘：右側縱貫線（最後繪製，轉乘站蓋在橫線上）
      pts: [
        [1105, 0],
        [1105, 600],
      ],
      stations: [
        [1105, 55],
        [1105, 300],
        [1105, 545],
      ],
    },
  ]

  return (
    <svg
      viewBox="0 0 1160 600"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio={preserveAspectRatio}
      className={className}
    >
      {lines.map((line, i) => (
        <g key={i}>
          <path
            d={toPath(line.pts)}
            stroke={line.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {(line.stations ?? line.pts.slice(1, -1)).map((p, j) => (
            <circle
              key={j}
              cx={p[0]}
              cy={p[1]}
              r={10}
              fill="#ffffff"
              stroke={line.color}
              strokeWidth={6}
            />
          ))}
        </g>
      ))}
    </svg>
  )
}
