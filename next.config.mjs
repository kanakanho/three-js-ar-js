/** @type {import('next').NextConfig} */
import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

export default withPWA({
  //next.js config
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
});
