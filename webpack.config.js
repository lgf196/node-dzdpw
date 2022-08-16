'use strict';
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
/**
 * @author lgf
 * @description 取出package.json中的生产依赖，你进行打包
 */
const _externals = () => {
  let manifest = require('./package.json');
  let dependencies = manifest.dependencies;
  let externals = {};
  for (let p in dependencies) {
    externals[p] = 'commonjs ' + p;
  }
  // console.log('externals', externals);
  return externals;
};
let externals = _externals();
module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: externals,
  node: {
    global: true,
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './package.json'),
        },
        {
          from: path.resolve(__dirname, './package-lock.json'),
        },
        {
          from: path.resolve(__dirname, './public'),
          to: 'public',
        },
      ],
    }),
  ],
};
