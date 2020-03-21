const path = require('path');

module.exports = {
  poweredByHeader: false,
  webpack: config => {
    config.resolve.alias['@components'] = path.resolve(
      __dirname,
      './components',
    );
    return config;
  },
};
