const debug = require('debug')('debug:stock/getData');
import { enhanceStock } from '../../helpers/EnhanceStockResult';
var yahooFinance = require('yahoo-finance');

export default (req, res) => {

  let list = req.body.tickers;

  if (!Array.isArray(list)) list = [list];
  debug("getting stock data: ", list);

  var promise = new Promise(function (resolve, reject) {
    let returnList = [];
    list.map(tickr => {
      yahooFinance.snapshot({
        symbol: tickr,
        fields: ['s', 'n', 'd1', 'y', 'r', 'a', 'b', 'b2', 'b3', 'b4', 'c1', 'c6', 'd', 'e', 'e7', 'e8',
          'e9', 'g', 'h', 'j', 'j5', 'k', 'k4', 'l1', 'm3', 'm4', 'm5',
          'm7', 'o', 'p', 'p5', 'p6', 'r', 'r5', 'r6', 'r7', 't8', 'y'],
      }, function (err, snapshot) {
        snapshot = enhanceStock(snapshot);
        returnList.push(snapshot);
        if (returnList.length == req.body.tickers.length) resolve(returnList);
      });
    })
  });

  promise.then(function (result) {
    res.send(result);
  }, function (err) {
    debug(err); // Error: "It broke"
  });


};
