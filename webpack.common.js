const path = require('path');

module.exports = {
  entry: {
    desktop: './src/route.js',
    config: './src/config.js',
    // mobile: './src/route.js',
  },
  output: {
    path: path.resolve(__dirname, 'plugin', 'js'),
    filename: '[name].js',
  },
  externals: [
    {
      jquery: 'jQuery',
    },
  ],
};
