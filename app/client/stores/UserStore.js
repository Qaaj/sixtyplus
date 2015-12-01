'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import UserConstants from '../constants/UserConstants';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import { Map, fromJS } from 'immutable';
import asap from 'asap';
import StockEntry from '../classes/StockEntry';
import StockPortfolio from '../classes/StockPortfolio';
import { createEntriesFromUserObjectPortfolio } from '../../shared/helpers/stocks'
import RealTimeActionCreators from '../actions/RealTimeActionCreators';
import NotificationActionCreators from '../actions/NotificationActionCreators';
import {getTranslation, setLanguageMap } from '../utils/LangUtils';
import { saveUserData,saveUserPortfolioData } from '../utils/ApiUtils';

const CHANGE_EVENT = 'change';

let _userObject = Map();
let _userData = Map();
let _stockPortfolio = null;

let newLangInstance = (...args)=>{return getTranslation(...args)};
_userObject = _userObject.set('lang', newLangInstance);

const UserStore = assign({}, EventEmitter.prototype, {
  getUser() {
    return _userObject.toJS();
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

UserStore.dispatchToken = AppDispatcher.register(function (payload) {
  const action = payload.action;

  switch (action.actionType) {

    case UserConstants.USER_CHANGE_LANGUAGE:

      UserStore.emitChange();
      break;

    case UserConstants.USER_ADD_STOCK_ENTRY_COLLECTION:

      _stockPortfolio.addStockEntryCollection(action.data.entries)
      // Save the client-side object
      _userObject = _userObject.set("stockPortfolio", _stockPortfolio);
      // Save the server-side object
      _userObject = _userObject.setIn(['userData','portfolio'],_stockPortfolio.userDataObject);

      saveUserPortfolioData(_userObject.get('userData'),_userObject.get('uid'),action.data.resultObject);

      UserStore.emitChange();
      break;

    case UserConstants.USER_SAVE_DATA:
      _userData = _userData.merge(fromJS(action.data));
      _userObject = _userObject.set("userData",_userData);
      UserStore.emitChange();
      break;

    case UserConstants.USER_LOADED:

      if (action.data.currency == "EURO") action.data.currency = "€";
      if (action.data.currency == "DOLLAR") action.data.currency = "$";
      if (action.data.currency == "POUND") action.data.currency = "£";

      _userObject = fromJS(action.data);

      // Create the stockportfolio object using the data from the server
      _stockPortfolio = new StockPortfolio(_userObject.toJS().userData.portfolio);
      _userObject = _userObject.set("stockPortfolio", _stockPortfolio);

      // Translation stuff
      let newLangInstance = (...args)=>{return getTranslation(...args)};
      _userObject = _userObject.set('lang',newLangInstance);

      NotificationActionCreators.userLoggedIn(_userObject.toJS());
      UserStore.emitChange();

      break;

    default:
      return true;
  }

  return true;
});

export default UserStore;
