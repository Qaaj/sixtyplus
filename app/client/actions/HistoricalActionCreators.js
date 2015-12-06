'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserConstants from '../constants/UserConstants.js';
import { getHistoricalDividends, getHistoricalPrices } from '../utils/ApiUtils';
import defaults from '../config/Defaults';

var HistoricalActionCreators = {

  getHistoricalDividends(data){
    data.options = 'dividends';
    getHistoricalDividends(data);
  },
  getHistoricalPrices(data){
    getHistoricalPrices(data);
  },

};

export default HistoricalActionCreators;
