const path = require("path");
const webpack = require("webpack");

const configs = {
  mode: "production",
  entry: "./src/index.js",
  externals: ["lodash"],
  resolve: {
    extensions: [".js", ".json", ".vue"],
    mainFields: ["main", "index"]
  },
  output: {
    filename: "library.js",
    path: path.resolve(__dirname, "dist"),
    library: "library",
    libraryTarget: "umd"
  }
};

const compiler = webpack(configs);
compiler.run((err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(err);
  }
  console.log("webpack打包完成");
});
