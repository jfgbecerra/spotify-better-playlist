/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    optimizePackageImports: ['package-name'],
  },
};

module.exports = nextConfig;
