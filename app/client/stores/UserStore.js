import AppDispatcher from '../dispatcher/AppDispatcher';
import UserConstants from '../constants/UserConstants';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import { Map, fromJS } from 'immutable';
import asap from 'asap';
import StockEntry from '../classes/StockEntry';
import NotificationActionCreators from '../actions/NotificationActionCreators';
import {getTranslation, setLanguageMap } from '../utils/LangUtils';
import { saveUserData,saveUserPortfolioData } from '../utils/ApiUtils';

const CHANGE_EVENT = 'change';

let _userObject = Map();
let _userData = Map();

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
      break;

    case UserConstants.USER_SAVE_DATA:
      break;

    case UserConstants.USER_LOADED:

      localStorage.setItem('uid', action.data.objectId);
      _userObject = fromJS(action.data);
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
