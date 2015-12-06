const debug = require('debug')('debug:stock/getDividends');
var yahooFinance = require('yahoo-finance');
import { enhanceStock } from '../../helpers/EnhanceStockResult';
import http from 'http';
import {CSVtoJSON} from '../../helpers/json';

export default (req, res) => {


  let startYear = 1970;
  let endYear = 2015;

  if(!req.body.ticker) {
    res.send("No ticker");
    debug("No ticker provided");
    return;
  }
  if(req.body.start) startYear = req.body.start;
  if(req.body.end) startYear = req.body.end;

  debug("getting dividends for " +  req.body.ticker + " from " + startYear + " to " + endYear);

  let url = {
    host: 'real-chart.finance.yahoo.com'
    , port: 80
    , path: '/table.csv?s=' + req.body.ticker + '&a=00&b=2&c=' + startYear + '&d=08&e=9&f=' + endYear + '&g=v&ignore=.csv'
  }

  http.get(url, function (rs) {
    var data = ''
    rs.on('data', function (chunk) {
      data += chunk
    })
    rs.on('end', function () {
      res.setHeader('Content-Type', 'application/json');
      var result = CSVtoJSON(data);
      res.send(result);
    })
  })

  //snapshot = enhanceStock(snapshot);
  //res.send(snapshot)

};
