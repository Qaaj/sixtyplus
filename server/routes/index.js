import express from 'express';
import request from 'request';
import fileSystem from 'fs';
import path from 'path';
var httpProxy = require('http-proxy');
var http = require('http');


const router = express.Router();


function routingWrapper(isProduction,app) {

    var userLang = "EN";
    var port = isProduction ? process.env.PORT : 3000;

    var proxy = httpProxy.createProxyServer({
        changeOrigin: true,
        ws: true
    });


    if (!isProduction) {

        var bundle = require('../../server/bundle.js');
        bundle();
        app.all('/build/*', function (req, res) {
            proxy.web(req, res, {
                target: 'http://127.0.0.1:3001'
            });
        });
        app.all('/socket.io*', function (req, res) {
            proxy.web(req, res, {
                target: 'http://127.0.0.1:3001'
            });
        });

        app.get('/', function (req, res) {
            res.render('index', { userLang: userLang});
        });


        proxy.on('error', function(e) {
            // Just catch it
        });

        // We need to use basic HTTP service to proxy
        // websocket requests from webpack
        var server = http.createServer(app);

        server.on('upgrade', function (req, socket, head) {
            proxy.ws(req, socket, head);
        });

        server.listen(port, function () {
            console.log('Server running on port ' + port);
        });

    } else {

        // And run the server
        app.listen(port, function () {
            console.log('Server running on port ' + port);
        });
    }

    app.all('/db/*', function (req, res) {
        proxy.web(req, res, {
            target: 'https://crackling-torch-5091.firebaseio.com/'
        });
    });

    function apiRouteHandler(req, res) {

    }

    return router;
}

export default routingWrapper;
