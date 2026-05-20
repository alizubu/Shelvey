/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  experimental: { serverComponentsExternalPackages: ["mongoose"] },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
