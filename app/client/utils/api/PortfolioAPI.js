import { get, post, put, del } from '../RequestUtil';
import ServerActionCreators from '../../actions/ServerActionCreators';
import NotificationActions from '../../actions/NotificationActionCreators';

let currentProtocol = window.location.protocol;
let baseUrl = window.location.host;

const API_URL = `${currentProtocol}//${baseUrl}/api`;


export function loadUserPortfolioData(uid){

  let url = `${API_URL}/loadPortfolio`;
  let data = {uid};

  post({url, data})
    .then(
      (response) => {
        ServerActionCreators.portfolioLoaded(response.body);
        NotificationActions.setNotification({
          isVisible: true,
          type: 'success',
          message:"Portfolio has been succesfully loaded.",
          delay: 1500
        });
      },

      (error) => {
        NotificationActions.setNotification({
          isVisible: true,
          type: 'warning',
          message:"Something went wrong while loading the portfolio.",
          delay: 1500
        });
      }
    );
}


export function addEntry(data,resultObject){

  let url = `${API_URL}/addPortfolioEntry`;

  post({url, data})
    .then(
      (response) => {
        resultObject.success();
        NotificationActions.setNotification({
          isVisible: true,
          type: 'success',
          message:"Portfolio has been succesfully updated.",
          delay: 1500
        });
      },

      (error) => {
        resultObject.fail();
        NotificationActions.setNotification({
          isVisible: true,
          type: 'warning',
          message:"Something went wrong updating the portfolio.",
          delay: 1500
        });
      }
    );

}

