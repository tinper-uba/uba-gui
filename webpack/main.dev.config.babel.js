import * as webpack from 'webpack';
import webpackMerge from 'webpack-merge';

import base from './main.base.config.babel';

export default webpackMerge(base, {
  plugins: [
    new webpack.DefinePlugin({
      '__isDev__': JSON.stringify(true)
    }),
    new webpack.NamedModulesPlugin()
  ],
});
