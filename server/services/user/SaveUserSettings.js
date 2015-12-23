const debug = require('debug')('debug:user/SaveUserSettings');

export default (req, res) => {

    debug("Saving user settings for user:  ",req.body.uid);

    let data = req.body.data;


};
