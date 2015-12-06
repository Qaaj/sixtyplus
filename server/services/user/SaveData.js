const debug = require('debug')('debug:user/SaveData');
var Firebase = require("firebase");
import moment from 'moment';

var ref = new Firebase("https://crackling-torch-5091.firebaseio.com/");
var usersRef = ref.child("users");

export default (req, res) => {

    debug("saving data for user with uid: ",req.body.uid);

    let data = req.body.userData;

    // Sanitise keys
    if(data && data.portfolio){
      let portfolio = {};
      for (let key in data.portfolio) {
        let newKey = key.replace(".","_");
        portfolio[newKey] = data.portfolio[key];
      }
      data.portfolio = portfolio;
    }

    var user = new Firebase('https://crackling-torch-5091.firebaseio.com/users/' + req.body.uid);

    user.once('value', function(snapshot) {
        if(snapshot.val()){

           user.update({
                userData: data,
            });

            res.send(req.body.uid);

        }else{

            // User does not exist. can't save data.
            debug("can not save data for user with uid: ",req.body.uid);

            res.send({error: 'User does not exist'});
        }
    });

};
