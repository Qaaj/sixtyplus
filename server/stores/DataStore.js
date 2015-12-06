import { Map, fromJS } from 'immutable';
const debug = require('debug')('debug:stores/DataStore');
import fs from 'fs';
const CHANGE_EVENT = 'change';

let dataMap = Map();

const DataStore = {

  getData() {
    return dataMap.toJS();
  },

  loadData(){
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
