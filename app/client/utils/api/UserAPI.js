import { get, post, put, del } from '../RequestUtil';
import ServerActionCreators from '../../actions/ServerActionCreators';
import NotificationActions from '../../actions/NotificationActionCreators';

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
