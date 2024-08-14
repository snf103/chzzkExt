const gen = require("../webpack-common/webpack.common.js").gen;
const gened = gen("dist-chrome", "chrome", "chrome");

module.exports = gened;
