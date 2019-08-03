module.exports = function(src) {
  src = src.toUpperCase();
  return `module.exports = '${src}'`;
};
