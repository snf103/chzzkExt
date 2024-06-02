const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");
const distDir = path.join(__dirname, "..", "dist-firefox");
const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");

module.exports = {
  entry: {
    options: path.join(srcDir, "options.tsx"),
    background: path.join(srcDir, "background.ts"),
    content_script: path.join(srcDir, "content_script.tsx"),
    injecter: path.join(srcDir, "injecter.ts"),
  },
  output: {
    path: path.join(distDir, "js"),
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks(chunk) {
        return chunk.name !== "background";
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      { test: /\.static\.txt$/, use: "raw-loader" },
      { test: /\.static\.css$/, use: "raw-loader" },
      { test: /\.static\.html$/, use: "raw-loader" },
      { test: /\.static\.data$/, use: "raw-loader" },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: ".", to: "../", context: "public" }],
      options: {},
    }),
    new MergeJsonWebpackPlugin({
      files: ["./manifests/base.json", "./manifests/firefox.json"],
      output: {
        fileName: "../manifest.json",
      },
    }),
  ],
};
