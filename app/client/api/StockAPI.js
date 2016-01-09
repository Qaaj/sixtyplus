import { get, post, put, del } from '../utils/RequestUtil';
import ServerActionCreators from '../actions/ServerActionCreators';
import NotificationActions from '../actions/NotificationActionCreators';

let currentProtocol = window.location.protocol;
let baseUrl = window.location.host;

const API_URL = `${currentProtocol}//${baseUrl}/api`;

export function getStockNews(symbols) {
  let data = {symbols: symbols};

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


export function getStockPrice(symbol) {

  let data = {symbol: symbol};

  let url = `${API_URL}/getStockPrice`;

  post({url, data})
    .then(
      (response) => {
        ServerActionCreators.symbolLoaded({symbol: response.body})
      },

      (error) => {
        console.error('Error: ', error);
      }
    );
}

export function getStockSuggestions(input, callback) {

  let url = `${API_URL}/getStockSuggestions`;

  let data = {input};

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

export function getStockPrices(symbols) {

  let data = {symbols: symbols};

  let url = `${API_URL}/getStockPrices`;

  post({url, data})
    .then(
      (response) => {
        ServerActionCreators.symbolsLoaded(response.body)
      },

      (error) => {
        console.error('Error: ', error);
      }
    );
}

export function getStockData(symbols) {
  let data = {symbols: symbols};

  let url = `${API_URL}/getStockData`;

  post({url, data})
    .then(
      (response) => {
        ServerActionCreators.symbolsLoaded(response.body)
      },

      (error) => {
        console.error('Error: ', error);
      }
    );
}

export function getHistoricalPrices(data) {

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

export function getHistoricalDividends(data) {

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
