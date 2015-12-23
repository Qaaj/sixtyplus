const debug = require('debug')('debug:user/SaveFinancialProfile');
import Parse from 'parse/node';
var UserFinancialProfile = Parse.Object.extend("UserFinancialProfile");

export default (req, res,next) => {
  
  var profile = new UserFinancialProfile();

  profile.save(req.body, {
    success: function (profile) {
      debug("Saved financial profile succesfully. ", profile.id)
      req.app.set('response', profile);
      next();
    },
    error: function (profile, error) {
      debug("Something went wrong saving the financial profile . ", error)
      req.app.set('response', "Error: " + error.code + " " + error.message);
      next();
    }
  });

  let data = req.body.data;

};
