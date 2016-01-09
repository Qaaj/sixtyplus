import AppDispatcher from '../dispatcher/AppDispatcher';
import PortfolioActionCreators from '../actions/PortfolioActionCreators';
import PortfolioConstants from '../constants/PortfolioConstants';
import RealTimeConstants from '../constants/RealTimeConstants';
import UserConstants from '../constants/UserConstants';
import HistoricalConstants from '../constants/HistoricalConstants';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import { Map, fromJS, List } from 'immutable';
const CHANGE_EVENT = 'change';
import UserStore from './UserStore';
import defaults from '../config/Defaults';
import StockPortfolio from '../classes/StockPortfolio';
import DividendCollection from '../classes/DividendCollection';
import StockEntry from '../classes/StockEntry';
import StockSymbol from '../classes/StockSymbol';
import { loadUserPortfolioData } from '../api/PortfolioAPI';
import HistoricalActions from '../actions/HistoricalActionCreators';
import noSpam from '../../shared/utils/noSpam'


const spammer = new noSpam();
let _portfolio = null;

const PortfolioStore = assign({}, EventEmitter.prototype, {

  getPortfolio() {
    return _portfolio;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});


PortfolioStore.dispatchToken = AppDispatcher.register(function (payload) {

  const action = payload.action;

  switch (action.actionType) {

    // Update the portfolio with dividend information
    case HistoricalConstants.HISTORICAL_DIVIDENDS_UPDATE:
      let dividends = new DividendCollection(action.data.result);
      _portfolio.updatePortfolioWithDividends(action.data.symbol, dividends.dividends);
      spammer.go(emitTheChange, 100);
      break;

    // Update the portfolio with historical prices
    case HistoricalConstants.HISTORICAL_PRICES_UPDATE:
      _portfolio.updateHistoricalPrices(action.data);
      spammer.go(emitTheChange, 500);
      break;

    // Update the portfolio with real-time information
    case RealTimeConstants.REAL_TIME_STOCKS_UPDATE:
      action.data.map(symbol => {
        if (symbol) _portfolio.updatePortfolioWithRTData(symbol);
      });
      spammer.go(emitTheChange, 500);
      break;

    case UserConstants.USER_LOADED:  // Load the users portfolio
      let uid = action.data.objectId;
      loadUserPortfolioData(uid);
      spammer.go(emitTheChange, 500);
      break;

    case PortfolioConstants.PORTFOLIO_LOADED:

      _portfolio = new StockPortfolio(action.data)
      _portfolio.flatsymbolList.forEach(symbol => {
        HistoricalActions.getHistoricalDividends({symbol});
        HistoricalActions.getHistoricalPrices({symbol, options: 'monthly', from: _portfolio.firstBuyDate.format("DD-MM-YYYY")});
      });
      spammer.go(emitTheChange, 500);
      break;

    default:
      return true;
  }

  return true;

});

function emitTheChange(){
  PortfolioStore.emitChange();
}


export default PortfolioStore;
