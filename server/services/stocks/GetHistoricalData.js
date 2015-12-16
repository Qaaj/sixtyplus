const debug = require('debug')('debug:stock/getHistoricalData');
var yahooFinance = require('yahoo-finance');
import http from 'http';
import {CSVtoJSON} from '../../helpers/json';
import moment from 'moment';
import DataStore from '../../stores/DataStore'


export default (req, res) => {

  let from = moment("01-01-1970", "DD-MM-YYYY");
  let to = moment("31-12-2020", "DD-MM-YYYY");
  let options = 'd';
  let option_string = 'daily';


  if (!req.body.ticker) {
    res.send("No ticker");
    debug("No ticker provided");
    return;
  }

  //if(req.body.from) from = moment(req.body.from,"DD-MM-YYYY");
  //if(req.body.to) to = moment(req.body.to,"DD-MM-YYYY");

  if (req.body.options) {
    if (req.body.options === 'daily') options = 'd';
    if (req.body.options === 'weekly') options = 'w';
    if (req.body.options === 'monthly') options = 'm';
    if (req.body.options === 'dividends') options = 'v';
    option_string = req.body.options;
  }

  let query = '/table.csv?s=' + req.body.ticker
    + '&a=' + from.month() //zero indexed
    + '&b=' + from.date()
    + '&c=' + from.year()
    + '&d=' + to.month() //zero indexed
    + '&e=' + to.date()
    + '&f=' + to.year()
    + '&g=' + options     // (d,w or m)
    + '&ignore=.csv';

  let url = {
    host: 'real-chart.finance.yahoo.com'
    , port: 80
    , path: query
  }

  let cacheID = "historical" + ":" + options;
  let cache = DataStore.getCachedData({option: cacheID, ticker: req.body.ticker});

  cache.then(function (json) {
    if (json) {

      if (req.body.from) {
        json = DataStore.getPartialHistoricalData({json: JSON.parse(json), from: moment(req.body.from, "DD-MMYYYY")});
        debug("getting historical " + option_string + " data for " + req.body.ticker + " from " + req.body.from + ' from CACHE');
      }
      let returnObject = {result: json, option: option_string, ticker: req.body.ticker};
      res.send(returnObject);

    } else {

      debug("getting historical " + option_string + " data for " + req.body.ticker + " from " + from.format('DD-MM-YYYY') + " to " + to.format('DD-MM-YYYY') + 'from SERVER');

      http.get(url, function (rs) {
        var data = ''
        rs.on('data', function (chunk) {
          data += chunk
        })
        rs.on('end', function () {

          var json = CSVtoJSON(data);

          // Save the all-time data in the cache
          DataStore.setCachedData({option: cacheID, ticker: req.body.ticker, json});

          // Retrieve the correct timeframe
          if (req.body.from) json = DataStore.getPartialHistoricalData({
            json: JSON.parse(json),
            from: moment(req.body.from, "DD-MMYYYY")
          });
          let returnObject = {result: json, option: option_string, ticker: req.body.ticker};
          res.setHeader('Content-Type', 'application/json');
          res.send(returnObject);
        })
      });

    }
  });

};

