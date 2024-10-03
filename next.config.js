/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "i.pinimg.com", "images.pexels.com"],
    // remotePatterns: ["lh3.googleusercontent.com"],
  },
  rewrites: async () => {
    return [
      {
        source: "/api/flask/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:5000/:path*"
            : "/api/flask/",
      },
    ];
  },
};

module.exports = nextConfig;
