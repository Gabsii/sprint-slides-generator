const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  target: "experimental-serverless-trace", // necessary for mysql binaries
  poweredByHeader: false,
  webpack: config => {
    config.resolve.alias['@components'] = path.resolve(
      __dirname,
      './components',
    );
    config.resolve.alias['@utils'] = path.resolve(
      __dirname,
      './utils',
    );
    return config;
  },
});
