'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserConstants from '../constants/UserConstants.js';

var ServerActionCreators = {

    userLoaded(data) {
        AppDispatcher.handleServerAction({
            actionType: UserConstants.USER_LOADED,
            data: data,
        });
    },
};

export default ServerActionCreators;
