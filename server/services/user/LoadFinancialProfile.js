const debug = require('debug')('debug:user/LoadUser');
var Rnd = require('random-word-generator');

import Parse from 'parse/node';

var UserFinancialProfile = Parse.Object.extend("UserFinancialProfile");

export default (req, res, next) => {

  let userId = req.body.uid;

  let userPointer = req.userPointer;

  debug("loading settings for user with uid: ", userId);

  var query = new Parse.Query(UserFinancialProfile);

  query.equalTo("userPointer", userPointer);

  let userFinancialProfile;

  query.find({
    success: function (profiles) {
      if (profiles.length === 0) {
        debug("No financial profile found. Creating defaults.");
        userFinancialProfile = new UserFinancialProfile();
        userFinancialProfile.set('userPointer', userPointer);
        userFinancialProfile.save(null);
        req.app.set('response', userFinancialProfile);
        next();
      } else {
        userFinancialProfile = profiles[0];
        debug("Successfully retrieved financial profile.", userFinancialProfile.id);
        req.app.set('response', userFinancialProfile);
        next();
      }

    },
    error: function (error) {
      console.log("OOPS", error)
      req.app.set('response', "Error: " + error.code + " " + error.message);
      next();
    }
  });

};

