const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtratPlugin = require("mini-css-extract-plugin");
const OptimizaCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "../src/js/index.js"),
    print: path.resolve(__dirname, "../src/js/print.js")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css/,
        use: [{ loader: MiniCssExtratPlugin.loader }, "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss/,
        use: [{ loader: MiniCssExtratPlugin.loader }, "css-loader", "sass-loader", "postcss-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash:7].[ext]",
              publicPath: "./images",
              outputPath: "images"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash:7].[ext]",
              outputPath: "font"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    }),
    new HtmlWebpackPlugin({
      filename: "list.html",
      template: "./src/list.html",
      chunks: ["print"]
    }),
    new MiniCssExtratPlugin({
      filename: "css/[name].css"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      _: "lodash"
    })
  ],
  optimization: {
    minimizer: [new OptimizaCssAssetsWebpackPlugin()],
    splitChunks: {
      chunks: "all",
      minSize: 0,
      minChunks: 1,
      cacheGroups: {
        loadash: {
          test: /lodash/,
          chunks: "all",
          name: "lodash"
        },
        jquery: {
          test: /jquery/,
          chunks: "all",
          name: "jquery",
          priority: 10
        },
        vendors: {
          test: /[\\/]node_modules[\\/]((?!(lodash|jquery))*.)[\\/]/,
          chunks: "all",
          name: "vendors",
          priority: 10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "../dist")
  }
};
