'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserConstants from '../constants/UserConstants.js';
import { changeUILanguage } from '../utils/ApiUtils';

var UserActionCreators = {
    changeUILanguage(language) {
        ApiUtils.updateUser({language:language});
        AppDispatcher.handleViewAction({
            actionType: UserConstants.USER_CHANGE_LANGUAGE,
            language: language,
        });
    },
};

export default UserActionCreators;
