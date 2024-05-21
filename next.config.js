/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh'
      },
      {
        protocol: 'https',
        hostname: 'oss.kaoyanvip.cn'
      }
    ]
  },
  sassOptions: {
    includePaths: ['./app'],
    prependData: `@import "~@styles/variables.scss";`
  }
};

module.exports = nextConfig;
