var express = require('express');
var path = require('path');
var routesIndex = require('./server/routes/index');


var app = express();
var isProduction = process.env.NODE_ENV === 'production';
var publicPath = path.resolve(__dirname, 'public');

var Firebase = require("firebase");

var myFirebaseRef = new Firebase("https://crackling-torch-5091.firebaseio.com/");

myFirebaseRef.set({
    title: "Hello World!",
    author: "Firebase",
    location: {
        city: "San Francisco",
        state: "California",
        zip: 94103
    }
});

app.use(express.static(publicPath,app));
app.set('view engine', 'jade');


app.use('/', routesIndex(isProduction,app));



