/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use Webpack for stability as requested. Turbopack is disabled by not using --turbo.
  serverExternalPackages: ['playwright-core', '@sparticuz/chromium'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  transpilePackages: ['lucide-react'],
};

export default nextConfig;
