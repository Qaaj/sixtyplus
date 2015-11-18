import { get, post, put, del } from './RequestUtil';
import ServerActionCreators from '../actions/ServerActionCreators';

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
};

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

export function getStockPrices(tickers){
    console.log('getting prices', tickers)
    let data = {tickers: tickers};

    let url = `${API_URL}/getStockPrices`;

    post({url, data})
      .then(
        (response) => {
            console.log(response.body);
            ServerActionCreators.tickersLoaded(  response.body)
        },

        (error) => {
            console.error('Error: ', error);
        }
      );
}

export function updateUserData(data,uid){

    let url = `${API_URL}/saveUserData`;

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
