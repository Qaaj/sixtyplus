require("babel-core/register");
var app = require('./stock_csv_parser_es6.js');

// Create the mapped JSON file
//app.createMappedJSON();


// Parse all the ticker CSV's
app.parseTickerCSVs();
