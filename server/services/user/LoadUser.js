const debug = require('debug')('debug:user/LoadUser');
var Firebase = require("firebase");
import moment from 'moment';
import OfflineStore from '../../stores/OfflineStore'


var ref = new Firebase("https://crackling-torch-5091.firebaseio.com/");
var usersRef = ref.child("users");

export default (req, res, next) => {

  debug("loading user with uid: ", req.body.uid);

  let userObject = {uid: req.body.uid};

  var user = new Firebase('https://crackling-torch-5091.firebaseio.com/users/' + req.body.uid);

  user.once('value', function (snapshot) {
    if (snapshot.val()) {

      userObject = snapshot.val();

      usersRef.child(req.body.uid + "").update({
        last_login: moment().format('LLLL'),
      });

      let data = userObject.userData;

      // Sanitise keys
      if(data && data.portfolio){
        let portfolio = {};
        for (let key in data.portfolio) {
          let newKey = key.replace("_",".");
          portfolio[newKey] = data.portfolio[key];
        }
        userObject.userData.portfolio = portfolio;
      }
      if(process.env.NODE_ENV == 'provision') OfflineStore.saveData(req,userObject);
      req.app.set('response',userObject);

      next();

    } else {

      // User does not exist. Create default settings.
      userObject.currency = "EURO";
      userObject.language = "EN";
      userObject.last_login = moment().format('LLLL');
      userObject.userData = { uid: req.body.uid};
      usersRef.child(req.body.uid + "").set(userObject);

      userObject.last_login = null;
      req.app.set('response',userObject);

      next();
    }
  });

};
