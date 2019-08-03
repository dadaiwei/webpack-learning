const loaderUtils = require("loader-utils");

module.exports = function(source) {
  const options = loaderUtils.getOptions(this);
  const time = new Date().toLocaleString();
  const callback = this.async();
  const result = `
  /**
  ** @author dada
  ** @time ${time}
  **/;
  
  ${source}
  `;
  setTimeout(() => {
    callback(null, result);
  }, 10000);
};
