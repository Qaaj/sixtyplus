'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserConstants from '../constants/UserConstants.js';
import { changeUILanguage, loadUser } from '../utils/ApiUtils';

var UserActionCreators = {

    changeUILanguage(language) {
        //AppDispatcher.handleViewAction({
        //    actionType: UserConstants.USER_CHANGE_LANGUAGE,
        //    language: language,
        //});
    },

    loadUser() {

        let uid;

        if(localStorage.getItem('uid') == null){
            uid = new Date().getTime() + "-" + Math.round(Math.random()*10000);
            localStorage.setItem('uid', uid);
        }else{
            uid = localStorage.getItem('uid');
        }

        loadUser({uid:uid});
    },
};

export default UserActionCreators;
