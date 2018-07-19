const fs = require('fs');

module.exports = () => {
  const nodeModules = {};
  fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => {
      nodeModules[mod] = `commonjs ${mod}`;
    });
  return nodeModules;
};
