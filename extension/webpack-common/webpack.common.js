const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");
const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { EsbuildPlugin } = require("esbuild-loader");

module.exports = {
  gen: function (distDirX, BUILD_ENV, manifestName) {
    const distDir = path.join(__dirname, "..", distDirX);
    const date = new Date();
    const dateStr = `${date.getFullYear()}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
    return {
      entry: {
        options: path.join(srcDir, "options.tsx"),
        background: path.join(srcDir, "background.ts"),
        content_script: path.join(srcDir, "content_script.tsx"),
        injecter: path.join(srcDir, "injecter.ts"),
        shortsInjecter: path.join(srcDir, "shortsInjecter.ts"),
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
            use: "raw-loader",
          },
          {
            test: /\.static\.html$/,
            use: "raw-loader",
          },
          { test: /\.static\.data$/, use: "raw-loader" },
          {
            test: /(?<!\.static)\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
      resolve: {
        extensions: [".ts", ".tsx", ".js"],
        plugins: [new TsconfigPathsPlugin({})],
      },
      plugins: [
        new EsbuildPlugin({
          define: {
            "process.env.BUILD_ENV": '"' + BUILD_ENV + '"',
            "process.env.VERSION":
              '"' + require("../manifests/base.json").version + '"',
            "process.env.BUILDDATE": '"' + dateStr + '"',
          },
        }),
        new CopyPlugin({
          patterns: [{ from: ".", to: "../", context: "public" }],
          options: {},
        }),
        new MergeJsonWebpackPlugin({
          files: [
            "./manifests/base.json",
            "./manifests/" + manifestName + ".json",
          ],
          output: {
            fileName: "../manifest.json",
          },
        }),
        ...(process.env.ANAL === "true" ? [new BundleAnalyzerPlugin()] : []),
      ],
    };
  },
};
