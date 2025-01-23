import withMDX from '@next/mdx';

const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'i.ibb.co'], // Add other domains as needed
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'], // Include MDX extensions
};

export default withMDX({
  extension: /\.mdx?$/,
})(nextConfig);
