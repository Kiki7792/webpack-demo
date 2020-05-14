/**
 * HtmlWebpackPlugin 會在打包結束後, 自動生成一個html文件,
 * 并把打包生成的js文件自動引入到這個html文件中
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path') // node核心模塊
const webpack = require('webpack')
const merge = require('webpack-merge')
const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')

const commonConfig = {
  entry: {
    main:  './src/index.js' // 打包index.js 默認生成的文件名是main.js
  },
  module: { // 模塊
    rules: [
      { // img 校驗規則
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader', // 需要安裝 打包圖片/txt/等
          options: {
            // placeholder 佔位符
            name: '[name].[ext]', // 與打包前的名字和後綴名一樣
            // name: '[name]_[hash].[ext]', // 與打包前的名字和後綴名一樣, 名字後面加上hash
            outputPath: 'images/', // 將圖片打包到dist文件夾下的images文件夾裏
            limit: 2048 // 小於2Kb 打包在bundle.js中以base64展示, 大於2kb就打包在dist/images文件夾下
          }
        }
      },
      { // 打包字體文件
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader'
        }
      },
      { // babel-loader轉換ES6變成瀏覽器可識別的ES5語法
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules 不使用babel
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'imports-loader?this=>window' // 如果使用imports-loader this指向window, 不指向当前模块的对象
          }
        ]
      }
    ]
  },
  output: { // 打包輸出的路徑
    // publicPath: 'http://cdn.com.cn', // dist->index.html注入的js文件默認就會帶上publicPath
    // path: path.resolve(__dirname, 'dist') // 打包的文件所在的文件夾名稱, __dirname指webpack.config.js所在的文件夾路徑
    path: path.resolve(__dirname, '../dist') // 打包的文件所在的文件夾名稱, __dirname指webpack.config.js所在的文件夾路徑
  },
  // plugin可以在webpack運行到某個時刻的時候, 幫你做一些事情, 類似hook生命周期函數
  plugins: [
    // 打包之後運行HtmlWebpackPlugin
    new HtmlWebpackPlugin({
      // template: `./src/index.html`
      template: `src/index.html`
    }),
    // 打包之前 會使用CleanWebpackPlugin插件清除 dist目錄
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery', // 发现模块中有$字符串, 就自动引入jquery
      // _: 'lodash'
      _join: ['lodash', 'join'] // 使用lodash里的join
    })
  ],
  performance: false, // 解決打包文件大於244kb false: 即不需要檢測性能問題
  optimization: {
    runtimeChunk: { // 配置瀏覽器緩存 manifest 溝通js與js之間的關係 都放在runtime裏
      name: 'runtime'
    },
    usedExports: true, // tree-shaking
    splitChunks: {
      chunks: 'all', // async只对异步代码有效, all对同步异步都有效, initial只对同步代码有效
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors' // chunk的name
        }
      }
    }
  }
}

module.exports = (env) => {
  if (env && env.production) {
    // 生产环境
    return merge(commonConfig, prodConfig)
  } else {
    // 开发环境
    return merge(commonConfig, devConfig)
  }
}