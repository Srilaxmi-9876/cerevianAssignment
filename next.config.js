/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: false,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
}

module.exports = nextConfig

