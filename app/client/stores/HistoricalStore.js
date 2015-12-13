'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import HistoricalConstants from '../constants/HistoricalConstants';
import HistoricalActions from '../actions/HistoricalActionCreators';
import UserConstants from '../constants/UserConstants';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import { Map, fromJS } from 'immutable';
const CHANGE_EVENT = 'change';
import defaults from '../config/Defaults';
import DividendCollection from '../classes/DividendCollection';

let timer = null;

let _historicalData = Map();


const HistoricalStore = assign({}, EventEmitter.prototype, {

  getHistoricalData() {
    return _historicalData.toJS();
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


HistoricalStore.dispatchToken = AppDispatcher.register(function (payload) {

  const action = payload.action;

  switch (action.actionType) {

    case HistoricalConstants.HISTORICAL_PRICES_UPDATE:

      _historicalData = _historicalData.setIn([action.data.ticker, action.data.option], action.data.result);

      HistoricalStore.emitChange();

      break;

    case HistoricalConstants.HISTORICAL_DIVIDENDS_UPDATE:

      let dividends = new DividendCollection(action.data.result);

      _historicalData = _historicalData.setIn([action.data.ticker, 'dividends'], dividends);

      HistoricalStore.emitChange();

      break;

    default:
      return true;
  }

  return true;
})
;

export default HistoricalStore;
