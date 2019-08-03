const path = require("path");
const AddMdWebpackPlugin = require("./plugins/addMdWebpackPlugin");

module.exports = {
  entry: "./src/index.js",
  plugins: [new AddMdWebpackPlugin({ name: "wod" })],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  }
};
