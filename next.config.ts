import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fedskillstest.ct.digital',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
