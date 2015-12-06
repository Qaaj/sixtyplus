const debug = require('debug')('debug:stock/getDividends');
var yahooFinance = require('yahoo-finance');
import { enhanceStock } from '../../helpers/EnhanceStockResult';
import http from 'http';
import {CSVtoJSON} from '../../helpers/json';
import moment from 'moment';

export default (req, res) => {

  let from = moment("01-01-2000","DD-MM-YYYY");
  let to = moment("31-12-2015","DD-MM-YYYY");
  let options = 'd';


  if(!req.body.ticker) {
    res.send("No ticker");
    debug("No ticker provided");
    return;
  }

  if(req.body.from) from = moment(req.body.from,"DD-MM-YYYY");
  if(req.body.to) to = moment(req.body.to,"DD-MM-YYYY");
  
  if(req.body.options) {
    if(req.body.options === 'daily') options = 'd';
    if(req.body.options === 'weekly') options = 'w';
    if(req.body.options === 'monthly') options = 'm';
    if(req.body.options === 'dividends') options = 'v';
  }

  debug("getting historical prices for " +  req.body.ticker + " from " + from.format('DD-MM-YYYY') + " to " + to.format('DD-MM-YYYY') + " (option: " + options + ')');

  let query = '/table.csv?s=' + req.body.ticker
            + '&a=' + from.month() //zero indexed
            + '&b=' + from.date()
            + '&c=' + from.year()
            + '&d=' + to.month() //zero indexed
            + '&e=' + to.date()
            + '&f=' + to.year()
            + '&g=' + options     // (d,w or m)
            + '&ignore=.csv';

  debug(query);

  let url = {
    host: 'real-chart.finance.yahoo.com'
    , port: 80
    , path: query
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

};
