'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserConstants from '../constants/UserConstants.js';
import { getStockPrice, getStockPrices } from '../utils/ApiUtils';
import { fromJS } from 'immutable';
import UserStore from '../stores/UserStore.js';
import defaults from '../config/Defaults';

let userDataToSave = {};
let lastTimeOut;

var RealTimeActionCreators = {


  getStockPrices(list){
    getStockPrices(list);
  },

  getStockPrice(ticker){
      getStockPrice(ticker);
  },

};

export default RealTimeActionCreators;
