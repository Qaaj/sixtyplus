'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserConstants from '../constants/UserConstants.js';
import { changeUILanguage, loadUser, updateUserData } from '../utils/ApiUtils';
import { fromJS } from 'immutable';
import UserStore from '../stores/UserStore.js';
import defaults from '../config/Defaults';

import RealTimeActionCreators from './RealTimeActionCreators';

let userDataToSave = {};

var UserActionCreators = {

  changeUILanguage(language) {
    //AppDispatcher.handleViewAction({
    //    actionType: UserConstants.USER_CHANGE_LANGUAGE,
    //    language: language,
    //});
  },

  updatePortfolio(portfolioData){

    var mergeUserData = fromJS({portfolio: portfolioData});
    var userData = fromJS(UserStore.getUser().userData);
    let mergedUserData = userData;
    if (userData) mergedUserData = userData.mergeDeep(mergeUserData).toJS();
    AppDispatcher.handleViewAction({
      actionType: UserConstants.USER_SAVE_DATA,
      data: mergedUserData,
    });


    if (userData && userData.portfolio) {

      const portfolioList = userData.portfolio.reduce((prev, curr, i) => {
        prev.push(curr[0].ticker);
        return prev
      }, []);

      RealTimeActionCreators.getStockPrices(portfolioList);
    }
    //RealTimeActionCreators.getStockPrices()
    this.saveUserData(mergedUserData);
  },

  saveUserData(mergeUserData){


    var userData = fromJS(UserStore.getUser().userData);
    let mergedUserData = userData;
    if (userData) mergedUserData = userData.mergeDeep(mergeUserData).toJS();

    AppDispatcher.handleViewAction({
      actionType: UserConstants.USER_SAVE_DATA,
      data: mergedUserData,
    });

    updateUserData(mergedUserData,UserStore.getUser().uid);

  },

  loadUser() {

    let uid;

    if (localStorage.getItem('uid') == null || localStorage.getItem('uid') == "") {
      uid = new Date().getTime() + "-" + Math.round(Math.random() * 10000);
      localStorage.setItem('uid', uid);
    } else {
      uid = localStorage.getItem('uid');
    }

    loadUser({uid: uid});
  },
};

export default UserActionCreators;
