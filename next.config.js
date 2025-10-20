/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/healthcheck',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig