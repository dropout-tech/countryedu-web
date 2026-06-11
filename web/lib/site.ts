/**
 * 全站單一資料源（Single Source of Truth）
 *
 * 導覽列、Footer、sitemap、麵包屑與各頁面文案皆由此檔驅動，
 * 確保資訊架構（IA）與品牌資訊只需在一處維護。
 * 內容取自鄉育 Sales Kit（2025/05）與「PM 核心能力課程設計」文件。
 *
 * ── 詞彙紀律（2026-06 會議決議，改文案前必讀）──────────────────
 * 1. 兩層詞彙不可混用：
 *    旅程層＝宏觀三階段（認識自己→勇敢實踐→成為未來），保留「階段」一詞；
 *    方法層＝專案內四象限螺旋（spiralPhases），一律用「循環／象限／螺旋」，禁用「階段」。
 * 2. 對外不用「PM 職訓」表述：頁面標題與 lead 層級用「可遷移的問題解決與整合能力」
 *    「核心工作能力」；課綱事實內的工具名（如「PM 基礎心智」）可保留。
 * 3. 四大能力名稱為暫時詞，只存在 spiralPhases 一處，頁面不得複製字串，定案後一處替換。
 * 4. 全站路途語彙（迷霧／地圖／走法／足跡／同行…）統一取自 journeyVocab，不手寫散落。
 */

export const brand = {
  name: "財團法人鄉育教育基金會",
  shortName: "鄉育教育基金會",
  nameEn: "CountryEDU Charity Foundation",
  tagline: "撥開職涯的迷霧，看見你的專屬藍圖",
  subTagline: "讓迷惘轉化為「選擇」的力量",
  mission: "培養青年認識自己、理解世界",
  description:
    "鄉育教育基金會陪伴青年探索自我、設定目標、連結未來。透過三階段的職涯探索框架，讓迷惘轉化為選擇的力量。",
  motto: "媒合只是一種結果，選擇才是一種能力",
  /** 計畫名稱已由甲方定案（2026-06）：「尋路計畫」Pathfinder Program */
  programName: "尋路計畫",
  programNameEn: "Pathfinder Program",
  email: "yuzhen.lin@countryedu.org.tw",
  phone: "+886 936-056-998",
  contactPerson: "林妤蓁 Kari Lin",
  contactTitle: "大學生培力專案督導",
} as const

/** 首頁／影響力的影響力三格（依驗收清單之累積數據） */
export const heroStats = [
  { value: "150+", label: "累積課堂" },
  { value: "2,500+", label: "陪伴學生" },
  { value: "10+", label: "企業夥伴" },
] as const

/** Sales Kit（2025/05）揭示之服務成果——與上方數據需於上線前統一口徑 */
export const impactStats = [
  { value: "1,668", unit: "人", label: "累積服務高中生 & 大專院校學生" },
  { value: "35+", unit: "", label: "合作高中 & 大專院校" },
  { value: "106+", unit: "", label: "課程／講座場次" },
  { value: "12", unit: "縣市", label: "服務據點遍及全台" },
] as const

/** 世代課題（Why Now）——首頁與 mission 使用 */
export const generationIssue = {
  lead: "當世界快速改變，青年卻越來越難回答：「我是誰？我要往哪裡去？」",
  data: [
    { value: "94.6%", label: "青年求職焦慮指數", source: "yes123 求職網 2025 年調查" },
    { value: "11.6%", label: "15–24 歲青年失業率", source: "2025 年行政院主計處" },
  ],
  voices: ["努力很多，但不知道方向", "不知道自己適合什麼", "害怕選錯", "不確定自己能力是否有價值"],
  conclusion: "比起更早做決定，青年更需要的是「理解自己與社會的能力」。",
} as const

/**
 * 培訓三階段架構——對應 Programs 三階段詳述子頁
 * Sales Kit 命名：Explore／Experience／Execute；網站路由採英文意象命名。
 * 「階段」一詞屬旅程層專用（見檔頭詞彙紀律）；waypoint 為對應的路途語彙。
 */
export const threeStages = [
  {
    slug: "know-yourself",
    phase: "第一階段",
    en: "Explore",
    waypoint: "啟程",
    title: "認識自己",
    subtitle: "職涯原動力探詢",
    summary: "導入國際測評工具，辨識興趣特質與價值觀，預防職位錯置。",
    points: [
      "導入 Holland Code (RIASEC) 國際測評工具，啟動學生建立職涯 SWOT 地圖",
      "辨識興趣特質與價值觀，預防職位錯置",
      "PM 基礎心智：問題、目標、限制、利害關係人",
    ],
    color: "primary",
  },
  {
    slug: "make-it-real",
    phase: "第二階段",
    en: "Experience",
    waypoint: "紮營",
    title: "勇敢實踐",
    subtitle: "跨界職場實戰體驗",
    summary: "真實 PBL 專案實作，在壓力下學習與團隊協作，搭配企業導師回饋。",
    points: [
      "真實 PBL 專案實作：問題定義 → 資料蒐集與梳理 → 驗證假設 → 提案",
      "在壓力下學習與團隊協作，搭配企業導師制度回饋實作成果",
      "目標設定、實作節奏與挫折管理",
    ],
    color: "accent",
  },
  {
    slug: "become-your-future",
    phase: "第三階段",
    en: "Execute",
    waypoint: "抵達",
    title: "成為未來",
    subtitle: "核心技能認證",
    summary: "將軟實力轉化為具數據支持的數位成長履歷，協助媒合具韌性的青年人才。",
    points: [
      "引導學生將軟實力轉化為具備成果與數據支持的數位成長履歷",
      "企業聯動、職涯適配與人才媒合",
      "協助部署與媒合具韌性的青年人才",
    ],
    color: "primary",
  },
] as const

/** 大事紀（創立故事 timeline） */
export const milestones = [
  {
    year: "2021",
    text: "配合教育部 108 課綱，在台南北門農工與北門高中舉辦首次學習歷程檔案輔導工作坊。",
  },
  { year: "2022", text: "財團法人鄉育教育基金會正式成立。" },
  {
    year: "2023",
    text: "與雙北、新竹、桃園、台中、嘉義、台南、高雄、花蓮等偏遠與非山非市地區高中，展開學習歷程講座與深度工作坊合作。",
  },
  {
    year: "2024",
    text: "新增苗栗、雲林區域偏遠高中合作；首次與國立成功大學合作，培訓大學院校學生成為高中生引導員。",
  },
  {
    year: "2025",
    text: "完成勸募字號申請，社會大眾開始能以小額捐款支持方案。與高雄師範大學事業經營學系合作，完成 16 週職涯探索選修課程。",
  },
  {
    year: "2026",
    text: "與青澀芷蘭協會合作，完成線上職涯探索課程，輔導經濟弱勢大學生；於成功大學、高雄師範大學完成 16 週選修課程；與成功大學教育研究所展開學術研究計畫合作。",
  },
] as const

/** 16 週螺旋課程設計（Programs / journey） */
export const spirals = [
  {
    title: "看見自己與團隊",
    weeks: "第 1–4 堂",
    question: "我是什麼樣的學習者與合作者？團隊如何從模糊主題中定義問題？",
    points: ["Holland Test 自我特質與職涯興趣", "PM 基礎心智：問題、目標、限制、利害關係人", "團隊契約與協作規範"],
  },
  {
    title: "把問題變成可執行專案",
    weeks: "第 5–8 堂",
    question: "如何把問題拆成目標、需求、任務與驗收標準？",
    points: ["使用者訪談與問題陳述", "Persona / Journey Map", "WBS / Kanban / 里程碑", "MVP 與驗收標準"],
  },
  {
    title: "用資料與回饋修正方案",
    weeks: "第 9–12 堂",
    question: "我們如何知道方案有效？如何用回饋做決策，而不是只靠喜好？",
    points: ["指標設計與使用者測試", "風險管理與優先順序", "企業案例分析", "黃金圈理論 Why / How / What"],
  },
  {
    title: "把專案成果轉成職場能力證據",
    weeks: "第 13–16 堂",
    question: "如何把學習歷程轉成可被企業理解的能力證明？",
    points: ["PM 簡報與 STAR 行為證據", "個人能力分析與職缺能力對應", "職場生存能力", "反思與下一步學習計畫"],
  },
] as const

/**
 * 能力螺旋四階段（首頁能力區塊）——依甲方 2026-06 會議提供之「四象限＋螺旋」示意圖。
 * 注意：四階段標籤與四大核心能力之「正式命名」皆為暫時詞，
 * 待鄉育內部確認後於此處一處替換（會議決議 D5）。
 * 色相暫依甲方示意圖（紫／紅／藍／青），若改用品牌延伸色僅需調整 hue。
 */
export const spiralPhases = [
  {
    key: "discover",
    title: "發現問題",
    label: "理解現況",
    text: "蒐集第一手資料，辨識來源、限制與偏誤，把現況看清楚。",
    hue: "#b87fe0",
  },
  {
    key: "define",
    title: "定義問題",
    label: "資訊重組",
    text: "把零散混亂的資訊重組分類，從中找出規律，洞察問題關鍵。",
    hue: "#f25c5c",
  },
  {
    key: "verify",
    title: "驗證問題",
    label: "實驗設計",
    text: "提出假設與驗證方法，同時衡量風險與限制，確保邏輯站得住。",
    hue: "#2f9df0",
  },
  {
    key: "design",
    title: "設計方案",
    label: "Case Study",
    text: "提出解決或改善方案，並把它說得讓不同對象都聽得懂。",
    hue: "#35c4b5",
  },
] as const

/**
 * 七大核心工作能力（approach / programs）
 * 課程文件原名「PM 七大核心能力」；對外標題避免 PM 職訓表述（見檔頭詞彙紀律第 2 條）。
 */
export const coreSkills = [
  "問題定義與分析能力",
  "使用者與利害關係人理解能力",
  "任務拆解與專案推進能力",
  "資訊辨識與整合能力",
  "協作與溝通能力",
  "反思與迭代能力",
  "個人職涯管理能力",
] as const

/** 使命三支柱（about / mission） */
export const missionPillars = [
  {
    no: "01",
    title: "教育機會支持與核心能力培育",
    text: "降低資源與資訊落差，強化青年內在學習動機，回應教育與職場的落差，協助每個青年展開屬於自己的舞台。",
    color: "primary",
  },
  {
    no: "02",
    title: "建立可追蹤的人才培育系統",
    text: "制定量化與質化評估系統，運用前後測驗數據與課程資料，形成可比較、可回饋、可累積的成長證據，作為學生、學校與企業共同評估語言。",
    color: "accent",
  },
  {
    no: "03",
    title: "共創多元價值與社會影響",
    text: "透過與企業、學校合作，幫助青年更早接觸真實世界的產業與職涯多元發展的可能性，創造社會、企業、基金會三贏的永續合作模式。",
    color: "primary",
  },
] as const

/** 未來就業核心能力（WEF《2025 未來就業報告》/ NACE） */
export const futureSkills = {
  intro:
    "根據世界經濟論壇（WEF）《2025 年未來就業報告》，2030 年預測全球將有 39% 的現有職場技能被淘汰或進入重大轉型。調查中超過 1,000 個企業雇主最重視的前十大核心技能，其中八項屬於軟實力，將是 AI 難以取代的關鍵。鄉育對標美國 NACE，全球公認的職業準備度指標（Career Readiness），賦能青年面對不斷快速變動的世界。",
  hard: 20,
  soft: 80,
  skills: [
    { zh: "動機與自我覺察", en: "Motivation & self awareness", soft: true },
    { zh: "創意思考", en: "Creative thinking", soft: true },
    { zh: "分析思考力", en: "Analytical thinking", soft: true },
    { zh: "韌性、彈性和適應力", en: "Resilience, flexibility and agility", soft: true },
    { zh: "好奇心與終身學習", en: "Curiosity and lifelong learning", soft: true },
    { zh: "領導與社群影響力", en: "Leadership and social influence", soft: true },
    { zh: "同理與主動傾聽", en: "Empathy and active listening", soft: true },
    { zh: "科技素養", en: "Technological literacy", soft: false },
    { zh: "人才管理", en: "Talent management", soft: true },
    { zh: "服務和客戶導向思維", en: "Service Orientation", soft: false },
  ],
} as const

/** 動態成長數位履歷（學習成果） */
export const digitalPortfolio = [
  { title: "專案成果簡報", meta: "同儕評分 4.5 / 5" },
  { title: "團隊協作會議紀錄", meta: "導師評分 4 / 5 分 + 評語" },
  { title: "六型人格測驗報告", meta: "興趣特質 + 溝通風格" },
  { title: "個人反思日誌", meta: "具體事件 + 感受 + 思考脈絡" },
  { title: "成長軌跡", meta: "2025/09 → 2026/06" },
] as const

/** 合作夥伴（Impact / partners） */
export const partners = {
  companies: ["雲豹能源", "雀客國際酒店集團", "iSKI 滑雪俱樂部", "MediaTek 聯發科", "Tesla Owners Taiwan", "CMMT 誠美材料科技"],
  schools: ["國立高雄師範大學", "國立清華大學", "國立成功大學"],
  ngos: ["青澀芷蘭協會"],
  counties: ["金門", "台北", "新北", "桃園", "新竹", "苗栗", "台中", "雲林", "嘉義", "台南", "高雄", "花蓮"],
} as const

/** 企業合作方案（Involve / corporate） */
export const corporateTiers = [
  {
    name: "種子教育夥伴",
    price: "10 萬",
    intro: "強化企業 ESG 影響力，建立品牌連結。",
    perks: ["年度成果報告掛名贊助", "官網企業專區品牌露出"],
  },
  {
    name: "永續影響力夥伴",
    price: "30 萬",
    intro: "含 10 萬方案全部內容。",
    perks: ["提供結案影響力報告", "培訓專案品牌掛名"],
  },
  {
    name: "品牌領航夥伴",
    price: "60 萬",
    intro: "含 30 萬方案全部內容。",
    perks: ["校園品牌專場講座 1–2 場", "鄉育人才資料庫使用權", "媒體合作曝光"],
  },
  {
    name: "未來人才戰略夥伴",
    price: "100 萬",
    intro: "雙向人才適配媒合，含 60 萬方案全部內容。",
    perks: ["人才作品與背景分析", "企業需求定義與適配比對", "JD 主動推送至符合條件人才", "專屬媒體新聞曝光"],
  },
] as const

// ─────────────────────────────────────────────────────────────
// 敘事層（尋路 Pathfinder）— 全站敘事骨架與內容頁資料
// 學生是找路的主角，鄉育是嚮導；詞彙紀律見檔頭。
// ─────────────────────────────────────────────────────────────

/** 路途語彙字典——全站 eyebrow／區塊標題由此取用，一處可改 */
export const journeyVocab = {
  mist: "迷霧",
  map: "地圖",
  walk: "走法",
  footprints: "足跡",
  company: "同行",
  depart: "啟程",
  camp: "紮營",
  arrive: "抵達",
} as const

/** 五段敘事弧——「尋路」的全站敘事骨架（programs/overview 章節與 impact hub 導覽共用） */
export const pathfinderActs = [
  {
    key: "mist",
    no: "01",
    waypoint: journeyVocab.mist,
    title: "為什麼需要尋路",
    lead: "當世界快速改變，青年越來越難回答「我要往哪裡去」。尋路，從承認迷霧開始。",
    href: "/about/mission",
  },
  {
    key: "map",
    no: "02",
    waypoint: journeyVocab.map,
    title: "這條路長什麼樣",
    lead: "認識自己、勇敢實踐、成為未來——三個階段，是一張可以按圖前進的地圖。",
    href: "/programs/overview",
  },
  {
    key: "walk",
    no: "03",
    waypoint: journeyVocab.walk,
    title: "路上怎麼前進",
    lead: "16 週的真實專案裡，四種能力像羅盤一樣螺旋循環——越用越熟，越走越深。",
    href: "/programs/journey",
  },
  {
    key: "footprints",
    no: "04",
    waypoint: journeyVocab.footprints,
    title: "走完留下什麼",
    lead: "走過的路會留下足跡：一份動態成長數位履歷，和一段說得出口的成長故事。",
    href: "/impact",
  },
  {
    key: "company",
    no: "05",
    waypoint: journeyVocab.company,
    title: "誰可以一起走",
    lead: "學生上路，大學開路，企業與捐款人陪走一段——這條路歡迎所有同行者。",
    href: "/involve",
  },
] as const

/**
 * 四幕學生故事——首頁 stories（取 act/q/a）與 impact/learning-story 完整版（取 detail/evidence）共用。
 * TODO：目前為通用文案，真實學生語錄與個案授權待基金會提供後替換。
 */
export const storyActs = [
  {
    act: "第一幕",
    q: "我原本是誰",
    a: "努力很多，卻不知道方向，也不確定自己適合什麼。",
    detail: [
      "「努力很多，但不知道方向」「害怕選錯」——這是多數學生走進課堂時的狀態：履歷上有成績與活動，心裡卻沒有一條看得見的路。",
      "尋路的第一步不是急著選，而是停下來，把「我是誰」看清楚。",
    ],
    evidence: [{ title: "六型人格測驗報告", meta: "興趣特質 + 溝通風格" }],
  },
  {
    act: "第二幕",
    q: "我嘗試了什麼",
    a: "認識自己的特質，投入真實專案，在團隊中練習解決問題。",
    detail: [
      "從測評認識自己的特質開始，接著走進真實專案：訪談真實的使用者、定義真實的問題，和隊友把模糊的題目拆成做得動的任務。",
      "路上會迷路、會卡關、會推翻重來——這些都是課程設計的一部分，因為真實世界就是這樣。",
    ],
    evidence: [{ title: "團隊協作會議紀錄", meta: "導師評分 4 / 5 分 + 評語" }],
  },
  {
    act: "第三幕",
    q: "我發現了什麼",
    a: "原來我的特質有它的位置；解決問題，是可以學會的能力。",
    detail: [
      "在一次次循環裡，學生開始看見：原來自己的特質在團隊裡有它的位置，原來「解決問題」不是天分，而是一套可以反覆練習的方法。",
      "迷霧不會一次散去，但羅盤已經在手上。",
    ],
    evidence: [{ title: "個人反思日誌", meta: "具體事件 + 感受 + 思考脈絡" }],
  },
  {
    act: "第四幕",
    q: "我走向了哪裡",
    a: "帶著有證據的成長履歷，更有底氣地面對下一步選擇。",
    detail: [
      "16 週結束時，留下的不是一張結業證書，而是一份動態成長數位履歷：專案成果、協作紀錄、測評報告與反思軌跡。",
      "媒合只是一種結果，選擇才是一種能力——抵達，同時是下一段路的啟程。",
    ],
    evidence: [
      { title: "專案成果簡報", meta: "同儕評分 4.5 / 5" },
      { title: "成長軌跡", meta: "2025/09 → 2026/06" },
    ],
  },
] as const

/** 第⑤段「同行」三分流（programs 區 CTA）——注意：與 audiences（/for/* 分眾頁）是不同層，勿混用 */
export const companions = [
  {
    key: "student",
    title: "我想走這條路",
    desc: "成為尋路計畫的學生，用 16 週把迷惘走成方向。",
    href: "/programs/apply",
    cta: "查看報名資訊",
  },
  {
    key: "university",
    title: "我想開這條路",
    desc: "把尋路計畫帶進校園，與我們共創課程與學分規劃。",
    href: "/programs/university",
    cta: "大學合作計畫",
  },
  {
    key: "corporate",
    title: "我想陪走一段",
    desc: "以企業導師與真實案例，成為青年路上的同行者。",
    href: "/programs/corporate",
    cta: "企業專班",
  },
] as const

/**
 * 累積數據頁（impact/data）——驗收清單指定本頁呈現 150+／2,500+／10+。
 * 兩套口徑（驗收清單 vs Sales Kit 2025/05）尚未統一：1,668 與 2,500+ 矛盾，
 * 本頁僅採驗收基準＋不衝突之 Sales Kit 數據，pending 標註待確認項，不混用、不杜撰。
 */
export const impactDataPage = {
  asOf: "2026-06",
  caliberNote:
    "本頁數據彙整自基金會累積統計與 Sales Kit（2025/05），統計口徑由基金會統一中；標註＊之數據以正式公告為準。",
  groups: [
    {
      title: "陪伴與課堂",
      stats: [
        { value: "2,500+", unit: "位", label: "累積陪伴學生", source: "基金會累積統計", pending: true },
        { value: "150+", unit: "堂", label: "累積課堂", source: "基金會累積統計", pending: true },
        { value: "106+", unit: "場", label: "課程與講座場次", source: "Sales Kit 2025/05", pending: false },
      ],
    },
    {
      title: "合作網絡",
      stats: [
        { value: "35+", unit: "所", label: "合作高中與大專院校", source: "Sales Kit 2025/05", pending: false },
        { value: "10+", unit: "家", label: "企業夥伴", source: "基金會累積統計", pending: false },
        { value: "12", unit: "縣市", label: "服務據點遍及全台", source: "Sales Kit 2025/05", pending: false },
      ],
    },
  ],
} as const

/** 報名資訊（programs/apply）——TODO：正式報名時程與表單連結待基金會提供，現階段導向 /contact */
export const applyInfo = {
  lead: "尋路計畫目前以大學合作選修課程為主要開課管道，並逐步拓展跨校與線上梯次。",
  eligibility: [
    "大專院校在學學生，年級與科系不限",
    "願意投入 16 週的真實專案實作與團隊協作",
    "不需要先備專案經驗——好奇心比履歷重要",
  ],
  schedule: [
    { label: "開課管道", value: "合作大學選修課程（如國立成功大學、國立高雄師範大學）" },
    { label: "課程長度", value: "16 週／一學期" },
    { label: "報名時程", value: "依各合作學校選課時程公告", pending: true },
  ],
  faq: [
    {
      q: "沒有任何專案經驗，可以報名嗎？",
      a: "可以。課程從「認識自己」開始，所有方法都會在 16 週裡一步步練習——好奇心與投入，比先備經驗重要。",
    },
    {
      q: "16 週會經歷什麼？",
      a: "你會和隊友一起完成一個真實專案：從訪談與定義問題開始，反覆驗證與修正，最後把成果發表出來。完整的走法請見「學習旅程」。",
    },
    {
      q: "課程結束後，我會留下什麼？",
      a: "一份動態成長數位履歷——包含專案成果、協作紀錄、測評報告與反思日誌，是你下一步選擇時拿得出手的成長證據。",
    },
    {
      q: "我的學校還沒有開課，怎麼辦？",
      a: "歡迎直接聯絡我們，或把「大學合作計畫」頁面轉給你學校的老師與系辦——每一條新路，都是這樣開出來的。",
    },
  ],
  formUrl: null as string | null,
} as const

/** 大學合作計畫（programs/university）——合作案例取自 milestones 既有事實 */
export const universityProgram = {
  lead: "把尋路計畫帶進校園——以 16 週選修課程為核心，與學校共創職涯探索的學習經驗。",
  offerings: [
    "16 週職涯探索選修課程：結合 SEL 社會情緒學習與 PBL 真實專案實作",
    "企業參訪與業師回饋，連結真實世界的產業現場",
    "動態成長數位履歷與前後測評估，課程成效可追蹤、可累積",
    "高中生引導員培訓等延伸合作模式",
  ],
  cases: [
    {
      org: "國立成功大學",
      years: "2024–2026",
      text: "自 2024 年起培訓大學生成為高中生引導員；完成 16 週職涯探索選修課程，並與教育研究所展開學術研究合作。",
    },
    {
      org: "國立高雄師範大學",
      years: "2025–2026",
      text: "與事業經營學系合作，完成 16 週職涯探索選修課程。",
    },
    {
      org: "青澀芷蘭協會（線上）",
      years: "2026",
      text: "合作開設線上職涯探索課程，陪伴經濟弱勢大學生跨越地域與資源限制。",
    },
  ],
  steps: ["初步洽談與需求盤點", "課程方案與學分規劃", "開課與共同帶領", "成效回顧與下學期規劃"],
} as const

/** 企業專班（programs/corporate）——合作方案金額沿用 corporateTiers（involve/corporate） */
export const corporateProgram = {
  lead: "企業不只是贊助者，更是青年路上的同行者——用真實的職場視角，陪青年走進真實世界。",
  mentorPoints: [
    "企業導師制度：以業界視角回饋學生的專案實作成果",
    "企業參訪與真實案例：讓學生提早接觸產業現場",
    "雙向人才適配：透過動態成長數位履歷，認識有實證的青年人才",
  ],
  flow: [
    { step: "01", title: "初步洽談", text: "了解企業的 ESG 目標與人才需求。" },
    { step: "02", title: "方案設計", text: "從四種合作方案出發，組合導師、參訪與媒合的深度。" },
    { step: "03", title: "走進課堂", text: "參與專案回饋與成果發表，陪學生走一段。" },
    { step: "04", title: "影響力回顧", text: "以結案報告與數據，看見投入創造的改變。" },
  ],
} as const

/** 團隊成員（about/team）——TODO：完整名單、董事會／顧問群與照片素材待基金會提供 */
export type TeamMember = { name: string; en?: string; title: string; bio?: string }
export const team: { note: string; members: TeamMember[]; board: TeamMember[]; advisors: TeamMember[] } = {
  note: "完整團隊名單與照片整理中，先為你介紹對外聯繫窗口。",
  members: [
    {
      name: "林妤蓁",
      en: "Kari Lin",
      title: "大學生培力專案督導",
      bio: "尋路計畫對外聯繫窗口。",
    },
  ],
  board: [],
  advisors: [],
}

/** 陪伴哲學四原則（about/approach）——依課程設計文件方法論整理 */
export const approachPrinciples = [
  {
    no: "01",
    title: "從「我是誰」出發",
    text: "職涯的起點不是職缺列表，而是自我理解。以國際測評與 SEL 社會情緒學習，先讓學生看清楚自己的特質、價值觀與在意的事。",
  },
  {
    no: "02",
    title: "真實世界是最好的教室",
    text: "用真實的 PBL 專案取代模擬練習：真實的使用者、真實的限制、真實的挫折，搭配企業導師的業界回饋，在做中學會解決問題。",
  },
  {
    no: "03",
    title: "螺旋式前進，不是直線闖關",
    text: "同一組核心能力在 16 週裡反覆使用，每一圈循環都比上一圈更深。學習不是闖關打勾，而是越走越穩的累積。",
  },
  {
    no: "04",
    title: "讓證據說話",
    text: "成長需要被看見。以前後測數據與動態成長數位履歷，把軟實力轉化為可比較、可累積、可被理解的成長證據。",
  },
] as const

/** 年度報告（impact/reports）——TODO：報告 PDF 待基金會提供後將 status 改為 available 並補 href */
export type ReportItem = { year: string; title: string; status: "preparing" | "available"; href?: string; note?: string }
export const reportsList: ReportItem[] = [
  { year: "2026", title: "2026 影響力報告", status: "preparing", note: "彙整中，預計年度結束後發布" },
  { year: "2025", title: "2025 年度成果報告", status: "preparing", note: "整理中" },
]

// ─────────────────────────────────────────────────────────────
// 資訊架構（IA）— 導覽列／Footer／sitemap 共用
// ─────────────────────────────────────────────────────────────

export type NavLink = { title: string; href: string; desc?: string; badge?: string; group?: string }
export type NavSection = { title: string; href: string; accent?: boolean; items: NavLink[] }

export const nav: NavSection[] = [
  {
    title: "關於我們",
    href: "/about",
    items: [
      { title: "使命與願景", href: "/about/mission", desc: "基金會使命與 Why Now" },
      { title: "創立故事", href: "/about/story", desc: "關鍵轉折與里程碑" },
      { title: "團隊成員", href: "/about/team", desc: "團隊、董事會與顧問群" },
      { title: "陪伴哲學", href: "/about/approach", desc: "我們的方法論" },
    ],
  },
  {
    title: "計畫",
    href: "/programs",
    items: [
      { title: "計畫總覽", href: "/programs/overview", desc: "三階段架構關係圖", group: "計畫架構" },
      { title: "學習旅程", href: "/programs/journey", desc: "16 週螺旋課程", group: "計畫架構" },
      { title: "認識自己", href: "/programs/know-yourself", desc: "第一階段：職涯原動力探詢", group: "三階段旅程", badge: "1" },
      { title: "勇敢實踐", href: "/programs/make-it-real", desc: "第二階段：跨界職場實戰", group: "三階段旅程", badge: "2" },
      { title: "成為未來", href: "/programs/become-your-future", desc: "第三階段：核心技能認證", group: "三階段旅程", badge: "3" },
      { title: "報名資訊", href: "/programs/apply", desc: "申請條件與常見問題", group: "參與管道" },
      { title: "大學合作計畫", href: "/programs/university", desc: "尋路計畫", group: "參與管道" },
      { title: "企業專班", href: "/programs/corporate", desc: "企業聯動培訓", group: "參與管道" },
    ],
  },
  {
    title: "影響力",
    href: "/impact",
    items: [
      { title: "累積數據", href: "/impact/data", desc: "服務成果一覽" },
      { title: "成果摘要", href: "/impact/outcomes", desc: "質化與量化成果" },
      { title: "學習成果故事", href: "/impact/learning-story", desc: "一段四幕的成長敘事" },
      { title: "合作夥伴", href: "/impact/partners", desc: "企業、大學與基金會" },
      { title: "年度報告", href: "/impact/reports", desc: "影響力白皮書下載" },
    ],
  },
  {
    title: "參與我們",
    href: "/involve",
    items: [
      { title: "捐款支持", href: "/involve/donate", desc: "小額捐款與捐款者權益" },
      { title: "企業合作", href: "/involve/corporate", desc: "合作提案與 Sales Kit" },
      { title: "學校合作", href: "/involve/university", desc: "校園合作提案入口" },
      { title: "徵才與志工", href: "/involve/careers", desc: "徵才、實習與志工招募" },
    ],
  },
  { title: "最新消息", href: "/news", items: [] },
  { title: "聯絡我們", href: "/contact", items: [] },
]

/** 分眾專區（互動入口方案 B：導覽列下拉；A 懸浮 bar／C 首頁觸發鈕保留為未來迭代） */
export const audiences: NavLink[] = [
  { title: "我是學生", href: "/for/students", desc: "找到屬於你的探索旅程" },
  { title: "我是企業", href: "/for/companies", desc: "連結未來人才與 ESG 影響力" },
  { title: "我是捐款人", href: "/for/donors", desc: "用支持改變一個青年的未來" },
  { title: "我是學校", href: "/for/universities", desc: "把職涯探索帶進校園" },
]

/** 範例最新消息（待 CMS／後台串接前之靜態資料） */
export type NewsItem = {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  body: string[]
}

export const news: NewsItem[] = [
  {
    slug: "ncku-pathfinder-2026",
    title: "尋路計畫於國立成功大學完成 16 週職涯探索選修課程",
    date: "2026-06-01",
    category: "計畫成果",
    excerpt: "結合 SEL 社會情緒學習與 PBL 專案實作，帶領大學生從「認識自己」走到「驗證自己」。",
    body: [
      "鄉育教育基金會「尋路計畫」於本學期在國立成功大學完成 16 週職涯探索選修課程。",
      "課程以大學生為核心，結合 SEL 社會情緒學習、PBL 專案實作、企業參訪與跨域能力培養，引導青年從「認識自己」到「驗證自己」，培養溝通表達、問題解決與自主學習等未來關鍵能力。",
    ],
  },
  {
    slug: "kari-online-program",
    title: "攜手青澀芷蘭協會，為經濟弱勢青年開設線上職涯探索課程",
    date: "2026-03-15",
    category: "夥伴合作",
    excerpt: "透過公益線上課程支持，降低地域與資源限制，提供經濟弱勢青年接觸自我探索與職涯發展的機會。",
    body: [
      "鄉育與青澀芷蘭協會合作，透過公益線上課程支持，提供經濟弱勢青年接觸自我探索、職涯發展與未來能力培養的機會。",
      "計畫降低地域與資源限制，協助建立學生自信、視野與對未來發展的可能性。",
    ],
  },
  {
    slug: "nknu-collaboration",
    title: "與高雄師範大學事業經營學系合作完成職涯探索課程",
    date: "2025-12-20",
    category: "計畫成果",
    excerpt: "鄉育對標美國 NACE 職業準備度指標，協助青年面對快速變動的世界。",
    body: [
      "鄉育與國立高雄師範大學事業經營學系合作，完成 16 週職涯探索選修課程。",
      "課程對標美國 NACE 全球公認的職業準備度指標（Career Readiness），聚焦 WEF《2025 未來就業報告》所列、AI 難以取代的八項軟實力。",
    ],
  },
]
