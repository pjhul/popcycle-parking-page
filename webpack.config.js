"use strict";

const path = require("path");
const glob = require("glob");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = function (env) {
  return {
    entry: {
      index: path.resolve(__dirname, "./src/index.tsx"),
    },
    mode: env.production ? "production" : "development",
    devtool: !env.production && "inline-source-map",
    optimization: {
      runtimeChunk: "single",
    },
    resolve: {
      extensions: [ ".tsx", ".ts", ".js" ],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: env.production
        ? "static/js/[name].[contenthash:8].js"
        : "static/js/[name].bundle.js",
      chunkFilename: env.production
        ? "static/js/[name].[contenthash:8].chunk.js"
        : "static/js/[name].chunk.js",
    },
    module: {
      rules: [
        {
          test: /\.(png|jp(e*)g|svg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "images/[hash]-[name].[ext]",
              },
            },
          ],
        },
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
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    require("tailwindcss"),
                    require("autoprefixer"),
                    env.production &&
                    require("@fullhuman/postcss-purgecss")({
                      content: ["./src/**/*.tsx", "./public/index.html"],
                      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g),
                    })
                  ].filter(Boolean),
                },
              },
            },
            "sass-loader",
          ],
          sideEffects: true,
        }
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, "public/index.html"),
        favicon: path.resolve(__dirname, "public/favicon.png"),
      }),
      new MiniCssExtractPlugin({
        filename: "static/styles/[name].css",
      }),
      new WebpackManifestPlugin(),
      //new BundleAnalyzerPlugin(),
    ],
  };
}
