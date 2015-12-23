const debug = require('debug')('debug:user/LoadUser');
var Rnd = require('random-word-generator');

import Parse from 'parse/node';

var UserSettingsObject = Parse.Object.extend("UserSettingsObject");

export default (req, res, next) => {

  let userId = req.body.uid;

  if(!userId){
    debug("Creating user with uid: ", req.body.uid);
    createUser(req,res,next);

  }else{
    debug("loading user with uid: ", req.body.uid);
    var query = new Parse.Query('User');
    query.equalTo("objectId", userId);
    query.find({
      success: function(results) {
        if(results.length === 0){
          debug("No user with that ID found. Creating user.");
          createUser(req,res,next);
        }else{
          debug("Successfully retrieved user.", results);
          loadUserSettings(req,res,next,results[0])
        }
      },
      error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    });
  }

};

function createUser(req,res,next){

  var user = new Parse.User();

  let username = new Rnd().generate();
  let password = "change_me";

  user.set('username',username);
  user.set('password',password);

  user.signUp(null, {
    success: function(user) {
      debug("user created: " + user.id)
      loadUserSettings(req,res,next,user)
    },
    error: function(user, error) {
      req.app.set('response', "Error: " + error.code + " " + error.message);
      next();
    }
  });

}

function loadUserSettings(req,res,next,user){

  // Get the user settings


  var query = new Parse.Query(UserSettingsObject);
  query.equalTo("userPointer", user.toPointer());

  query.find({
      success: function(results) {
        if(results.length === 0){
          debug("No settings found. Creating defaults.");
          createUserSettings(req,res,next,user);
        }else{
          let settings = results[0];
          debug("Successfully retrieved settings.", settings.id);
          settings.set('last_login', new Date());
          settings.save();
          makeResponseObject(req,res,next,user,settings);
        }

      },
      error: function(error) {
        console.log("OOPS",error)
        req.app.set('response', "Error: " + error.code + " " + error.message);
        next();      }
  });
}


function createUserSettings(req,res,next,user){

  var settings = new UserSettingsObject();

  settings.set('userPointer',user.toPointer());
  settings.set('currency','USD');
  settings.set('language','EN');

  settings.save(null, {
    success: function(setting) {
      debug("settings created: " + setting.id)
      makeResponseObject(req,res,next,user,settings);
    },
    error: function(user, error) {
      debug(error);
      req.app.set('response', "Error: " + error.code + " " + error.message);
      next();
    }
  });
}

function makeResponseObject(req,res,next,user,settings){

  let userObject = user.toJSON();
  let settingsObject = settings.toJSON();

  delete userObject['createdAt'];
  delete userObject['updatedAt'];
  delete userObject['password'];
  delete settingsObject['createdAt'];
  delete settingsObject['updatedAt'];

  if(settingsObject.last_login) settingsObject.last_login = settingsObject.last_login.iso;

  userObject.settings = settingsObject;
  req.app.set('response', userObject);

  next();
}
