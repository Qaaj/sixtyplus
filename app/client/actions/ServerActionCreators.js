import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserConstants from '../constants/UserConstants.js';
import RealTimeConstants from '../constants/RealTimeConstants.js';
import HistoricalConstants from '../constants/HistoricalConstants.js';

var ServerActionCreators = {

  tickersLoaded(data){
    AppDispatcher.handleServerAction({
      actionType: RealTimeConstants.REAL_TIME_STOCKS_UPDATE,
      data: data,
    });
  },

  tickerLoaded(data){
    AppDispatcher.handleServerAction({
      actionType: RealTimeConstants.REAL_TIME_STOCK_UPDATE,
      data: data,
    });
  },

  userLoaded(data) {
    AppDispatcher.handleServerAction({
      actionType: UserConstants.USER_LOADED,
      data: data,
    });
  },

  historicalPricesLoaded(data) {
    AppDispatcher.handleServerAction({
      actionType: HistoricalConstants.HISTORICAL_PRICES_UPDATE,
      data: data,
    });
  },

   historicalDividendsLoaded(data) {
    AppDispatcher.handleServerAction({
      actionType: HistoricalConstants.HISTORICAL_DIVIDENDS_UPDATE,
      data: data,
    });
  },

  newsLoaded(data){
    AppDispatcher.handleServerAction({
      actionType: "NEWS_UPDATE",
      data: data,
    });
  },


};

export default ServerActionCreators;
