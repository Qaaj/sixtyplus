const debug = require('debug')('debug:user/getStockSuggestions');

import DataStore from '../../stores/DataStore'

var yahooFinance = require('yahoo-finance');

export default (req, res) => {

  debug("getting stock suggestions for: ", req.body.input);

  let suburbs = DataStore.getData().stockKeys;
  const regex = new RegExp('^' + req.body.input, 'i');
  const suggestions = suburbs.filter(suburb => regex.test(suburb));


  res.send(suggestions);


};
