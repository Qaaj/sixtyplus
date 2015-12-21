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

      cache.then(function (json) {

        if (json) {
          // Item was found in the cache, return it
          debug('news from cache: ', ticker);
          returnList[ticker] = json;
          if (Object.keys(returnList).length == req.body.tickers.length) resolve(returnList);

        } else {
          // Item was not found in the cache, get it and then save it
          debug('news from server: ', ticker);
          // Hack for Google Finance vs Yahoo Finance
          let tickerURL = ticker;
          if(tickerURL.indexOf(".AS") !== -1){
            tickerURL = 'AMS:' + tickerURL.split('.')[0];
          }else{
            //tickerURL = 'NYSE:' + tickerURL;
          }
          let url = 'http://www.google.com/finance/company_news?q=' + tickerURL + '&output=rss'
          rsj.r2j(url, function (json) {
            DataStore.setCachedData({option: "news", ticker, json:JSON.parse(json)});
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

