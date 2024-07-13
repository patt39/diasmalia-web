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
    domains: ['images.unsplash.com', 'cdn.rareblocks.xyz'], // Add the domain(s) you want to allow
  },
};

export default nextConfig;
