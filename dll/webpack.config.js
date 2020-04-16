const path = require("path");
const webpack = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

const manifests = ['antd', 'jquery', 'lodash'];
const dllPlugins = manifests.map(item => {
  return new webpack.DllReferencePlugin({
    manifest: require(`./manifest/${item}.manifest`)
  });
});

module.exports = {
  mode: 'production',
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    ...dllPlugins,
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, "./dll/*.dll.js")
    })
  ]
};
