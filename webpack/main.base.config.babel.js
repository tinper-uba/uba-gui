import { resolve } from 'path';
import semverRegex from 'semver-regex';
import { devDependencies } from './../package.json';

const electronVersion = semverRegex().exec(devDependencies.electron)[0];

export default {
  context: resolve(__dirname, '..'),
  entry: {
    main: './src/main/index.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: resolve(__dirname, '../src'),
      loader: 'babel-loader',
      options: {
        babelrc: false,
        presets: [
          ['env', { targets: { electron: electronVersion }, modules: false }],
          'stage-2',
        ]
      }
    }]
  },
  output: {
    path: resolve(__dirname, '../app'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      main: resolve(__dirname, "../src/main/")
    }
  },
  target: 'electron-main'
};
