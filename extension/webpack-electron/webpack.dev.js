const common = require("./webpack.common.js");

const exp = common;
common.devtool = "inline-source-map";
common.mode = "development";
module.exports = exp;
