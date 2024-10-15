/** @type {import('next').NextConfig} */
const nextConfig = { 
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        hostname:"avatars.githubusercontent.com",
      },
    ],
  },};

export default nextConfig