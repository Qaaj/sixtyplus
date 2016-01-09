import AppDispatcher from '../dispatcher/AppDispatcher';
import UserConstants from '../constants/UserConstants';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import { Map, fromJS } from 'immutable';
import asap from 'asap';
import StockEntry from '../classes/StockEntry';
import NotificationActionCreators from '../actions/NotificationActionCreators';
import {getTranslation, setLanguageMap } from '../utils/LangUtils';
import { loadUserFinancialProfile,saveUserFinancialProfile } from '../api/UserAPI';

const CHANGE_EVENT = 'change';

let _userObject = Map();

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

      let saveObjects = action.data;
      let dataChanged = {};

      saveObjects.forEach(save =>{
        dataChanged[save.root] = "CHANGED";
        _userObject = _userObject.setIn(save.location,save.value);
      });

      Object.keys(dataChanged).forEach(changed =>{
        if(changed === 'financial_profile') saveUserFinancialProfile(_userObject.get('financial_profile'));
      })

      UserStore.emitChange();

      break;

    case UserConstants.USER_FINANCIAL_PROFILE_LOADED:
      _userObject = _userObject.set('financial_profile',fromJS(action.data));
      UserStore.emitChange();
      break;

    case UserConstants.USER_LOADED:

      // Load the User's financial profile if it's available (from the Planner page)
      loadUserFinancialProfile({ uid:action.data.objectId});

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
