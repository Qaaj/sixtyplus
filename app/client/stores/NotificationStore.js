import AppDispatcher from '../dispatcher/AppDispatcher';
import NotificationConstants from '../constants/NotificationConstants';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import { Map, Record } from 'immutable';

const CHANGE_EVENT = 'change';

let _notification = Map();
let _notificationRecord = Record({
    isVisible: true, // @boolean
    type: 'info', // warning, success, loader
    message: 'Overwrite me!', // @string
    delay: 3000, // @number
});

const NotificationStore = assign({}, EventEmitter.prototype, {
    getNotification() {
        return _notification.toJS();
    },

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
});

// Register to handle all updates
NotificationStore.dispatchToken = AppDispatcher.register(function(payload) {
    const action = payload.action;
    switch (action.actionType) {
        case NotificationConstants.NOTIFICATION_SET:
            _notification = new _notificationRecord(action.options);
            NotificationStore.emitChange();
            break;

        case NotificationConstants.NOTIFICATION_DESTROY:
            _notification = Map();
            NotificationStore.emitChange();
            break;

        default:
            return true;
    }

    return true; // No errors.  Needed by promise in dispatcher.
});

export default NotificationStore;