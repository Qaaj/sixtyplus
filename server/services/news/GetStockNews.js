const debug = require('debug')('debug:news/getStockNews');
var rsj = require('rsj');

export default (req, res) => {

  let list = req.body.tickers;

  if (!Array.isArray(list)) list = [list];
  debug("getting stock news: ", list);

  var promise = new Promise(function (resolve, reject) {
    let returnList = {};
    list.map(tickr => {
      rsj.r2j('http://www.google.com/finance/company_news?q=' + tickr + '&output=rss', function (json) {
        returnList[tickr] = JSON.parse(json);
        if (Object.keys(returnList).length == req.body.tickers.length) resolve(returnList);
      });
    })
  });

  promise.then(function (result) {
    res.send(result);
  }, function (err) {
    debug(err); // Error: "It broke"
  });
}

