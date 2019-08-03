const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: ["./src/index.js", "./src/index1.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[hash].js"
  },
  plugins: [new CleanWebpackPlugin()]
};
