const debug = require('debug')('debug:news/getStockNews');
var rsj = require('rsj');
import DataStore from '../../stores/DataStore'

export default (req, res) => {

  let list = req.body.tickers;

  if (!Array.isArray(list)) list = [list];
  debug("getting stock news: ", list);

  var promise = new Promise(function (resolve, reject) {
    let returnList = {};
    list.map(ticker => {

      let cache = DataStore.getCachedData({option: "news", ticker});

      cache.then(function (result) {

        if (result) {
          // Item was found in the cache, return it
          debug('news from cache: ', ticker);
          returnList[ticker] = JSON.parse(result);
          if (Object.keys(returnList).length == req.body.tickers.length) resolve(returnList);

        } else {
          // Item was not found in the cache, get it and then save it
          debug('news from server: ', ticker);
          rsj.r2j('http://www.google.com/finance/company_news?q=' + ticker + '&output=rss', function (json) {
            DataStore.setCachedData({option: "news", ticker, json});
            returnList[ticker] = JSON.parse(json);
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
}

