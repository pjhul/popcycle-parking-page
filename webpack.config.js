"use strict";

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = function (env) {
  return {
    entry: path.resolve(__dirname, "./src/index.tsx"),
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
        {
          test: /\.s[ac]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            "postcss-loader",
            "sass-loader",
          ],
          sideEffects: true,
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, "public/index.html"),
        favicon: "./public/favicon.png"
      }),
      new MiniCssExtractPlugin({
        filename: "main.css",
      }),
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
