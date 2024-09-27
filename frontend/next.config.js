/* @type {import('next').NextConfig}
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
 */
/* */

const path = require('path');
const allowedImageWordPressDomain = new URL(process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL).hostname;

module.exports = {
  trailingSlash: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [allowedImageWordPressDomain, 'via.placeholder.com'],
  },
}; 