'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserConstants from '../constants/UserConstants.js';

import { changeUILanguage, loadUser, saveUserData } from '../utils/ApiUtils';
import { fromJS } from 'immutable';
import UserStore from '../stores/UserStore.js';
import defaults from '../config/Defaults';
import {collectionsToPortfolioMap} from '../../shared/helpers/stocks';

import RealTimeActionCreators from './RealTimeActionCreators';
import HistoricalActions from './HistoricalActionCreators';

let userDataToSave = {};

var UserActionCreators = {

  changeUILanguage(language) {
    //AppDispatcher.handleViewAction({
    //    actionType: UserConstants.USER_CHANGE_LANGUAGE,
    //    language: language,
    //});
  },


  addStockEntryCollectionToPortfolio(stockEntryCollection,resultObject){

    // optimistically update local portfolio object

    AppDispatcher.handleViewAction({
      actionType: UserConstants.USER_ADD_STOCK_ENTRY_COLLECTION,
      data: { entries:stockEntryCollection, resultObject}
    });

    let listOfTickers = stockEntryCollection.map(entries => {
      return entries.ticker;
    });

    // Get extensive stock data
    RealTimeActionCreators.getStockData(listOfTickers);

    listOfTickers.forEach(ticker =>{
      HistoricalActions.getHistoricalDividends({ticker});
    });

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

    uid = '1448488808946-7120';
    //uid = 'DIV';
    //uid = 'TEST_USER'

    loadUser({uid: uid});
  },
};

export default UserActionCreators;
