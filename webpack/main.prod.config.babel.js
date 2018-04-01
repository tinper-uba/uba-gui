import { resolve } from 'path';
import MinifyPlugin from 'babel-minify-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import * as webpack from 'webpack';
import webpackMerge from 'webpack-merge';

import base from './main.base.config.babel';

export default webpackMerge(base, {
  bail: true,
  plugins: [
    new webpack.DefinePlugin({
      '__isDev__': JSON.stringify(false),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CleanWebpackPlugin(['app/main.js'], { root: resolve(__dirname, '..') }),
    //new MinifyPlugin()
    // new webpack.optimize.UglifyJsPlugin()
  ],
});
