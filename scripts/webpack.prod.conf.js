const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

const prodConfig = {
  mode: 'production',
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, '/dist')
  },
}

module.exports = merge(baseConfig, prodConfig)