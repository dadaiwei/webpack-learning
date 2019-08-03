const loaderUtils = require("loader-utils");

module.exports = function(source) {
  const options = loaderUtils.getOptions(this); // 读取配置
  const callback = this.async();
  setTimeout(() => {
    let result = source;
    if (options && options.firsetLetter) {
      result = source.charAt(0).toUpperCase() + source.slice(1);
    }
    callback(null, `'${result}'`);
  }, 1000);
};
