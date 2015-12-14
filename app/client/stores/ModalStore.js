import AppDispatcher from '../dispatcher/AppDispatcher';
import ModalConstants from '../constants/ModalConstants';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import { Map, Record } from 'immutable';

const CHANGE_EVENT = 'change';

let _modal = Map();

let _modalRecord = Record({
  isVisible: false, // @boolean
  type: ModalConstants.PORTFOLIO_DETAIL, // confirmation
  message: '', // @string
  language: '',
  data: null,
  actionConfirm: null,
  actionCancel: null,
});

const ModalStore = assign({}, EventEmitter.prototype, {
  getModal() {
    return _modal.toJS();
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
ModalStore.dispatchToken = AppDispatcher.register(function (payload) {
  const action = payload.action;
  switch (action.actionType) {
    case ModalConstants.MODAL_SET:
      _modal = new _modalRecord(action.options);
      ModalStore.emitChange();
      break;

    case ModalConstants.MODAL_DESTROY:
      _modal = Map();
      ModalStore.emitChange();
      break;

    default:
      return true;
  }

  return true; // No errors.  Needed by promise in dispatcher.
});

export default ModalStore;
