'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserConstants from '../constants/UserConstants.js';
import RealTimeConstants from '../constants/RealTimeConstants.js';

var ServerActionCreators = {

  tickersLoaded(data){
    AppDispatcher.handleServerAction({
      actionType: RealTimeConstants.REAL_TIME_STOCKS_UPDATE,
      data: data,
    });
  },

  tickerLoaded(data){
    AppDispatcher.handleServerAction({
      actionType: RealTimeConstants.REAL_TIME_STOCK_UPDATE,
      data: data,
    });
  },

  userLoaded(data) {
    AppDispatcher.handleServerAction({
      actionType: UserConstants.USER_LOADED,
      data: data,
    });
  },
};

export default ServerActionCreators;
