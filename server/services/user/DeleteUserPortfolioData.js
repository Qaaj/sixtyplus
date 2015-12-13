const debug = require('debug')('debug:user/SaveData');
var Firebase = require("firebase");
import moment from 'moment';

var ref = new Firebase("https://crackling-torch-5091.firebaseio.com/");
var usersRef = ref.child("users");

export default (req, res) => {

    debug("Deleting data data for user with uid: ",req.body.uid);

    var user_url = 'https://crackling-torch-5091.firebaseio.com/users/' + req.body.uid;
    var user = new Firebase(user_url);
    var portfolioDataRef = new Firebase(user_url + "/userData/portfolio");

    user.once('value', function(snapshot) {
        if(snapshot.val()){

            portfolioDataRef.remove();

            res.send(req.body.uid);

        }else{

            // User does not exist. can't save data.
            debug("can not delete portfolio data for user with uid: ",req.body.uid);

            res.send({error: 'User does not exist'});
        }
    });

};
