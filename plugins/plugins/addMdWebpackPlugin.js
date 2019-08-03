class AddMdWebpackPlugin {
  constructor(options) {
    console.log(options);
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync("addMdWebpackPlugin", (compilation, cb) => {
      compilation.assets["describe.md"] = {
        source: function() {
          return "hello world";
        },
        size: function() {
          return 21;
        }
      };
      cb();
    });
  }
}

module.exports = AddMdWebpackPlugin;
