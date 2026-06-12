// 靜態輸出用的 image loader：unoptimized 模式下 next/image 不會自動加 basePath，
// 這裡補上前綴，讓 GitHub Pages 子路徑部署的圖片路徑正確。
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

export default function imageLoader({ src }) {
  return src.startsWith("/") ? `${basePath}${src}` : src
}
