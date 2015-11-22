import defaults from '../../../client/config/Defaults';
import moment from 'moment';

export function getModuleSaveData(data) {

  let obj = {};

  console.log("CLASS :",data);

  switch (data.name) {

    case "Quickstart":

      return data.saveObject.reduce((prev, prop)=> {
        if (data.state[prop]) prev[prop] = data.state[prop];
        return prev;
      }, {});

      break;


    default:
      return obj;
  }


}

