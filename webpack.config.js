const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");
const TerserPlugin = require('terser-webpack-plugin');
const process = require('process');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = function(env, argv) {
  const isProd = argv.mode === 'production';

  const babelConfig = {
    babelrc: false,
    presets: [
	  [require.resolve('@babel/preset-env'), {
        useBuiltIns: "usage",
        modules: false,
	    targets: '> 1% and last 2 versions and not dead'
	  }],
      [require.resolve('@babel/preset-react')]
    ],
    plugins: [
      require.resolve("babel-plugin-styled-components"),
      isProd && require.resolve("babel-plugin-transform-react-remove-prop-types"),
    ].filter(Boolean)
  };

  return {
    devtool: 'source-map',
    resolve: {
      modules: [ 'node_modules' ],
      extensions: ['.js', '.jsx'],
    },
    entry: ["./src/index.js",],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          oneOf: [
            {
	          test: /entries-generator\.js$/,
              use: [
                {loader: "file-loader", options: { name: "entries.json" }},
                {loader: "val-loader"}
              ]
	        },
            {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              use: [ { loader: "babel-loader", options: babelConfig } ]
            },
            {
              test: /\.svg$/,
              use: [{ loader: '@svgr/webpack' }],
            },
            {
              test: /\.html$/,
              use: [{loader: "html-loader"}]
            },
            {
              test: /\.woff2$/,
              use: [{loader: "file-loader",
                     options: { name: '[name].[ext]', outputPath: 'fonts'}}]
            },
            {
              test: /\.css$/,
              use: [
                {loader: MiniCssExtractPlugin.loader, options: { name: "[name].css" }},
                {loader: 'css-loader'},
              ]
            }
          ]
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({template: "src/index.html", }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CopyWebpackPlugin([
        {from: 'public/_redirects', to: './'},
        {from: 'public/icons', to: './icons'},
        {from: 'public/entries', to: './entries'}
      ]),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
    ],
    performance: {
      maxAssetSize: 320000,
      maxEntrypointSize: 320000,
      assetFilter: function(asset) {
        return !(/\.map$/.test(asset) || /\.jpg/.test(asset));
      }
    },
  }
}
