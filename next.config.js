/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["images.clerk.dev", 'loremflickr.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      { protocol: "https", hostname: "uploadthing.com" },
    ],
  },
};

module.exports = nextConfig;
