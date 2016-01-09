const debug = require('debug')('debug:user/SaveFinancialProfile');
import Parse from 'parse/node';
var UserSettingsObject = Parse.Object.extend("UserSettingsObject");

export default (req, res, next) => {

    debug("Saving user settings for user:  ",req.body.uid);

    var userSettings = new UserSettingsObject();

    userSettings.save(req.body, {
        success: function(userSettings) {
            debug("Saved uset settings succesfully. ", userSettings.id);
            req.app.set('response', userSettings);
            next();
        },
        error: function(profile, error) {
            debug("Something went wrong saving the user settings . " , error);
            req.app.set('response', "Error: " + error.code + " " + error.message);
            next();
        }
    });

    let data = req.body.data;

};
