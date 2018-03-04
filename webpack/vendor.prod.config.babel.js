import { resolve } from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import * as webpack from 'webpack';

const vendors = [
  'react',
  'react-dom',
  'babel-polyfill',
];

export default {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    vendor: vendors,
  },
  output: {
    path: resolve(__dirname, '../app/renderer'),
    filename: '[name].js',
    library: '[name]_[hash]',
  },
  plugins: [
    new CleanWebpackPlugin(['app/renderer/vendor.js', 'app/renderer/vendor-manifest.json'], { root: resolve(__dirname, '..') }),
    new webpack.DllPlugin({
      path: resolve(__dirname, '../app/renderer/[name]-manifest.json'),
      name: '[name]_[hash]',
    }),
  ],
};
