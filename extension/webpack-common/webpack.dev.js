const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

module.exports = {
  modify: function (config) {
    config.devtool = "inline-source-map";
    config.mode = "development";
    if (process.env.SPD === "true") {
      config = smp.wrap(config);
    }
    return config;
  },
};
