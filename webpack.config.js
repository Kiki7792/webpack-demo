/**
 * HtmlWebpackPlugin 會在打包結束後, 自動生成一個html文件,
 * 并把打包生成的js文件自動引入到這個html文件中
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path') // node核心模塊

module.exports = {
  mode: 'development', // 默認是生產環境production, else 的development
  // entry:  './src/index.js', // entry可以只寫 Strig || Object
  entry: {
    main:  './src/index.js', // 打包index.js 默認生成的文件名是main.js
    sub:  './src/index.js', // 打包index.js 默認生成的文件名是main.js
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
      } ,
      { // 校驗css規則
        test: /\.scss$/,
        use:  [
          'style-loader', 
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
      { // 打包字體文件
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  output: { // 打包輸出的路徑
    publicPath: 'http://cdn.com.cn', // dist->index.html注入的js文件默認就會帶上publicPath
    // filename: 'bundle.js', // 打包後的文件名
    filename: '[name].js', // 打包後的文件名, [name]佔位符, 最終就是替代entry裏的main & sub
    path: path.resolve(__dirname, 'dist') // 打包的文件所在的文件夾名稱, __dirname指webpack.config.js所在的文件夾路徑
  },
  // plugin可以在webpack運行到某個時刻的時候, 幫你做一些事情, 類似hook生命周期函數
  plugins: [
    // 打包之後運行HtmlWebpackPlugin
    new HtmlWebpackPlugin({
      // template: `./src/index.html`
      template: `src/index.html`
    }),
    // 打包之前 會使用CleanWebpackPlugin插件清除 dist目錄
    new CleanWebpackPlugin()
  ]
}