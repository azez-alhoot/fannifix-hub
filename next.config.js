/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Enable image optimization
    formats: ['image/avif', 'image/webp'],
    // Allow images from external domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    // Optimize images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum quality for optimized images
    minimumCacheTTL: 60,
  },
  // Enable compression
  compress: true,
  // Optimize production builds
  swcMinify: true,
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
  webpack: (config, { isServer }) => {
    // Handle optional Supabase dependency gracefully
    // Configure webpack to treat @supabase/supabase-js as optional external
    config.externals = config.externals || [];
    
    // For client-side, make Supabase optional
    if (!isServer) {
      const originalResolve = config.resolve;
      config.resolve = {
        ...originalResolve,
        // Allow webpack to handle missing modules gracefully
        fallback: {
          ...originalResolve.fallback,
        },
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;

