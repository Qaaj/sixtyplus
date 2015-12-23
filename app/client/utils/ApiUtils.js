import { get, post, put, del } from './RequestUtil';
import ServerActionCreators from '../actions/ServerActionCreators';
import NotificationActions from '../actions/NotificationActionCreators';

let currentProtocol = window.location.protocol;
let baseUrl = window.location.host;

const API_URL = `${currentProtocol}//${baseUrl}/api`;

export function changeUILanguage(data) {

    let url = `${API_URL}/createSingleBriefingAndLoad`;

    _post({url, data})
        .then(
        (response) => {

            //ServerActionCreators.briefingCreatedAndLoaded(response.body.response);

        },

        (error) => {

            console.error('Error: ', error);
        }
    );
}

export function getStockNews(tickers){
  let data = {tickers: tickers};

  let url = `${API_URL}/getStocksNews`;

  post({url, data})
    .then(
      (response) => {
        ServerActionCreators.newsLoaded(response.body)
      },

      (error) => {
        console.error('Error: ', error);
      }
    );
}



export function getStockPrice(ticker){

    let data = {ticker: ticker};

    let url = `${API_URL}/getStockPrice`;

    post({url, data})
      .then(
        (response) => {
            ServerActionCreators.tickerLoaded( { ticker: response.body })
        },

        (error) => {
            console.error('Error: ', error);
        }
      );
}

export function getStockSuggestions(input,callback){

    let url = `${API_URL}/getStockSuggestions`;

    let data = { input };

    post({url, data})
      .then(
        (response) => {
            callback(null, response.body); // Emulate API call
        },

        (error) => {
            console.error('Error: ', error);
        }
      );

}

export function getStockPrices(tickers){

  let data = {tickers: tickers};

    let url = `${API_URL}/getStockPrices`;

    post({url, data})
      .then(
        (response) => {
            ServerActionCreators.tickersLoaded(  response.body)
        },

        (error) => {
            console.error('Error: ', error);
        }
      );
}

export function getStockData(tickers){
    let data = {tickers: tickers};

    let url = `${API_URL}/getStockData`;

    post({url, data})
      .then(
        (response) => {
            ServerActionCreators.tickersLoaded(  response.body)
        },

        (error) => {
            console.error('Error: ', error);
        }
      );
}

export function getHistoricalPrices(data){

    let url = `${API_URL}/getHistoricalData`;

    post({url, data})
      .then(
        (response) => {
            ServerActionCreators.historicalPricesLoaded(response.body)
        },

        (error) => {
            console.error('Error: ', error);
        }
      );
}

export function getHistoricalDividends(data){

    let url = `${API_URL}/getHistoricalData`;

    post({url, data})
      .then(
        (response) => {
            ServerActionCreators.historicalDividendsLoaded(response.body)
        },

        (error) => {
            console.error('Error: ', error);
        }
      );
}


export function saveUserPortfolioData(userData,uid,resultObject){

    let url = `${API_URL}/saveUserData`;
    let data = {userData, uid};

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
                message:"Something went wrong saving the portfolio.",
                delay: 1500
            });
        }
      );
}

export function saveUserData(userData, uid){


    let url = `${API_URL}/saveUserData`;
    let data = {userData, uid};

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

export function deleteUserPortfolioData(userData, uid, resultObject){
    console.log(">> DELETING DATA " , userData);

    let url = `${API_URL}/deleteUserPortfolioData`;
    let data = {userData, uid};

    post({url, data})
        .then(
        (response) => {
            console.log("> API Responded: " , response);

            resultObject.success();

            NotificationActions.setNotification({
                isVisible: true,
                type: 'success',
                message:"Portfolio has been succesfully cleared.",
                delay: 1500
            });
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
