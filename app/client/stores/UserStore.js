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


  getStockPortfolio(){
    return _stockPortfolio;
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

      let entryArray = createEntriesFromUserObjectPortfolio(_userObject.toJS().userData.portfolio);

      _stockPortfolio = new StockPortfolio(entryArray);
      _userObject = _userObject.set("stockPortfolio", _stockPortfolio);

      let newLangInstance = (...args)=>{return getTranslation(...args)};

      _userObject = _userObject.set('lang',newLangInstance);

      let temp = {
        'quickstart':'Quickstart',
        'portfolio': 'Portfolio',
        'import': 'Import'
      }

      setLanguageMap(temp);

      NotificationActionCreators.userLoggedIn(_userObject.toJS());

      UserStore.emitChange();
      break;

    default:
      return true;
  }

  return true;
});

export default UserStore;
