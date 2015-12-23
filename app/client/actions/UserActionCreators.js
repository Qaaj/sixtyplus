
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserConstants from '../constants/UserConstants.js';
import PortfolioConstants from '../constants/PortfolioConstants.js';

import { changeUILanguage, loadUser, saveUserData, deleteUserPortfolioData } from '../utils/ApiUtils';
import { fromJS } from 'immutable';
import UserStore from '../stores/UserStore.js';
import defaults from '../config/Defaults';
import {collectionsToPortfolioMap} from '../../shared/helpers/stocks';

import RealTimeActionCreators from './RealTimeActionCreators';
import HistoricalActions from './HistoricalActionCreators';

let userDataToSave = {};

var UserActionCreators = {

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

    let uid = "";

    if (localStorage.getItem('uid') !== null || localStorage.getItem('uid') !== "") {
      uid = localStorage.getItem('uid');
    }

    uid = 'FibjvFMpr6';

    loadUser({uid});

  },
};

export default UserActionCreators;
