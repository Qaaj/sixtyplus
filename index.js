
var express = require('express');
var path = require('path');
var routesIndex = require('./server/routes/index');
var bodyParser = require('body-parser');
const debug = require('debug')('debug:index');

var app = express();

import DataStore from './server/stores/DataStore'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

var isProduction = process.env.NODE_ENV === 'production';
var publicPath = path.resolve(__dirname, 'public');

debug("starting");
DataStore.loadData();

app.use(express.static(publicPath,app));
app.set('view engine', 'jade');


app.use('/', routesIndex(isProduction,app));
