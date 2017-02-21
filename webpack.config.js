var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets:['es2015', 'react']} },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets:['es2015', 'react']} },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      {test: /\.css$/, use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          "postcss-loader" // has separate config, see postcss.config.js nearby
      ]}
      // { test: /\.scss$/, include: [
      //     /node_modules\/react-toolbox/,
      //   ],
      //   loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass'
      // }
    ],
  },
  node: {
    fs: "empty",
    net: 'empty',
  }
  // ,
  // resolve: {
  //   extensions: ['', '.js', '.jsx', '.scss', '.css', '.json']
  // }
}