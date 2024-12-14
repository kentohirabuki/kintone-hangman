const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const KintonePlugin = require('@kintone/webpack-plugin-kintone-plugin');
const {pluginZipFilePath} = require('./webpack-utils');

module.exports = merge(common, {
  devtool: 'eval-source-map',
  plugins: [
    new KintonePlugin({
      manifestJSONPath: './plugin/manifest.json',
      privateKeyPath: './private.ppk',
      pluginZipPath: pluginZipFilePath,
    }),
  ],
});