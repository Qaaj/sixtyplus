var Webpack = require('webpack');
var path = require('path');
var appPath = path.resolve(__dirname, 'app/client');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');

var config = {
  context: __dirname,
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/dev-server',
    path.resolve(appPath, 'app.js')],
  output: {
    path: buildPath,
    filename: 'js/bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {stage: 0},
      exclude: [nodeModulesPath]
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }, { test: /\.woff$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.woff2$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },

      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" },
      { test: /\.csv?$/, loader: 'dsv-loader' }]
  },
  plugins: [new Webpack.HotModuleReplacementPlugin(),
  new Webpack.ProvidePlugin({
            'React': 'react',
            'moment': 'moment'
        })]
};

module.exports = config;
