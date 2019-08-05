const fs = require("fs-extra");
const { appHtml, appPublic, appBuild } = require("./path");

function copyPublicFolder() {
  fs.copySync(appPublic, appBuild, {
    dereference: true,
    filter: (file) => file !== appHtml
  });
}

copyPublicFolder();

exports.copyPublicFolder = copyPublicFolder;
