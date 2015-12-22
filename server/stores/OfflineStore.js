import fs from 'fs';
const debug = require('debug')('debug:stores/offlineStore');

const OfflineStore = {


  getData(req, res){

    let options = "";
    if(req.body.ticker) options = "_" + req.body.ticker;
    if(req.body.options) options += "_" + req.body.options;
    if(req.body.from) options += "_" + req.body.from;
    let id = req.params.serviceId;

    debug("Loading data for call ID: ", id);

    fs.readFile(__dirname + '/../mock_data/' + id + options + '.json', function (err, data) {

      if (err) {
        debug(err);
      }
      data = JSON.parse(data);
      res.send(data);

    });
  },

  saveData(req,data){

    let options = "";
    if(req.body.ticker) options = "_" + req.body.ticker;
    if(req.body.options) options += "_" + req.body.options;
    if(req.body.from) options += "_" + req.body.from;
    let id = req.params.serviceId;

    fs.writeFile(__dirname + '/../mock_data/' + id + options +  '.json', JSON.stringify(data), function(err){
      if (err) debug("Error: ",err);
      debug('Mock data saved: ', id);
    })
  }

}


export default OfflineStore;
