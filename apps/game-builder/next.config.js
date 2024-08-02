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
    const prodRewrites = [];

    return process.env.NODE_ENV === "production" ? prodRewrites : devRewrites;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
      },
    ],
  },
};

module.exports = nextConfig;
