'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserConstants from '../constants/UserConstants.js';
import { getHistoricalDividends, getHistoricalPrices } from '../utils/ApiUtils';
import defaults from '../config/Defaults';

let already_fetched = [];

var HistoricalActionCreators = {

  getHistoricalDividends(data){
    if(already_fetched.indexOf(data.ticker) !== -1){
      console.log("Already got dividend data for " + data.ticker);
      return;
    }
    data.options = 'dividends';
    getHistoricalDividends(data);
    already_fetched.push(data.ticker);
  },
  getHistoricalPrices(data){
    getHistoricalPrices(data);
  },

};

export default HistoricalActionCreators;
