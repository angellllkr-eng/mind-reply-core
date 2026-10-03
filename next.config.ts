import type { NextConfig } from 'next';

const config: NextConfig = {
  // Optimization
  swcMinify: true,
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  // Build output
  output: 'standalone' as const,

  // Images optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: '*.vercel.app' as const,
      },
      {
        protocol: 'https' as const,
        hostname: '*.mind-reply.com' as const,
      },
      {
        protocol: 'https' as const,
        hostname: 'cdn.*.vercel.com' as const,
      },
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // Internationalization (if needed)
  i18n: {
    locales: ['en', 'de', 'fr'],
    defaultLocale: 'en' as const,
  },

  // Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control' as const,
            value: 'on' as const,
          },
          {
            key: 'X-Frame-Options' as const,
            value: 'SAMEORIGIN' as const,
          },
          {
            key: 'X-Content-Type-Options' as const,
            value: 'nosniff' as const,
          },
          {
            key: 'X-XSS-Protection' as const,
            value: '1; mode=block' as const,
          },
          {
            key: 'Referrer-Policy' as const,
            value: 'strict-origin-when-cross-origin' as const,
          },
          {
            key: 'Permissions-Policy' as const,
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control' as const,
            value: 'no-cache, no-store, must-revalidate' as const,
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/old-pricing' as const,
        destination: '/pricing' as const,
        permanent: true as const,
      },
    ];
  },

  // Rewrites
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/sitemap.xml' as const,
          destination: '/api/sitemap' as const,
        },
        {
          source: '/robots.txt' as const,
          destination: '/api/robots' as const,
        },
      ],
      afterFiles: [
        {
          source: '/api/v1/:path*' as const,
          destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/v1/:path*` as const,
        },
      ],
      fallback: [],
    };
  },

  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.optimization, {
        runtimeChunk: 'single' as const,
        splitChunks: {
          chunks: 'all' as const,
          cacheGroups: {
            default: false,
            vendors: false,
            vendor: {
              filename: 'chunks/vendor.js' as const,
              test: /node_modules/,
              priority: 10,
              reuseExistingChunk: true,
            },
            common: {
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      });
    }

    return config;
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ['@radix-ui/*', 'lucide-react'],
    optimizeCss: true,
    parallelServerCompiles: true,
    parallelServerBuildTraces: true,
    isrMemoryCacheSize: 52 * 1024 * 1024, // 52MB
    ppr: true,
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000' as const,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000' as const,
  },

  // Custom server config
  serverRuntimeConfig: {
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  },

  publicRuntimeConfig: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  // NOTE: Sentry wrapper removed from this branch.
  // Root cause: next.config.ts imported withSentryConfig from '@sentry/nextjs', but
  // that package is absent from package.json and the pnpm lockfile. Every Vercel
  // build failed with MODULE_NOT_FOUND during next.config.ts load, so production
  // has been red across the last 10+ deployments (PRs #101, #105, x31-worktree).
  //
  // Two paths forward (owner decision required):
  // 1. Add @sentry/nextjs as a real dependency and regenerate the lockfile.
  // 2. Keep this guard and re-enable Sentry only when the DSN/auth token exist.
  //
  // The previous withSentryConfig(...) call is preserved below as a commented
  // reference so the Sentry org/project settings are not lost.
  //
  // import { withSentryConfig } from '@sentry/nextjs';
  // const withSentry = withSentryConfig(config, {
  //   org: 'mind-reply', project: 'mind-reply-core', silent: true,
  //   widenClientFileUpload: true, tunnelRoute: '/monitoring', disableLogger: true,
  //   autoSessionTracking: true,
  // });
  // export default withSentry;

  return config;

  // Legacy Sentry settings (kept for reference):
  // org: 'mind-reply', project: 'mind-reply-core', silent: true,
  // widenClientFileUpload: true, tunnelRoute: '/monitoring', disableLogger: true,
  // autoSessionTracking: true,
};

export default config;
