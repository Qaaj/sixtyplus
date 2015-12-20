'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import { Map, fromJS } from 'immutable';
const CHANGE_EVENT = 'change';
import defaults from '../config/Defaults';
import News from '../classes/News';

let _newsObject = null;


const NewsStore = assign({}, EventEmitter.prototype, {

  getNews() {
    return _newsObject;
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



NewsStore.dispatchToken = AppDispatcher.register(function (payload) {

  const action = payload.action;

  switch (action.actionType) {

  case "NEWS_UPDATE":

    _newsObject = new News(action.data);

    NewsStore.emitChange();

  break;

  default:
  return true;
}

return true;
})
;

export default NewsStore;
