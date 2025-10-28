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
      }
    ],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'], // Include MDX extensions
};

export default withMDX({
  extension: /\.mdx?$/,
})(nextConfig);
