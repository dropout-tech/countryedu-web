// GitHub Pages 部署在 https://<org>.github.io/countryedu-web/ 子路徑下，
// 由 CI 注入 NEXT_PUBLIC_BASE_PATH；本機開發與未來搬遷（Vercel 等）不受影響。
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    loader: "custom",
    loaderFile: "./image-loader.js",
  },
}

export default nextConfig
