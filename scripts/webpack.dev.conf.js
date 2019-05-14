const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
console.log(__dirname)
const devConfig = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '/dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '/dist'),
    port: 9000,
    compress: true,
  }
}

module.exports = merge(baseConfig, devConfig)