const gen = require("../webpack-common/webpack.common.js").gen;
const gened = gen("dist-electron", "electron", "chrome");

module.exports = gened;
