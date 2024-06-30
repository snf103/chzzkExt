const common = require("./webpack.common.js");
const dev = require("../webpack-common/webpack.dev.js");

module.exports = dev.modify(common);
