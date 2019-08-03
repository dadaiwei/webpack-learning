const path = require("path");

module.exports = {
  entry: {
    app: "./test.txt"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].txt"
  },
  module: {
    rules: [
      {
        test: /\.txt/,
        use: [
          {
            loader: "../loader/comment-loader.js",
            options: {
              param: 1
            }
          },
          {
            loader: "../loader/loader2.js"
          },
          {
            loader: "../loader/loader1.js",
            options: {
              name: "loader"
            }
          }
        ]
      }
    ]
  }
};
