const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: {
    app: "./src/js/app.js",
    vendors: "./src/js/vendors.js"
  },
  output: {
    filename: "js/[name].[chunkhash:7].js",
    path: path.resolve(__dirname, "dist")
  },
  context: path.resolve(__dirname),
  devServer: {
    contentBase: "./dist",
    host: "localhost",
    port: 3000,
    compress: true,
    headers: {
      "X-Custom-Foo": "bar"
    },
    inline: true
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:7].css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "webpack is good",
      template: "./src/index.html"
    })
    // new BundleAnalyzerPlugin({
    //   analyzerMode: "server",
    //   analyzerHost: "127.0.0.1",
    //   analyzerPort: 8888, // 运行后的端口号
    //   reportFilename: "report.html",
    //   defaultSizes: "parsed",
    //   openAnalyzer: true,
    //   generateStatsFile: false,
    //   statsFilename: "stats.json",
    //   statsOptions: null,
    //   logLevel: "info"
    // })
  ]
};
