const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

//解析路径
function resolvePath(filename) {
  return path.resolve(__dirname, filename)
}

module.exports = {
  entry: {
    index: resolvePath('../index.js')
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
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'  //解决在css中图片不显示问题
            }
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
          },
          //将全局scss在局部文件中不引入也可以引用相关的变量，函数
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './src/assets/style/index.scss'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        use: [
          //图片加载loader
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              limit: 30000, //小于20k,转为base64
              outputPath: 'assets/images',
            }
          },
          //图片压缩
          {
            loader: 'image-webpack-loader',
            options: {
              //jpg/jpeg
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              //png
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 8192, // fonts file size <= 5KB, use 'base64'; else, output svg file
              // publicPath: 'asssets/font/',
              outputPath: 'asssets/font/'
            }
          }
        ]
      },
      //配置中存在html-loader时，会导致在生成html 模版时<%= htmlWebpackPlugin.options.title %>作为字符串不会被编译
      //或者使用ejs

      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: 'html-loader',
      //       options: {
      //         attrs: ['img:src']
      //       }
      //     }
      //   ]
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      // {
      //   from: 'src/assets/images',
      //   to: 'assets/images'
      // },
      // {
      //   from: 'src/assets/font',
      //   to: 'assets/font'
      // },
      {
        from: 'src/assets/style',
        to: 'assets/css'
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
          chunks: 'initial',
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
    extensions: ['.js', 'jsx', '.json', '.css', 'scss', 'sass', 'less'],
    alias: {
      pages: resolvePath('../src/pages'),
      assets: resolvePath('../src/assets'),
      components: resolvePath('../src/components'),
      utils: resolvePath('../src/utils'),
      services: resolvePath('../src/services'),
      layouts: resolvePath('../src/layouts'),
      router: resolvePath('../src/router')
    }
  }
}
