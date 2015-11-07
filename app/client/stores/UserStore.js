'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import UserConstants from '../constants/UserConstants';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import { Map, fromJS } from 'immutable';

const CHANGE_EVENT = 'change';

let _userObject = Map();
let _userSettings = fromJS({

});

function _setSettings(userSettingsObj) {
    _userSettings = _userSettings.merge(userSettingsObj);
}

const UserStore = assign({}, EventEmitter.prototype, {
    getUser() {
        return _userObject.toJS();
    },

    getUserSettings() {
        return _userSettings.toJS();
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

UserStore.dispatchToken = AppDispatcher.register(function(payload) {
    const action = payload.action;

    switch (action.actionType) {

        case UserConstants.USER_CHANGE_LANGUAGE:

            UserStore.emitChange();
            break;


        case UserConstants.USER_LOADED:
            _userObject = fromJS(action.data);
            UserStore.emitChange();
            break;

        default:
            return true;
    }

    return true;
});

export default UserStore;
