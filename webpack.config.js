const path = require('path') // node核心模塊

module.exports = {
  mode: 'development', // 默認是生產環境production, else 的development
  entry: './src/index.js', // 打包的是那支文件velopment
  module: { // 模塊
    rules: [{ // 校驗規則
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
    }]
  },
  output: { // 打包輸出的路徑
    filename: 'bundle.js', // 打包後的文件名
    path: path.resolve(__dirname, 'dist') // 打包的文件所在的文件夾名稱, __dirname指webpack.config.js所在的文件夾路徑
  }
}