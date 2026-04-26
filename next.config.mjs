/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'psiandriellyoliveira.com.br',
      },
    ],
  },
};

export default nextConfig;
