const debug = require('debug')('debug:portfolio/LoadPortfolio');
import moment from 'moment';
import Parse from 'parse/node';

var PortfolioEntry = Parse.Object.extend("PortfolioEntry");

export default (req, res, next) => {

  let userPointer = req.userPointer;

  var query = new Parse.Query(PortfolioEntry);
  query.equalTo("userPointer", userPointer);
  query.find({
      success: function(results) {
          debug("Successfully retrieved " + results.length + " entries.");
          makeResponse(req,res,next,results);
      },
      error: function(error) {
          debug("Error: " + error.code + " " + error.message);
          req.app.set('response', "Error: " + error.code + " " + error.message);
          next();
      }
  });
};

function makeResponse(req,res,next,results){

  let response = results.map(result =>{
    result = result.toJSON();
    result.date = result.date.iso;
    return result;
  })

  req.app.set('response', response);
  next();
}
