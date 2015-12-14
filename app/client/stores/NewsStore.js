'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
//import RealTimeConstants from '../constants/RealTimeConstants';
//import RealTimeActionCreators from '../actions/RealTimeActionCreators';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import { Map, fromJS } from 'immutable';
const CHANGE_EVENT = 'change';
import defaults from '../config/Defaults';

let _newsObject = Map();
_newsObject = _newsObject.set("hasNews",false);


const NewsStore = assign({}, EventEmitter.prototype, {

  getNews() {
    return _newsObject.toJS();
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

    Object.keys(action.data).map(ticker =>{
      _newsObject = _newsObject.setIn(['items',ticker],action.data[ticker]);
    });

    _newsObject = _newsObject.set("hasNews",true);

    NewsStore.emitChange();

  break;

  default:
  return true;
}

return true;
})
;

export default NewsStore;
