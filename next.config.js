const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const exports = {
  target: 'serverless',
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
};

module.exports = process.env.NODE_ENV === 'production' ? exports :  withBundleAnalyzer(exports);
