const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    content: "./src/content.txt"
  },
  resolveLoader: {
    modules: ["node_modules", "./loaders"]
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: [
          {
            loader: "loader1",
            options: {
              firstLetter: true
            }
          }
        ]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin()],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].txt"
  }
};
