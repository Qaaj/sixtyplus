import { Map, fromJS } from 'immutable';
const debug = require('debug')('debug:stores/DataStore');
import fs from 'fs';
import moment from 'moment';
import redis from 'redis';
import bluebird from 'bluebird';

bluebird.promisifyAll(redis.RedisClient.prototype);


const CHANGE_EVENT = 'change';

let dataMap = Map();
let historicalMap = {};

let redis_url = 'redis://localhost:6380';

if (process.env.REDISCLOUD_URL) redis_url = process.env.REDISCLOUD_URL;
var client = redis.createClient(redis_url);

client.select(0);



const DataStore = {


  getData()
  {
    return dataMap.toJS();
  },

  setCachedData({option,ticker,json}){
    client.set(option+':'+ticker, JSON.stringify(json));
    // Refresh news every 10 minutes
    if (option == 'news') client.expire(option+':'+ticker,300);
    if (option == 'stockdata') client.expire(option+':'+ticker,3600);
    if (!process.env.REDISCLOUD_URL) client.save();
  },

  getCachedData({option,ticker}){
    return client.getAsync(option+':'+ticker).then(function(raw) {
      return JSON.parse(raw);
    });
  },


  getPartialHistoricalData({cacheID, from})
  {
    let allData = historicalMap[cacheID];
    let result = JSON.parse(allData).filter(entry => {
      if (from.isBefore(moment(entry.Date, "YYYY-MM-DD"))) return true;
    });
    return JSON.stringify(result);
  }
  ,

  getHistoricalData()
  {
    return historicalMap;
  }
  ,

  loadData()
  {
    debug("Loading data");

    fs.readFile(__dirname + '/../../static/mapped_stocks.json', function (err, data) {

      if (err) {
        debug(err);
      }

      data = JSON.parse(data);
      let keys = Object.keys(data);
      dataMap = dataMap.set("stockData", data);
      dataMap = dataMap.set("stockKeys", keys);

      debug(" Data loaded.");

    });
  }

}


export default DataStore;
