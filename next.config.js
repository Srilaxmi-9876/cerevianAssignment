/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove standalone for Render compatibility
  // output: 'standalone',
  api: {
    bodyParser: false,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Optimize for production
  swcMinify: true,
  // Ensure CSS is properly generated
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Ensure proper asset handling
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

