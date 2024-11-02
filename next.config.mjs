/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'antd',
    '@ant-design',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-notification',
    'rc-tooltip',
    'rc-tree',
    'rc-table',
  ],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'diasmalia-buck.s3.eu-central-1.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'cdn.rareblocks.xyz',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
