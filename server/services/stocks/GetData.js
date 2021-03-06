const debug = require('debug')('debug:stock/getData');
import { enhanceStock } from '../../helpers/EnhanceStockResult';
var yahooFinance = require('yahoo-finance');
import DataStore from '../../stores/DataStore'
import OfflineStore from '../../stores/OfflineStore'

export default (req, res, next) => {

  let list = req.body.symbols;

  if (!Array.isArray(list)) list = [list];
  debug("getting stock data: ", list);

  var promise = new Promise(function (resolve, reject) {
    let returnList = [];
    list.map(symbol => {

      let cache = DataStore.getCachedData({option: "stockdata", symbol});
      cache.then(function (json) {

        if (json) {
          // Item was found in the cache, return it
          returnList.push(json);
          if (Object.keys(returnList).length == req.body.symbols.length) resolve(returnList);

        } else {
          // Item was not found in the cache, get it and then save it
          yahooFinance.snapshot({
            symbol: symbol,
            fields: ['s', 'n', 'd1', 'y', 'r', 'a', 'b', 'b2', 'b3', 'b4', 'c1', 'c6', 'd', 'e', 'e7', 'e8',
              'e9', 'g', 'h', 'j', 'j5', 'k', 'k4', 'l1', 'm3', 'm4', 'm5',
              'm7', 'o', 'p', 'p5', 'p6', 'r', 'r5', 'r6', 'r7', 't8', 'y'],
          }, function (err, json) {
            json = enhanceStock(json);
            DataStore.setCachedData({option: "stockdata", symbol, json});
            returnList.push(json);
            if (Object.keys(returnList).length == req.body.symbols.length) resolve(returnList);
          });
        }
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
