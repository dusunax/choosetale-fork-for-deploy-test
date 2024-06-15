/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  basePath: "/game",
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
