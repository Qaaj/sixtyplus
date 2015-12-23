import AppDispatcher from '../dispatcher/AppDispatcher';
import PortfolioActionCreators from '../actions/PortfolioActionCreators';
import PortfolioConstants from '../constants/PortfolioConstants';
import UserConstants from '../constants/UserConstants';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import { Map, fromJS } from 'immutable';
const CHANGE_EVENT = 'change';
import UserStore from './UserStore';
import defaults from '../config/Defaults';
import StockPortfolio from '../classes/StockPortfolio';
import { loadUserPortfolioData } from '../utils/api/PortfolioAPI';


let _portfolioMap = Map();


const PortfolioStore = assign({}, EventEmitter.prototype, {

  getPortfolioMap() {
    return _portfolioMap;
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

    case UserConstants.USER_LOADED:  // Load the users portfolio
      let uid = action.data.objectId;
      loadUserPortfolioData(uid);
      break;

    case PortfolioConstants.PORTFOLIO_LOADED:
      let portfolio = new StockPortfolio(action.data)
      _portfolioMap = _portfolioMap = fromJS(portfolio);
      PortfolioStore.emitChange();
      break;

    default:
      return true;
  }

  return true;

});

export default PortfolioStore;
