
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserConstants from '../constants/UserConstants.js';
import PortfolioConstants from '../constants/PortfolioConstants.js';
import { loadUser, saveUserSettings } from '../api/UserAPI';
import { fromJS } from 'immutable';
import UserStore from '../stores/UserStore.js';
import defaults from '../config/Defaults';
import {collectionsToPortfolioMap} from '../../shared/helpers/stocks';

import RealTimeActionCreators from './RealTimeActionCreators';
import HistoricalActions from './HistoricalActionCreators';


var UserActionCreators = {

  saveUserSettings(mergeUserData){

    let uid = UserStore.getUser().uid
    //saveUserSettings(mergedUserData);

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
