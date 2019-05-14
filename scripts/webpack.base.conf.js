const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

//解析路径
function resolvePath(filename) {
  return path.resolve(__dirname, filename)
}

module.exports = {
  entry: {
    index: resolvePath('../src/index.js')
  },
  output: {
    // path: path.resolve(__dirname, '../dist/js')
  },
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2 // 在一个 css 中引入了另一个 css，也会执行之前两个 loader，即 postcss-loader 和 sass-loader
            }
          },
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')
              ]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react-llt',
      filename: 'index.html',
      template: resolvePath('../src/index.html'),
      inject: true
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: '../src/assets/images',
        to: 'images'
      },
      {
        from: '../src/assets/font',
        to: 'font'
      },
      {
        from: '../src/assets/style',
        to: 'css'
      }
    ])
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      name: true,
      cacheGroups: {
        commons: {
          name: 'commons',
          minSize: 0, //表示在压缩前的最小模块大小,默认值是 30kb
          minChunks: 2, // 最小公用次数
          priority: 5, // 优先级
          reuseExistingChunk: true // 公共模块必开启
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          priority: -10,
          // filename: '[name].bundle.js'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    // runtimeChunk: {
    //   name: entrypoint => `runtime~${entrypoint.name}`
    // }
  },
  resolve: {
    extensions: ['.js', 'jsx', '.json', '.css', 'scss', 'sass'],
    alias: {
      pages: resolvePath('../src/pages'),
      assets: resolvePath('../src/assets'),
      components: resolvePath('../src/components'),
      utils: resolvePath('../src/utils'),
      services: resolvePath('../src/services'),
    }
  }
}
