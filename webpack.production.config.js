var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');
var Webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app/client', 'app.js');

var pathToReact = path.resolve(node_modules_dir, 'react/dist/react.min.js');

var config = {

    entry: mainPath,
    output: {
        path: buildPath,
        filename: 'js/bundle.js'
    },
    module: {
        loaders: [ {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        }, {
            test: /\.scss$/,
            loaders: ["style", "css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]", "sass?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"]
        }, { test: /\.woff$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.woff2$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },

            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
          'react': pathToReact
        }
    },
    plugins: [
        new Webpack.optimize.UglifyJsPlugin({
        compress: {
           warnings: false
        }})
    ]
};


module.exports = config;
