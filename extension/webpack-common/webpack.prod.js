const webpack = require("webpack");
const { EsbuildPlugin } = require("esbuild-loader");

const HTML = require("html-minimizer-webpack-plugin");
const JSON = require("json-minimizer-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

module.exports = {
  modify: function (config) {
    config.optimization = {
      splitChunks: {
        name: "vendor",
        chunks(chunk) {
          return chunk.name !== "background";
        },
      },
      mangleExports: false,
      mangleWasmImports: false,
      minimize: true,
      minimizer: [
        new EsbuildPlugin({
          target: "es2015",
          keepNames: true,
          minify: false,
          minifySyntax: true,
          minifyWhitespace: true,
          css: true,
          exclude: /vendor\.js/,
        }),
        new EsbuildPlugin({
          include: /vendor\.js/,
          target: "es2015",
          keepNames: false,
          minify: true,
          minifyIdentifiers: true,
          minifySyntax: true,
          minifyWhitespace: true,
          css: true,
          mangleQuoted: true,
        }),
      ],
    };
    config.module.rules.length = 0;
    config.module.rules = [
      {
        test: /\.[jt]sx?$/,
        loader: "esbuild-loader",
        options: {
          target: "es2015",
          keepNames: true,
          minify: false,
        },
      },
      { test: /\.static\.txt$/, use: "raw-loader" },
      {
        test: /\.static\.css$/,
        use: [
          "raw-loader",
          {
            loader: "esbuild-loader",
            options: {
              target: "es2015",
              minify: true,
            },
          },
        ],
      },
      {
        test: /\.static\.html$/,
        use: "raw-loader",
      },
      { test: /\.static\.data$/, use: "raw-loader" },
      {
        test: /(?<!\.static)\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "esbuild-loader",
            options: {
              target: "es2015",
              minify: true,
            },
          },
        ],
      },
    ];
    config.plugins.push(new HTML());
    config.plugins.push(new JSON());
    if (process.env.SPD === "true") {
      config = smp.wrap(config);
    }
    return config;
  },
};
