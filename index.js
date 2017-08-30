const loaderUtils = require('loader-utils');

module.exports = function (source) {
  const { paths = [] } = loaderUtils.getOptions(this);
  return paths.map(x => `@import '${x}';`).join('\n') + source;
};
