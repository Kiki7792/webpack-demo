const Webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const devConfig = {
  mode: 'development', // 默認是生產環境production, else 的development, 打包的文件不會被壓縮, dev默認沒有treeShaking功能
  devtool: 'cheap-module-eval-source-map',
  // devServer--webpack-dev-server
  devServer: {
    // 告知webpack-dev-server，将dist目录下的资源作为server可访问文件
    contentBase: './dist',
    // 打包完成后自动帮我们打開並訪問浏览器
    open: true,
    // 服务器端口号，默认8080
    port: 8000,
    // true支持熱更新
    hot: true
  },
  // plugin可以在webpack運行到某個時刻的時候, 幫你做一些事情, 類似hook生命周期函數
  plugins: [
    // webpack自帶的熱更新插件
    new Webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true // tree-shaking在dev mode下使用只打包引用的function
  }
}
module.exports = merge(commonConfig, devConfig)