const debug = require('debug')('debug:portfolio/AddEntry');
import moment from 'moment';
import Parse from 'parse/node';
import {enhanceStock} from '../../helpers/EnhanceStockResult';

var PortfolioEntry = Parse.Object.extend("PortfolioEntry");
var SymbolClass = Parse.Object.extend("SymbolClass");

export default (req, res, next) => {

  let data = req.body;

  let entry = new PortfolioEntry();
  entry.set("userPointer",{"__type":"Pointer","className":"_User","objectId":data.uid});

  var query = new Parse.Query('SymbolClass');
  query.equalTo("symbol", data.symbol.toUpperCase());

  let symbol = null;

  query.find({
    success: function(results) {
      if(results.length === 0){
        debug("No symbolClass with that symbol found. Creating symbol.");
        symbol = new SymbolClass();
        //symbol.set('symbol',data.symbol.toUpperCase());
        symbol.save( enhanceStock({symbol:data.symbol.toUpperCase()}),{
          success: function(symbolclass){
            saveTheEntry(req,res,next,entry,symbolclass,data);
          },
          error: function(user, error) {
            debug(error);
            req.app.set('response', "Error: " + error.code + " " + error.message);
            next();
          }
        })
      }else{
        debug("Successfully retrieved symbol.", results);
        saveTheEntry(req,res,next,entry,results[0],data);
      }
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });
};

function saveTheEntry(req,res,next,entry,symbol,data){

  // sanitise input
  delete data['uid'];
  data.date = moment(data.date, "YYYY-MM-DD").toDate();

  debug(symbol);

  entry.set("symbolPointer",{"__type":"Pointer","className":"SymbolClass","objectId":symbol.id});


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
}
