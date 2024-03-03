/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.ibb.co"]
  },
  output: 'export',
  distDir: 'out'
};

export default nextConfig;
