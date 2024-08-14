const gen = require("../webpack-common/webpack.common.js").gen;
const gened = gen("dist-firefox", "firefox", "firefox");

module.exports = gened;
