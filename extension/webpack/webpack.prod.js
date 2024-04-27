const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    mangleExports: false,
    mangleWasmImports: false,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: { compress: true, mangle: false },
      }),
    ],
  },
});
