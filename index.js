
var express = require('express');
var path = require('path');
var routesIndex = require('./server/routes/index');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

var isProduction = process.env.NODE_ENV === 'production';
var publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath,app));
app.set('view engine', 'jade');


app.use('/', routesIndex(isProduction,app));
