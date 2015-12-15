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

if (process.env.REDIS_URL) redis_url = process.env.REDIS_URL;
var client = redis.createClient(redis_url);

client.select(0);



const DataStore = {


  getData()
  {
    return dataMap.toJS();
  },

  setData({option,ticker,json}){
    client.set(option+':'+ticker, json);
    // Refresh news every 10 minutes
    if (option == 'news') client.expire(option+':'+ticker,300);
    if (!process.env.REDIS_URL) client.save();
  },

  getCachedData({option,ticker}){
    return client.getAsync(option+':'+ticker).then(function(res) {
      return res;
    });
  },


  getPartialHistoricalData({cacheID, from})
  {
    let allData = historicalMap[cacheID];
    //console.log(allData);
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
