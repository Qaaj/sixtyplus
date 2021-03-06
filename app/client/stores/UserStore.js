import AppDispatcher from '../dispatcher/AppDispatcher';
import UserConstants from '../constants/UserConstants';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import { Map, fromJS } from 'immutable';
import asap from 'asap';
import User from '../classes/User';
import NotificationActionCreators from '../actions/NotificationActionCreators';
import {getTranslation, setLanguageMap } from '../utils/LangUtils';
import { loadUserFinancialProfile,saveUserFinancialProfile } from '../api/UserAPI';
import noSpam from '../../shared/utils/noSpam'

const CHANGE_EVENT = 'change';

let _userMap = Map();
const spammer = new noSpam();

let newLangInstance = (...args)=>{return getTranslation(...args)};

_userMap = _userMap.set('lang', newLangInstance);
_userMap = _userMap.set("class",new User());


const UserStore = assign({}, EventEmitter.prototype, {
  getUser() {
    return _userMap;
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
        _userMap = _userMap.setIn(save.location,save.value);
      });

      Object.keys(dataChanged).forEach(changed =>{
        if(changed === 'financial_profile') saveUserFinancialProfile(_userMap.get('financial_profile'));
      })

      UserStore.emitChange();

      break;

    case UserConstants.USER_FINANCIAL_PROFILE_LOADED:
      _userMap = _userMap.set('financial_profile',fromJS(action.data));
      spammer.go(emitTheChange, 1000);

      break;

    case UserConstants.USER_LOADED:

      // Load the User's financial profile if it's available (from the Planner page)
      loadUserFinancialProfile({ uid:action.data.objectId});

      localStorage.setItem('uid', action.data.objectId);
      _userMap = fromJS(action.data);
      _userMap = _userMap.set("class",new User());

      // Translation stuff
      let newLangInstance = (...args)=>{return getTranslation(...args)};
      _userMap = _userMap.set('lang',newLangInstance);

      NotificationActionCreators.userLoggedIn(_userMap);
      spammer.go(emitTheChange, 1000);

      break;

    default:
      return true;
  }

  return true;
});

function emitTheChange(){
  UserStore.emitChange();
}

export default UserStore;
