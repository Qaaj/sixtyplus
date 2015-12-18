var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./../webpack.config.js');
var path = require('path');
var mainPath = path.resolve(__dirname, '..', 'app', 'main.js');
import notifier from 'node-notifier';

module.exports = function () {

  var bundleStart = null;
  var compiler = webpack(webpackConfig);
  compiler.plugin('compile', function() {
    console.log('Bundling...');
    bundleStart = Date.now();
  });
  compiler.plugin('done', function() {
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    notifier.notify({
      title: 'Build succeeded!',
      message: 'Bundled in ' + (Date.now() - bundleStart) + 'ms!'
    });

  });

  var bundler = new WebpackDevServer(compiler, {
    publicPath: '/build/',
    inline: true,
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  bundler.listen(3001, 'localhost', function () {
    console.log('Bundling project, please wait...');
  });

};
