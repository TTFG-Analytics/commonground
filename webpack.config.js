var webpack = require('webpack');

module.exports = {
  entry: [
  'script!jquery/dist/jquery.min.js',
  './src/js/app.js'
  ],
  externals: {
    jquery: 'jQuery'
  },
  watch: true,
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      applicationStyles: 'public/styles/styles.css'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  node: {
    fs: "empty",
    net: 'empty',
  }
};
