var webpack = require('webpack');
var path = require('path');

// http://webpack.github.io/docs/stylesheets.html
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssLoaders = ['style', 'css', 'autoprefixer-loader?{browsers:["> 1%", "IE 9"]}'];

var config = {

    // set the `app` directory as the context
    context: path.join(__dirname + '/app'),

    // Entry points, can be multiple
    entry: {
        app: './client/app.js',
        vendor: [
            'd3',
            'react'
        ]
    },

    // the output for DEVELOPMENT
    output: {
        path: path.join(__dirname + '/src'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].js' // based on the entry point key name
    },

    // Allow CORS for devServer
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    },

    // `eval` to see the generated code (DEV only) (see Console Sources tab)
    // `eval-source-map` the exact code (DEV only)
    // `source-map` generates source map files (for PRODUCTION)
    devtool: 'eval-source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"local"'
            }
        }),
        // common code used between the different entry points
        //new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.bundle.js'),
        // hot reload
        new webpack.HotModuleReplacementPlugin(),

        //new webpack.ProvidePlugin({ _: 'lodash' })
        // these are available globally, and we don't need to require them in every file
        new webpack.ProvidePlugin({
            'React': 'react',
            'd3': 'd3',
            'moment': 'moment'
        })
    ],

    module: {
        loaders: [
            styleModLoaders = [
                {
                    test: /\.scss$/,
                    loaders: cssLoaders.concat([
                        "sass?precision=10&outputStyle=compressed"
                    ])
                },
                { test: /\.css$/ , loaders: cssLoaders }
            ],
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: { stage: 0 } },
            { test: /\.html$/, loader: 'html', exclude: /node_modules/ },
            { test: /\.json/, loader: 'json', exclude: /node_modules/ },
            { test: /\.(woff)$/, loader: 'file?name=resources/fonts/[name].[ext]?[hash]' },
            { test: /\.woff2$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },

            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'file?name=resources/images/[name].[ext]?[hash]|image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            }
        ],
        // Shut off warnings about using pre-built javascript files
        // as Quill.js unfortunately ships one as its `main`.
        noParse: /node_modules\/quill\/dist/
    },

    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },

    resolve: {
        root: path.join(__dirname, 'node_modules'),

        modulesDirectories: [
            'node_modules'
        ],

        // you can now require('file') instead of require('file.js')
        extensions: ['', '.js']
    }

};


/////////////////////////////////////////////
// PRODUCTION
/////////////////////////////////////////////
if (process.env.NODE_ENV === 'production') {
    // No source maps in production
    config.devtool = '';

    config.plugins.push(
        // to extract css in separate files
        new ExtractTextPlugin('[name].css')
    );

    // Change destination folder for Production code
    config.output.path = __dirname + '/public/dist';
    config.output.publicPath = '/public';
    config.output.filename = '[name].min.js';

    // Uglify JS
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: true
        })
    );

    // Remo
    config.plugins.push(
        new webpack.optimize.DedupePlugin()
    );
}

module.exports = config;
