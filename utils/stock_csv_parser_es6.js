import fs from 'fs';
import {CSVtoJSON} from '../server/helpers/json'

export function createMappedJSON() {

  fs.readFile(__dirname + '/../static/us_stocks.csv', function (err, data) {
    if (err) {
      throw err;
    }

    data = data.toString().replace(/['"]+/g, '|');

    let allStocks = data.split("\n");

    let firstLine = allStocks[0].slice(0, -1).split('|,|');
    firstLine = firstLine.map(el => {
      return el.replace(/['|]+/g, '').replace(/[']+/g, '');
    })

    allStocks = allStocks.splice(1);
    let mappedStocks = {};

    allStocks.map(singleLine => {
      let singleStock = singleLine.slice(0, -1).split("|,|").reduce((prev, curr, i) => {
        if (i !== 2 && i !== 3 && i !== 4 && i !== 7) prev[firstLine[i]] = curr.replace(/['|]+/g, '').replace(/'/g, '"');
        return prev;
      }, {});
      mappedStocks[singleStock.Symbol] = singleStock;
    });

    fs.writeFile(__dirname + '/../static/mapped_stocks.json', JSON.stringify(mappedStocks), function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });


  });
}


let counter = 0;
let symbols = [];


export function parsesymbolCSVs() {
  fs.readFile(__dirname + '/../static/all_symbols.json', function (err, data) {
    if (err) {
      throw err;
    }

    data = JSON.parse(data);
    symbols = data.symbols;
    symbols = symbols.filter(symbol => {
      if (symbol.indexOf("^") == -1) return symbol;
    })


    //let list = ['AAPL','ABBV'];


    dosymbol(symbols[counter]);


  });
}


function dosymbol(symbol) {

  console.log('doing symbol', symbol);
  fs.readFile(__dirname + '/../static/data/' + symbol + '.csv', "utf-8", function (err, data) {
    if (err) {
      console.log(err);
      counter++;
      dosymbol(symbols[counter]);
    }
    if (data.indexOf('html') === -1) {
      let entries = JSON.parse(CSVtoJSON(data));


      let orderedData = {}

      entries.map((entry, i) => {
        //if(i ===7423) console.log(entry);
        let date = entry.Date.split("-");
        let year = date[0];
        let month = date[0] + '-' + date[1];
        if (!orderedData[year]) orderedData[year] = [];
        orderedData[year].push(entry);
        if (!orderedData[month]) orderedData[month] = [];
        orderedData[month].push(entry);
      })

      let keys = Object.keys(orderedData);

      let string = 'Date,avg,low,high,adjusted_avg,adj_low,adj_high'
      keys.map(key => {
        if (key) {
          let average = calculateAverage(orderedData[key]);
          string += '\n' + key + ',' + average.total + ',' + average.realMin + ',' + average.realMax + ',' + average.adj_total + ',' + average.min + ',' + average.max;
        }
      })

      fs.writeFile(__dirname + '/analysed/' + symbol + '.csv', string, function (err) {
        if (err) {
          console.log(err);
          counter++;
          dosymbol(symbols[counter]);
        }
        console.log(symbol + ' saved. (' + counter + '/' + symbols.length + ')');
        counter++;
        setTimeout(()=> {
          dosymbol(symbols[counter])
        }, 200);
      });

    } else {
      counter++;
      dosymbol(symbols[counter]);
    }
  });
}

function calculateAverage(month) {

  let min = 1000000000;
  let max = 0;
  let total = 0;
  let adj_total = 0;
  let realMin = 0;
  let realMax = 0;

  let length = month.length;
  month.map(day => {
    let adj_close = parseFloat(day['Adj Close']);
    let adj_close_perc = adj_close / day.Close;

    let adj_max = adj_close_perc * day.High;
    let adj_min = adj_close_perc * day.Low;

    adj_total += parseFloat(adj_close);
    total += parseFloat(day['Close']);

    if (adj_max > max) {
      max = adj_max;
      realMax = day.High;
    }
    if (adj_min < min) {
      min = adj_min;
      realMin = day.Low;
    }
  })

  total = total / length;
  adj_total = adj_total / length;

  return {total, adj_total, max, min, realMax, realMin};

}

var Firebase = require("firebase");
import {Set} from 'immutable';

export function getCurrentsymbolsInApplication() {
  var ref = new Firebase('https://crackling-torch-5091.firebaseio.com/users');
// Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function (snapshot) {

    let users = snapshot.val();
    let symbols = new Set();

    Object.keys(users).forEach(key => {
      let user = users[key];
      if (user.userData && user.userData.portfolio) {
        Object.keys(user.userData.portfolio).forEach(symbol => {
          console.log(symbol);
          symbols = symbols.add(symbol.toUpperCase());
          //if(symbol == 'bonds' || symbol == 'savings' || symbol == 'stocks') {
          //  var ref2 = new Firebase('https://crackling-torch-5091.firebaseio.com/users/' + key);
          //  console.log('removing: ' + key)
          //  ref2.remove();
          //}
        });
      }
    });

    console.log(symbols.toJS());
    return symbols.toJS();

  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

var yahooFinance = require('yahoo-finance');


export function updateRatings() {

  var promise = new Promise(function (resolve, reject) {
    var ref = new Firebase('https://crackling-torch-5091.firebaseio.com/users');
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function (snapshot) {

      let users = snapshot.val();
      let symbols = new Set();

      Object.keys(users).forEach(key => {
        let user = users[key];
        if (user.userData && user.userData.portfolio) {
          Object.keys(user.userData.portfolio).forEach(symbol => {
            symbols = symbols.add(symbol.toUpperCase());
          });
        }
      });

      resolve(symbols.toJS());

    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  });

  promise.then(function (result) {
    getAnalystRatings(result);
  }, function (err) {
    console.log(err); // Error: "It broke"
  });

}


function getAnalystRatings(list) {
  var promise = new Promise(function (resolve, reject) {
    let returnList = [];
    list.map(symbol => {
      yahooFinance.snapshot({
        symbol: symbol,
        fields: ['t8', 'e8', 'e9'],
        // '1YrTargetPrice': 40.61,
        // epsEstimateNextYear: 3.36,
        // epsEstimateNextQuarter: 0.82
      }, function (err, json) {
        returnList.push(json);
        if (returnList.length == list.length) resolve(returnList);
      });
    })
  });

  promise.then(function (result) {

    saveAnalystRating(result);
  }, function (err) {
    debug(err); // Error: "It broke"
  });
}

import moment from 'moment';
let today = new moment().format('YYYY-MM-DD');

function saveAnalystRating(items) {

  let countr = 0;
  var promise = new Promise(function (resolve, reject) {
    items.map(item => {
      let symbol = item.symbol;
      let saveObject = {};

      saveObject[today] = {
        one_year_target: item['1YrTargetPrice'],
        eps_next_year: item['epsEstimateNextYear'],
        eps_next_quarter: item['epsEstimateNextQuarter'],
      }

      var ratings = new Firebase('https://crackling-torch-5091.firebaseio.com/ratings/' + symbol);
      var ref = new Firebase("https://crackling-torch-5091.firebaseio.com/");
      var ratingsRef = ref.child("ratings");

      ratings.once('value', function (snapshot) {
        if (snapshot.val()) {
          ratingsRef.child(symbol).update(saveObject);
          console.log("Data updated for: " + symbol)
        } else {
          ratingsRef.child(symbol).set(saveObject);
          console.log("Data created for: " + symbol)
        }
        countr++;
        if(countr === items.length) resolve("YAY");
      });
    });
  });

  promise.then(function (result) {
    console.log("Done");
    process.exit(0);
  }, function (err) {
    debug(err); // Error: "It broke"
  });


}
