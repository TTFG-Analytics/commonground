var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
  // 'script!jquery/dist/jquery.min.js',
  // 'script!bootstrap/dist/js/bootstrap.min.js',
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
      applicationStyles: 'public/styles/styles.css',
      //app.js
      App: 'src/js/discussion/discuss/App',
      CampParent: 'src/js/discussion/camps/CampParent',
      FaceBookIntegration: 'src/js/discussion/camps/FaceBookIntegration',
      ProfileApp: 'src/js/profile/components/profileApp',
      Logout: 'src/js/logout/Logout',
      About: 'src/js/about/About',
      //index.js
      discussionsGet: 'src/js/discussion/discuss/getDiscussionsReducer',
      campGet: 'src/js/discussion/camps/getCampsReducer',
      commentGet: 'src/js/discussion/comments/commentReducer',
      fbGet: 'src/js/discussion/camps/FaceBookReducer',
      profileReducer: 'src/js/profile/reducers/profileReducer',
      //subfolders
      Navigation: 'src/js/navbar/navbar',
      UserAlert: 'src/js/profile/components/UserAlert'
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
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  node: {
    fs: "empty",
    net: 'empty',
  }
};
