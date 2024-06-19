/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  assetPrefix: "https://choosetale-game.vercel.app",
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/game",
      },
      {
        source: "/story",
        destination: "https://choosetale-storybuilder.vercel.app",
      },
      {
        source: "/story/:path*",
        destination: "https://choosetale-storybuilder.vercel.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
