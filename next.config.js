/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    domains: ['localhost', 'via.placeholder.com', 'images.unsplash.com'],
  },
  webpack: (config, { isServer }) => {
    // Improve chunk loading reliability
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
      }
    }
    return config
  },
  // Reduce timeout issues
  experimental: {
    optimizePackageImports: ['@/components', '@/contexts'],
  },
}

module.exports = nextConfig