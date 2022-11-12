const files = require.context("./modules", false, /\.js$/);
let modules = {};

files.keys().forEach((key) => {
  Object.assign(modules, files(key));
});

export default modules;