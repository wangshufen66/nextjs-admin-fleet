/** @type {import('next').NextConfig} */
import withAntdLess from 'next-plugin-antd-less';

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
      }
    ]
  }
};
export default withAntdLess(nextConfig);

// module.exports = withAntdLess(nextConfig);
