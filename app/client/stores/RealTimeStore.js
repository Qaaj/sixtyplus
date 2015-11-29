'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import RealTimeConstants from '../constants/RealTimeConstants';
import RealTimeActionCreators from '../actions/RealTimeActionCreators';
import UserConstants from '../constants/UserConstants';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import { Map, fromJS } from 'immutable';
const CHANGE_EVENT = 'change';
import UserStore from './UserStore';
import defaults from '../config/Defaults';

let timer = null;

let _realTimeObject = Map();


const RealTimeStore = assign({}, EventEmitter.prototype, {

  getRealTimeData() {
    return _realTimeObject.toJS();
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


function startTimer() {

  if (!timer) {
    timer = setInterval(()=> {
      refreshPortfolio();
    }, defaults.refreshRate);
  }
}

function refreshPortfolio() {

  let _userObject = UserStore.getUser();

  if (_userObject.userData && _userObject.userData.portfolio) {
    let portfolio = fromJS(_userObject).getIn(['userData', 'portfolio']).toList().toJS();

    const portfolioList = portfolio.reduce((prev, curr, i) => {
      prev.push(curr[0].ticker);
      return prev
    }, []);

    RealTimeActionCreators.getStockData(portfolioList);
  }
}

//dividendYield: 1.68
//lastTradeDate: "2015-11-17T23:00:00.000Z"
//lastTradePriceOnly: 107.63
//name: "Gilead Sciences, Inc."
//peRatio: 9.88
//symbol: "GILD"

RealTimeStore.dispatchToken = AppDispatcher.register(function (payload) {

  const action = payload.action;

  switch (action.actionType) {

    case UserConstants.USER_LOADED:

      refreshPortfolio();
      startTimer();

  break;

  case RealTimeConstants.REAL_TIME_STOCKS_UPDATE:

  action.data.map(ticker => {
    if(ticker) _realTimeObject = _realTimeObject.set(ticker.symbol, ticker)
  });

  RealTimeStore.emitChange();

  break;

  case RealTimeConstants.REAL_TIME_STOCK_UPDATE:

  if(action.data.ticker && action.data.ticker.symbol){
    _realTimeObject = _realTimeObject.set(action.data.ticker.symbol, action.data.ticker);
    RealTimeStore.emitChange();
  }

  break;

  default:
  return true;
}

return true;
})
;

export default RealTimeStore;
