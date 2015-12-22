const debug = require('debug')('debug:stocks/getPrices');
var yahooFinance = require('yahoo-finance');
import { enhanceStock } from '../../helpers/EnhanceStockResult';
export default (req, res, next) => {

  debug("getting stock prices");

  var promise = new Promise(function (resolve, reject) {
    let returnList = [];
    let list = req.body.tickers.map(tickr => {

      yahooFinance.snapshot({
        symbol: tickr,
        fields: ['s', 'n', 'l1'],
      }, function (err, snapshot) {
        snapshot = enhanceStock(snapshot);

        returnList.push(snapshot);
        if(returnList.length == req.body.tickers.length) resolve(returnList);
      });
    })
  });

  promise.then(function (result) {
    req.app.set('response', result);
    next();
  }, function (err) {
    debug(err); // Error: "It broke"
  });


};
