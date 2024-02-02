/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WS_URL: process.env.WS_URL,
  },
};

export default nextConfig;
