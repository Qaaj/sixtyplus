'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import UserConstants from '../constants/UserConstants';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import { Map, fromJS } from 'immutable';
import asap from 'asap';
import RealTimeActionCreators from '../actions/RealTimeActionCreators';
import UserActionCreators from '../actions/UserActionCreators';
const CHANGE_EVENT = 'change';

import defaults from '../config/Defaults';
let lastTimeOut = 0;


import { getModuleSaveData } from '../../shared/helpers/autosave/saveModule';

let _saveObject = Map();

function _setSaveObject(_saveObj) {
  _saveObject = _saveObject.merge(_saveObj);
}

const AutoSaveStore = assign({}, EventEmitter.prototype, {

  getSaveObject() {
    return _saveObject.toJS();
  },

  saveModuleSetting(module) {

    clearTimeout(lastTimeOut);

    // Don't spam the API, set a timeout for saving
    lastTimeOut = setTimeout(()=> {
      let saveData = getModuleSaveData(module);
      UserActionCreators.saveUserData(saveData);
    }, defaults.saveTimeout);

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

AutoSaveStore.dispatchToken = AppDispatcher.register(function (payload) {
  const action = payload.action;

  switch (action.actionType) {

    case UserConstants.USER_LOADED:
      AutoSaveStore.emitChange();
      break;


    default:
      return true;
  }

  return true;
});

export default AutoSaveStore;
