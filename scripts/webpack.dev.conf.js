const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.conf");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devConfig = {
  mode: "development",
  output: {
    // publicPath: "/",
    filename: "js/[name].js",
    chunkFilename: "js/[name].js"
  },
  devtool: "inline-source-map",
  devServer: {
    index: "falsy",
    contentBase: path.join(__dirname, "/dist"),
    port: 9000,
    compress: true,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "https://shop98.lianwifi.com/index.php/topapi",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "react-llt",
      filename: "index.html",
      template: path.resolve(__dirname, "../src/index.html"),
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].css"
    })
  ]
};

module.exports = merge(baseConfig, devConfig);
