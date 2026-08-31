import withMDX from '@next/mdx';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vaibhavkothari.gallerycdn.vsassets.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'appwrite.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'devfolio.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.devfolio.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        pathname: '/**',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'], // Include MDX extensions

  /**
   * The Vercel deployment host served the whole site at 200 alongside the real
   * domain — a full duplicate of every page. The canonical tags pointed home,
   * but a redirect removes the duplicate outright instead of asking Google to
   * discount it. Preview deployments are unaffected: they get generated
   * hostnames, not this exact one.
   */
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'vaibhavkothari.vercel.app' }],
        destination: 'https://vaibhavkothari.me/:path*',
        permanent: true,
      },
    ];
  },
};

export default withMDX({
  extension: /\.mdx?$/,
})(nextConfig);
