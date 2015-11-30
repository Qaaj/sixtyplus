'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserConstants from '../constants/UserConstants.js';
import { changeUILanguage, loadUser, saveUserData } from '../utils/ApiUtils';
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

    console.log(portfolioData);
    var userData = UserStore.getUser().userData;
    let existingPortfolio = userData.portfolio;
    if(!userData.portfolio) existingPortfolio = {};

    let stocksToAdd = Object.keys(portfolioData);

    stocksToAdd.map(ticker => {
      if (existingPortfolio[ticker]) {
        existingPortfolio[ticker] = existingPortfolio[ticker].concat(portfolioData[ticker]);
      } else {
        existingPortfolio[ticker] = (portfolioData[ticker]);
      }
    })

    if (userData) userData.portfolio = existingPortfolio;

    AppDispatcher.handleViewAction({
      actionType: UserConstants.USER_SAVE_DATA,
      data: userData,
    });

    let portfolioList = Object.keys(userData.portfolio);

    RealTimeActionCreators.getStockPrices(portfolioList);

    console.log(userData);
    this.saveUserData(userData);
  },

  saveUserData(mergeUserData){


    var userData = fromJS(UserStore.getUser().userData);
    let mergedUserData = userData;
    if (userData) mergedUserData = userData.mergeDeep(mergeUserData).toJS();

    AppDispatcher.handleViewAction({
      actionType: UserConstants.USER_SAVE_DATA,
      data: mergedUserData,
    });

    saveUserData(mergedUserData, UserStore.getUser().uid);

  },

  loadUser() {

    let uid;

    if (localStorage.getItem('uid') == null || localStorage.getItem('uid') == "") {
      uid = new Date().getTime() + "-" + Math.round(Math.random() * 10000);
      localStorage.setItem('uid', uid);
    } else {
      uid = localStorage.getItem('uid');
    }

    if(window.location.hostname.indexOf("sixtyplus-test") != -1) uid = 'TEST_USER';

    loadUser({uid: uid});
  },
};

export default UserActionCreators;
