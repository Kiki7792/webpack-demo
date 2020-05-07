## devlopment中支持 tree-shaking
所謂的tree-shaking 就是爲了打包壓縮只打包import的code, 沒有使用的export不引入

webpack.config.js中是dev模式, 有需要支持tree-shaking, 去除打包中沒有使用到的export
可在webpack.config.js mode同級新增

```javascript
optimization: {
  usedExports: true // tree-shaking在dev mode下使用只打包引用的function
}
```


webpack.config.js中是production模式, 默認支持tree-shaking, 不需要額外寫入optimization

無論是dev還是pro, 都需要在package.json中新增
"sideEffects": false
如果文件有引入@babel/polyfill 或者*.css文件
需要配置"*

```javascript
"sideEffects": [
  "*.css",
  "@babel/polyfill"
]
```



## development和Production模式的區分打包
webpack.config.js 拆分成 dev/prod/common 三隻文件
修改packgae.json

```javascript
"scripts": {
    "dev": "webpack-dev-server --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
}
```

  

安裝npm i webpack-merge -D 合并common到dev/prod上去
以webpack.prod.js爲例

```javascript
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const devConfig = {
    mode: 'production',
    devtool: 'cheap-module-ource-map'
}

module.exports = merge(commonConfig, devConfig)
```

  


