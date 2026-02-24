/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "portfolio";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  experimental: { optimizePackageImports: ["framer-motion", "lucide-react"] }
};

export default nextConfig;
