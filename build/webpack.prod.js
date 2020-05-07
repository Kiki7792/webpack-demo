const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const devConfig = {
  mode: 'production',
  devtool: 'cheap-module-ource-map'
}

module.exports = merge(commonConfig, devConfig)