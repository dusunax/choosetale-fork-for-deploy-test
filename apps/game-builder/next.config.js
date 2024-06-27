/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://choosetale-gamebuilder.vercel.app"
      : "",
  async rewrites() {
    const devRewrites = [
      {
        source: "/game",
        destination: "/",
      },
      {
        source: "/game/:path*",
        destination: "/:path*",
      },
    ];

    return process.env.NODE_ENV === "production" ? prodRewrites : devRewrites;
  },
};

module.exports = nextConfig;
