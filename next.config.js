/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/Survey',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig