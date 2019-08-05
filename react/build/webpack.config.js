const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CSSSplitWebpackPlugin = require("css-split-webpack-plugin").default;
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const { appIndexJs, appSrc } = require("./path");

module.exports = {
  entry: appIndexJs,
  output: {
    filename: "js/[name].[hash:7].js",
    path: path.resolve(__dirname, "../dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]_[hash].[ext]",
              outputPath: "images/",
              limit: 204800
            }
          }
        ]
      },
      {
        test: /\.(eot|woff2?|ttf|svg)/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
              limit: 5000,
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:7].css",
      chunkFilename: "[id].css"
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true
            },
            normalizeUnicode: false
          }
        ]
      },
      canPrint: true
    }),
    new CSSSplitWebpackPlugin({
      size: 4000,
      filename: "[name]-[part].[ext]"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "../public/index.html"),
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeEmptyElements: true,
        caseSensitive: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: ""
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    mainFiles: ["index", "view"],
    alias: {
      "@": appSrc
    }
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1, // 一个模块至少被用了1次才会被分割
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          minSize: 0,
          priority: -10
        },
        default: {
          reuseExistingChunk: true, // 避免被重复打包分割
          filename: "common.js",
          priority: -20
        }
      }
    }
  }
};
