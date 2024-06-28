const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const prod = require("../webpack-common/webpack.prod.js");
module.exports = merge(common, prod);
