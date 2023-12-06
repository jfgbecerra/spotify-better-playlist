/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['package-name'],
  },
};

module.exports = nextConfig;
