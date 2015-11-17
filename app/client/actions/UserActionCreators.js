'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserConstants from '../constants/UserConstants.js';
import { changeUILanguage, loadUser, updateUserData } from '../utils/ApiUtils';
import { fromJS } from 'immutable';
import UserStore from '../stores/UserStore.js';
import defaults from '../config/Defaults';

let userDataToSave = {};
let lastTimeOut;

var UserActionCreators = {

  changeUILanguage(language) {
    //AppDispatcher.handleViewAction({
    //    actionType: UserConstants.USER_CHANGE_LANGUAGE,
    //    language: language,
    //});
  },

  updatePortfolio(portfolioData){
    var mergeUserData = fromJS({ portfolio: portfolioData });
    var userData = fromJS(UserStore.getUser().userData);
    var mergedUserData = userData.mergeDeep(mergeUserData).toJS();
    this.saveUserData(mergedUserData);
  },

  saveUserData(userData){

    userDataToSave = userData;

    // Don't spam the API, set a timeout for saving
    clearTimeout(lastTimeOut);
    lastTimeOut = setTimeout(()=> {

      userData.uid = UserStore.getUser().uid;

      AppDispatcher.handleViewAction({
        actionType: UserConstants.USER_SAVE_DATA,
        data: userDataToSave,
      });

      updateUserData(userDataToSave);
    }, defaults.saveTimeout);

  },

  loadUser() {

    let uid;

    if (localStorage.getItem('uid') == null) {
      uid = new Date().getTime() + "-" + Math.round(Math.random() * 10000);
      localStorage.setItem('uid', uid);
    } else {
      uid = localStorage.getItem('uid');
    }

    loadUser({uid: uid});
  },
};

export default UserActionCreators;
