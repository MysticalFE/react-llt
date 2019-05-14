const merge = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

console.log(path.resolve(__dirname, '../dist/css'))

const prodConfig = {
  mode: 'production',
  output: {
    filename: 'js/bundle.[hash].js',
    chunkFilename: 'js/[id].[hash].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash].css',
      chunkFilename: 'css/..[id]-[contenthash].css',
      // path: path.resolve(__dirname, '../dist/css')
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g, //一个正则表达式，指示应优化/最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
      cssProcessor: require('cssnano'), //用于优化\最小化 CSS 的 CSS处理器，默认为 cssnano
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给 cssProcessor 的选项，默认为{}
      canPrint: true //一个布尔值，指示插件是否可以将消息打印到控制台，默认为 true
    })
  ]
}

module.exports = merge(baseConfig, prodConfig)