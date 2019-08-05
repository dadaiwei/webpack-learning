const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  appPublic: resolvePath("public"),
  appHtml: resolvePath("public/index.html"),
  appSrc: resolvePath("src"),
  appBuild: resolvePath("dist"),
  appIndexJs: resolvePath("src/index.js")
};
