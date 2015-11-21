const debug = require('debug')('debug:user/LoadUser');
var Firebase = require("firebase");
import moment from 'moment';

var ref = new Firebase("https://crackling-torch-5091.firebaseio.com/");
var usersRef = ref.child("users");

export default (req, res) => {

  debug("loading user with uid: ", req.body.uid);

  let userObject = {uid: req.body.uid};

  var user = new Firebase('https://crackling-torch-5091.firebaseio.com/users/' + req.body.uid);

  user.once('value', function (snapshot) {
    if (snapshot.val()) {

      userObject = snapshot.val();

      usersRef.child(req.body.uid + "").update({
        last_login: moment().format('LLLL'),
      });

      res.send(userObject);

    } else {

      // User does not exist. Create default settings.
      userObject.currency = "EURO";
      userObject.language = "EN";
      userObject.last_login = moment().format('LLLL');
      userObject.userData = {};
      usersRef.child(req.body.uid + "").set(userObject);

      userObject.last_login = null;
      res.send(userObject);
    }
  });

};
