/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Static HTML in `out/` — deploy to Cloudflare Pages, Netlify, S3, etc. */
  output: "export",
  images: {
    /** Required for `output: "export"` (no built-in image optimizer in static hosting). */
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
