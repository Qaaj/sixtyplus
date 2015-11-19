const debug = require('debug')('debug:user/getPrices');

var yahooFinance = require('yahoo-finance');

export default (req, res) => {

  debug("getting stock prices");

  var promise = new Promise(function (resolve, reject) {
    let returnList = [];
    let list = req.body.tickers.map(tickr => {
      yahooFinance.snapshot({
        symbol: tickr,
        fields: ['s', 'n', 'd1', 'l1', 'y', 'r'],
      }, function (err, snapshot) {
        returnList.push(snapshot);
        if(returnList.length == req.body.tickers.length) resolve(returnList);
      });
    })
  });

  promise.then(function (result) {
    res.send(result);
  }, function (err) {
    debug(err); // Error: "It broke"
  });


};
