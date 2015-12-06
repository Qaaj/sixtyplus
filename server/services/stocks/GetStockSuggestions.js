const debug = require('debug')('debug:user/getStockSuggestions');

import DataStore from '../../stores/DataStore'

var yahooFinance = require('yahoo-finance');

export default (req, res) => {

  debug("getting stock suggestions for: ", req.body.input);

  let keys = DataStore.getData().stockKeys;
  const regex = new RegExp('^' + req.body.input, 'i');
  const suggestions = keys.filter(result => regex.test(result));


  res.send(suggestions);


};
