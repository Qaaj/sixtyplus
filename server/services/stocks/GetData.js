const debug = require('debug')('debug:stock/getData');
import { enhanceStock } from '../../helpers/EnhanceStockResult';
var yahooFinance = require('yahoo-finance');
import DataStore from '../../stores/DataStore'

export default (req, res) => {

  let list = req.body.tickers;

  if (!Array.isArray(list)) list = [list];
  debug("getting stock data: ", list);

  var promise = new Promise(function (resolve, reject) {
    let returnList = [];
    list.map(ticker => {

      let cache = DataStore.getCachedData({option: "stockdata", ticker});
      cache.then(function (json) {

        if (json) {
          // Item was found in the cache, return it
          returnList.push(json);
          if (Object.keys(returnList).length == req.body.tickers.length) resolve(returnList);

        } else {
          // Item was not found in the cache, get it and then save it
          yahooFinance.snapshot({
            symbol: ticker,
            fields: ['s', 'n', 'd1', 'y', 'r', 'a', 'b', 'b2', 'b3', 'b4', 'c1', 'c6', 'd', 'e', 'e7', 'e8',
              'e9', 'g', 'h', 'j', 'j5', 'k', 'k4', 'l1', 'm3', 'm4', 'm5',
              'm7', 'o', 'p', 'p5', 'p6', 'r', 'r5', 'r6', 'r7', 't8', 'y'],
          }, function (err, json) {
            json = enhanceStock(json);
            DataStore.setCachedData({option: "stockdata", ticker, json});
            returnList.push(json);
            if (Object.keys(returnList).length == req.body.tickers.length) resolve(returnList);
          });
        }
      });


    })
  });

  promise.then(function (result) {
    res.send(result);
  }, function (err) {
    debug(err); // Error: "It broke"
  });


};
