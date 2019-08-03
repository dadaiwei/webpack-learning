const loaderUtils = require("loader-utils");

module.exports = function(source) {
  const options = loaderUtils.getOptions(this); // 读取配置
  let result = source;
  if (options && options.firstLetter) {
    result = "";
    const words = source.split(" ");
    for (let word of words) {
      result += `${word.charAt(0).toUpperCase()}${word.slice(1)} `;
    }
  }
  this.callback(null, `'${result}'`);
};
