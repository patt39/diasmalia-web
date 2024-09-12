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
  // images: {
  //   domains: [
  //     'images.unsplash.com',
  //     'cdn.rareblocks.xyz',
  //     'https://diasmalia-buck.s3.eu-central-1.amazonaws.com',
  //   ], // Add the domain(s) you want to allow
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'diasmalia-buck.s3.eu-central-1.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
