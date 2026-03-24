/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use Webpack for stability as requested. Turbopack is disabled by not using --turbo.
  serverExternalPackages: ['playwright-core', '@sparticuz/chromium'],
  // Transpile packages if necessary
  transpilePackages: ['lucide-react'],
};

export default nextConfig;
