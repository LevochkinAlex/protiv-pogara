/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.inpb.pro' }],
        destination: 'https://inpb.pro/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
