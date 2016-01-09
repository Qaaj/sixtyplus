import { Map, fromJS } from 'immutable';
const debug = require('debug')('debug:stores/DataStore');
import fs from 'fs';
import moment from 'moment';
import redis from 'redis';
import bluebird from 'bluebird';
import noSpam from '../../app/shared/utils/noSpam';


bluebird.promisifyAll(redis.RedisClient.prototype);

const spammer = new noSpam();
const CHANGE_EVENT = 'change';

let dataMap = Map();
let historicalMap = {};

let redis_url = 'redis://localhost:6380';

if (process.env.REDISCLOUD_URL) redis_url = process.env.REDISCLOUD_URL;
var client = redis.createClient(redis_url);

client.select(0);

const DAY = 86400;
const HOUR = 3600;

const DataStore = {


  getData()
  {
    return dataMap.toJS();
  },


  setCachedData({option,symbol,json}){
    if (option && symbol && json) client.set(option + ':' + symbol, JSON.stringify(json));
    // Refresh news every 10 minutes
    if (option == 'news') client.expire(option + ':' + symbol, 3 * HOUR);
    if (option == 'stockdata') client.expire(option + ':' + symbol, 10);
    if (option == 'historical:v' || option == 'historical:m') client.expire(option + ':' + symbol, DAY);
    //save the data in our localhost redis. gets saved automatically online;
    if (process.env.NODE_ENV !== 'production') spammer.go(this.saveClient, 1000);
  },

  saveClient(){
    client.save();
  },

  getCachedData({option,symbol}){
    return client.getAsync(option + ':' + symbol).then(function (raw) {
      return JSON.parse(raw);
    });
  },


  getPartialHistoricalData({json, from})
  {
    let result = json.filter(entry => {
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
