import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'prod.spline.design' },
    ],
  },
  transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],
}

export default nextConfig
