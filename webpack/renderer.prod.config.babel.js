import { resolve } from 'path';
import MinifyPlugin from 'babel-minify-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import webpackMerge from 'webpack-merge';

import base from './renderer.base.config.babel';
import manifest from '../app/renderer/vendor-manifest.json';

export default webpackMerge(base, {
  bail: true,
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        // exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: false,
                importLoaders: 2,
                minimize: true,
                sourceMap: true
              },
            },
            'less-loader'
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__isDev__': JSON.stringify(false),
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.DllReferencePlugin({
      manifest
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      logLevel: 'error',
    }),
    new CleanWebpackPlugin(['app/renderer'], { root: resolve(__dirname, '..'), exclude: ['vendor.js', 'vendor-manifest.json']}),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve(__dirname, '../static/index.ejs'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      isProd: true,
    }),
    new MinifyPlugin()
  ],
});
