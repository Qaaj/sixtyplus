import { get, post, put, del } from '../utils/RequestUtil';
import ServerActionCreators from '../actions/ServerActionCreators';
import NotificationActions from '../actions/NotificationActionCreators';

let currentProtocol = window.location.protocol;
let baseUrl = window.location.host;

const API_URL = `${currentProtocol}//${baseUrl}/api`;


export function saveUserSettings(data){

  let url = `${API_URL}/saveUserSettings`;

  post({url, data})
    .then(
      (response) => {
        //ServerActionCreators.userUpdated(response.body);
      },

      (error) => {

        console.error('Error: ', error);
      }
    );
}

export function loadUser(data){

  let url = `${API_URL}/loadUser`;

  post({url, data})
    .then(
      (response) => {

        ServerActionCreators.userLoaded(response.body);
      },

      (error) => {

        console.error('Error: ', error);
      }
    );
}

export function loadUserFinancialProfile(data){

  let url = `${API_URL}/loadUserFinancialProfile`;

  post({url, data})
    .then(
      (response) => {

        ServerActionCreators.userFinancialProfileLoaded(response.body);
      },

      (error) => {

        console.error('Error: ', error);
      }
    );
}

export function saveUserFinancialProfile(data){

  let url = `${API_URL}/saveUserFinancialProfile`;

  post({url, data})
    .then(
      (response) => {

       console.log(response.body);
      },

      (error) => {

        console.error('Error: ', error);
      }
    );
}
