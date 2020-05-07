## devlopment中支持 tree-shaking
所謂的tree-shaking 就是爲了打包壓縮只打包import的code, 沒有使用的export不引入

webpack.config.js中是dev模式, 有需要支持tree-shaking, 去除打包中沒有使用到的export
可在webpack.config.js mode同級新增
  optimization: {
    usedExports: true // tree-shaking在dev mode下使用只打包引用的function
  }
webpack.config.js中是production模式, 默認支持tree-shaking, 不需要額外寫入optimization


無論是dev還是pro, 都需要在package.json中新增
"sideEffects": false
如果文件有引入@babel/polyfill 或者*.css文件
需要配置"sideEffects": [
  "*.css",
  "@babel/polyfill"
]

