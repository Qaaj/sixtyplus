import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserConstants from '../constants/UserConstants.js';
import { getHistoricalDividends, getHistoricalPrices } from '../api/StockAPI';
import defaults from '../config/Defaults';

let already_fetched = [];

var HistoricalActionCreators = {

  getHistoricalDividends(data){
    if(already_fetched.indexOf(data.symbol) !== -1){
      return;
    }
    data.options = 'dividends';
    getHistoricalDividends(data);
    already_fetched.push(data.symbol);
  },
  getHistoricalPrices(data){
    getHistoricalPrices(data);
  },

};

export default HistoricalActionCreators;
