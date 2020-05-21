const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // css分割
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin") // 压缩css
const WorkboxPlugin = require('workbox-webpack-plugin') // 处理PWA

const devConfig = {
  mode: 'production',
  devtool: 'cheap-module-ource-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css", // 直接被index.html link引用 使用filename
      chunkFilename: "[name].chunk.css" /// else 间接引用的file
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }) // SW: service worker
  ],
  module: {
    rules: [
      { // 校驗scss規則
        test: /\.scss$/,
        use:  [
          MiniCssExtractPlugin.loader, 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 保證index.scss裏引入的其他scss文件也會執行postcss&sass兩個loader文件
              // modules: true // 開啓CSS MODULE
            }
          },
          'sass-loader',
          'postcss-loader'
        ] // loader是從下到上, 從右到左的執行順序
      },
      { // 校驗css規則
        test: /\.css$/,
        use:  [
          MiniCssExtractPlugin.loader, 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, // 保證index.scss裏引入的其他scss文件也會執行postcss&sass兩個loader文件
              // modules: true // 開啓CSS MODULE
            }
          },
          'postcss-loader'
        ] // loader是從下到上, 從右到左的執行順序
      }
    ]
  },
  output: { // 打包輸出的路徑
    // publicPath: 'http://cdn.com.cn', // dist->index.html注入的js文件默認就會帶上publicPath
    filename: '[name].[contenthash].js', // index.js走filename
    chunkFilename: '[name].[contenthash].chunk.js', // 间接引入的库lodash就走chunkFilename
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  }
}

module.exports = merge(commonConfig, devConfig)