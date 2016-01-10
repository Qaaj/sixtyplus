import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserConstants from '../constants/UserConstants.js';
import RealTimeConstants from '../constants/RealTimeConstants.js';
import HistoricalConstants from '../constants/HistoricalConstants.js';
import PortfolioConstants from '../constants/PortfolioConstants.js';

var ServerActionCreators = {

  symbolsLoaded(data){
    AppDispatcher.handleServerAction({
      actionType: RealTimeConstants.REAL_TIME_STOCKS_UPDATE,
      data: data,
    });
  },

  symbolLoaded(data){
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

  userFinancialProfileLoaded(data) {
    AppDispatcher.handleServerAction({
      actionType: UserConstants.USER_FINANCIAL_PROFILE_LOADED,
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

  portfolioLoaded(data){
    AppDispatcher.handleServerAction({
      actionType: PortfolioConstants.PORTFOLIO_LOADED,
      data:data,
    })
  },

  entryAdded(data){
    AppDispatcher.handleServerAction({
      actionType: PortfolioConstants.PORTFOLIO_ADD_ENTRY,
      data:data,
    })
  }



};

export default ServerActionCreators;
