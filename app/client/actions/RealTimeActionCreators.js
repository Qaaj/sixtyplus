'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserConstants from '../constants/UserConstants.js';
import { getStockPrice, getStockPrices, getStockSuggestions } from '../utils/ApiUtils';
import UserStore from '../stores/UserStore.js';
import defaults from '../config/Defaults';

let userDataToSave = {};
let lastTimeOut;

var RealTimeActionCreators = {

  getStockSuggestion(stock,callback){
    getStockSuggestions(stock,callback);
  },

  getStockPrices(list){
    getStockPrices(list);
  },

  getStockPrice(ticker){
      getStockPrice(ticker);
  },

};

export default RealTimeActionCreators;
