var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');
var Webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app/client', 'app.js');
var reactPath = path.join(nodeModulesPath, 'react', 'react.js')
    , reactDOMPath = path.join(nodeModulesPath, 'react', 'lib', 'ReactDOM.js')
    , reactCSSTransitionGroupPath = path.join(nodeModulesPath, 'react', 'lib', 'ReactCSSTransitionGroup.js');
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
        alias: {
            'react': reactPath,
            'react-dom': reactDOMPath,
            'react-addons-css-transition-group': reactCSSTransitionGroupPath
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
