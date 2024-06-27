/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  async rewrites() {
    return [
      {
        source: "/game",
        destination: "https://choosetale-gamebuilder.vercel.app",
      },
      {
        source: "/game/:path*",
        destination: "https://choosetale-gamebuilder.vercel.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
