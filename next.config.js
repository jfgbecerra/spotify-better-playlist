/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['package-name'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.scdn.co',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.spotifycdn.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
