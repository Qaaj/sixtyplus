'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserConstants from '../constants/UserConstants.js';
import { getStockPrice, getStockPrices, getStockSuggestions, getStockData } from '../utils/ApiUtils';
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

  getStockData(ticker){
    getStockData(ticker);
  },

};

export default RealTimeActionCreators;
