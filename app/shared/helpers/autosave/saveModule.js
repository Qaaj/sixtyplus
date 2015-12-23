import defaults from '../../../client/config/Defaults';
import moment from 'moment';

export function getModuleSaveData(data) {

  let obj = {};

  console.log("CLASS :",data);

  switch (data.name) {

    case "Quickstart":

      let arr =  data.saveObject.map(prop => {
        if (data.state[prop.save_prop]) {
          return {
            location: [prop.save_location,prop.save_prop],
            value: data.state[prop.save_prop],
            root: prop.save_location,
          };
        }
      });

      arr = arr.filter( item => item);
      return arr;

      break;


    default:
      return obj;
  }


}

