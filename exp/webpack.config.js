const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const webpackConfig = {
  mode: "production",
  entry: {
    bundle1: ["./src/index.js", "./src/index2.js"],
    bundle2: "./src/index1.js",
    bundle3: "./src/css/style1.css"
  },
  output: {
    filename: "[name].[hash:7].js",
    path: path.resolve("dist")
  },
  devtool: "source-map",
  watch: true,
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        use: "babel-loader",
        include: /src/,
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.(jpeg|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[hash:7].[ext]",
              limit: 8192,
              outputPath: "image/"
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new UglifyJsPlugin({
      parallel: 4,
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      title: "index1",
      meta: {
        keyWords: "webpack-demo"
      },
      base: {
        href: "http://example.com/some/page.html",
        target: "_blank"
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyJS: false,
        minifyCSS: false
      },
      hash: false,
      chunks: ["vendor", "common1", "common2", "common3", "bundle1"]
    }),
    new HtmlWebpackPlugin({
      filename: "index1.html",
      title: "index1",
      meta: {
        keyWords: "webpack-demo1"
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
      chunks: ["vendor", "common1", "common2", "common3", "bundle2"]
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:7].css"
    }),
    new CompressionWebpackPlugin({
      algorithm: "gzip",
      filename: "[path].gz[query]",
      test: /\.js$|\.html$|\.css$/,
      threshold: 10,
      minRatio: 0.8,
      deleteOriginalAssets: false
    })
  ],
  devServer: {
    contentBase: "./dist",
    host: "localhost",
    port: 3000,
    headers: {
      "X-Custom-Foo": "bar",
      hello: "world"
    },
    compress: true,
    open: true,
    inline: true,
    https: false,
    index: "index.html",
    watchContentBase: true,
    proxy: {
      "/api": "http://localhost:3000"
    }
  },
  performance: {
    hints: "warning"
  },
  resolve: {
    alias: {
      js: path.resolve(__dirname, "src/js")
    },
    extensions: [".js", ".json", ".css"]
  },
  optimization: {
    splitChunks: {
      minChunks: 1,
      minSize: 0,
      cacheGroups: {
        common1: {
          test: /js4.js$/,
          chunks: "initial",
          name: "common1", // 任意命名
          minSize: 0 // 只要超出0字节就生成一个新包
        },
        common2: {
          test: /js5.js$/,
          chunks: "initial",
          name: "common2",
          minSize: 0
        },
        common3: {
          test: /js6.js$/,
          chunks: "initial",
          name: "common3",
          minSize: 0
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          name: "vendor",
          priority: 10
        }
      }
    }
  }
};

console.log(__filename);

const compiler = webpack(webpackConfig);
compiler.hooks.compile.tap("MyPlugin", (params) => {
  console.log("已同步方式触及compile钩子");
});
compiler.hooks.run.tapAsync("MyPlugin", (compiler, callback) => {
  console.log("以异步方式触及 run 钩子。");
  callback();
});

compiler.hooks.run.tapPromise("MyPlugin", (compiler) => {
  return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
    console.log("以具有延迟的异步方式触及 run 钩子");
  });
});
compiler.run((err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(err);
  }
  console.log("webpack打包完成");
});
