const debug = require('debug')('debug:maintenance/SaveAnalystRatings');
var Firebase = require("firebase");
import moment from 'moment';
import {Set} from 'immutable';
var yahooFinance = require('yahoo-finance');


export default (req, res) => {

  if(req.body.key === "top_secret_key_boy") {
    updateRatings(res);
  }else{
    res.send("Nope.")
  }

};

function updateRatings(res) {

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
    getAnalystRatings(result,res);
  }, function (err) {
    console.log(err); // Error: "It broke"
  });
}


function getAnalystRatings(list,res) {
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

    saveAnalystRating(result,res);
  }, function (err) {
    debug(err); // Error: "It broke"
  });
}

let today = new moment().format('YYYY-MM-DD');

function saveAnalystRating(items,res) {

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
        if (countr === items.length) resolve("YAY");
      });
    });
  });

  promise.then(function (result) {
    console.log("Done");
    res.send("Succes.")
  }, function (err) {
    debug(err); // Error: "It broke"
  });
}
