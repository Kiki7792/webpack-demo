const path = require('path') // node核心模塊

module.exports = {
  mode: 'development', // 默認是生產環境production, else 的development
  entry: './src/index.js', // 打包的是那支文件velopment
  module: { // 模塊
    rules: [{ // 校驗規則
      test: /\.jpg$/,
      use: {
        loader: 'file-loader' // 需要安裝 打包圖片/txt/等
      }
    }]
  },
  output: { // 打包輸出的路徑
    filename: 'bundle.js', // 打包後的文件名
    path: path.resolve(__dirname, 'dist') // 打包的文件所在的文件夾名稱, __dirname指webpack.config.js所在的文件夾路徑
  }
}