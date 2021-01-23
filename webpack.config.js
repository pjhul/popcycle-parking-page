"use strict";

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function (env) {
  return {
    entry: "./src/index.tsx",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            "babel-loader",
            "ts-loader",
          ],
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, "public/index.html"),
        favicon: "./public/favicon.png"
      })
    ],
    resolve: {
      extensions: [ ".tsx", ".ts", ".js" ],
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
  };
}
