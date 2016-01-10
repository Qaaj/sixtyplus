const debug = require('debug')('debug:portfolio/AddEntry');
import moment from 'moment';
import Parse from 'parse/node';

var PortfolioEntry = Parse.Object.extend("PortfolioEntry");

export default (req, res, next) => {

  let data = req.body;

  let entry = new PortfolioEntry();
  entry.set("userPointer",{"__type":"Pointer","className":"_User","objectId":data.uid});

  // sanitise input
  delete data['uid'];
  data.date = moment(data.date, "YYYY-MM-DD").toDate();

  entry.save(data,  {
    success: function(entry) {
      debug("Portfolio entry added: " + entry.id)
      let result = entry.toJSON();
      result.date = result.date.iso;
      req.app.set('response', result);
      next();
    },
    error: function(user, error) {
      debug(error);
      req.app.set('response', "Error: " + error.code + " " + error.message);
      next();
    }
  });

  debug(data);

};
