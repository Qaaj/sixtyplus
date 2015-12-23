import express from 'express';
import request from 'request';
import fileSystem from 'fs';
import path from 'path';
import services from '../services/allServices';
const debug = require('debug')('debug:routes/index');
import OfflineStore from '../stores/OfflineStore';
import Parse from 'parse/node';
import httpProxy from 'http-proxy';
import http from 'http';
import stack from '../../app/shared/utils/stack';


const router = express.Router();


function routingWrapper(isProduction, app) {

  var port = isProduction ? process.env.PORT : 3000;

  var proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    ws: true
  });

  Parse.initialize("qwOuW1DQbNN8N7kokZ1zpEUZplKjxt0eGQAc8NF0", "zbl6d3UFZxB93t0zi7JIdaWaNxNsw2cg4rzfYt6g");


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
      res.render('index');
    });

    proxy.on('error', function (e) {
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
    console.log('prod');
    app.get('/', function (req, res) {
      res.render('index_production');
    });
  }

  debug('Listening for API calls');

  router.route('/api/:serviceId').all(
    isOffline,
    createUserPointer,
    apiRouteHandler,
    finaliseResponse
  );

  function createUserPointer(req,res,next){
    if(req.body.uid){
      req.userPointer =  {"__type": "Pointer", "className": "_User", "objectId": req.body.uid};
    }
    next();
  }

  function isOffline(req, res, next) {
    if (process.env.NODE_ENV === 'offline') {
      OfflineStore.getData(req, res, next);
    } else {
      next();
    }
  }

  function apiRouteHandler(req, res, next) {
    if (typeof services[req.params.serviceId] === 'function') {
      services[req.params.serviceId](req, res, next);
    } else {
      res.send('This endpoint does not exist');
    }
  }

  function finaliseResponse(req, res, next) {
    let response = req.app.get('response');
    if(process.env.NODE_ENV == 'provision') OfflineStore.saveData(req,response);
    res.send(response);
  }

  return router;
}

export default routingWrapper;
