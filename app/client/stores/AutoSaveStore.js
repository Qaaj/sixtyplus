'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import UserConstants from '../constants/UserConstants';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import { Map, fromJS } from 'immutable';
import asap from 'asap';
import RealTimeActionCreators from '../actions/RealTimeActionCreators';
const CHANGE_EVENT = 'change';
import { getModuleSaveData } from '../../shared/helpers/autosave/saveModule';

let _saveObject = Map();

function _setSaveObject(_saveObj) {
  _saveObject = _saveObject.merge(_saveObj);
}

const AutoSaveStore = assign({}, EventEmitter.prototype, {

  getSaveObject() {
    return _saveObject.toJS();
  },

  saveModuleSetting(data) {
    let saveData = getModuleSaveData(data)
    console.log(saveData);
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
