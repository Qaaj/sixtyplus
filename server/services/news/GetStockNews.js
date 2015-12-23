const debug = require('debug')('debug:news/getStockNews');
var rsj = require('rsj');
import DataStore from '../../stores/DataStore'
import OfflineStore from '../../stores/OfflineStore'

export default (req, res, next) => {

  let list = req.body.symbols;

  if (!Array.isArray(list)) list = [list];
  debug("getting stock news: ", list);

  var promise = new Promise(function (resolve, reject) {
    let returnList = {};
    list.map(symbol => {

      let cache = DataStore.getCachedData({option: "news", symbol});

      cache.then(function (json) {

        if (json) {
          // Item was found in the cache, return it
          debug('news from cache: ', symbol);
          returnList[symbol] = json;
          if (Object.keys(returnList).length == req.body.symbols.length) resolve(returnList);

        } else {
          // Item was not found in the cache, get it and then save it
          debug('news from server: ', symbol);
          // Hack for Google Finance vs Yahoo Finance
          let symbolURL = symbol;
          if(symbolURL.indexOf(".AS") !== -1){
            symbolURL = 'AMS:' + symbolURL.split('.')[0];
          }else{
            //symbolURL = 'NYSE:' + symbolURL;
          }
          let url = 'http://www.google.com/finance/company_news?q=' + symbolURL + '&output=rss'
          rsj.r2j(url, function (json) {
            DataStore.setCachedData({option: "news", symbol, json:JSON.parse(json)});
            returnList[symbol] = JSON.parse(json);
            if (Object.keys(returnList).length == req.body.symbols.length) resolve(returnList);
          });

        }
      });


    })
  });

  promise.then(function (result) {
    req.app.set('response',result);
    next();
  }, function (err) {
    debug(err); // Error: "It broke"
  });
}

