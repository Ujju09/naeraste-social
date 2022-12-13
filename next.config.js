/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images-na.ssl-images-amazon.com", "images.ctfassets.net"],
  },
  experimental: {
    appDir: true,

  },
};

module.exports = nextConfig;
