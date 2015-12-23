require("babel-core/register");
var app = require('./stock_csv_parser_es6.js');

// Create the mapped JSON file
//app.createMappedJSON();


// Parse all the symbol CSV's
//app.parsesymbolCSVs();

// Get all the users and analyse portfolios
//app.getCurrentsymbolsInApplication();


// Update the analyst ratings for all the symbols in all portfolios.
app.updateRatings();
