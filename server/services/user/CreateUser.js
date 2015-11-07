const debug = require('debug')('debug:calculators/SavingsGoal');
var Firebase = require("firebase");

var ref = new Firebase("https://crackling-torch-5091.firebaseio.com/");
var usersRef = ref.child("users");

export default (req, res) => {

    const params = req.body;


    usersRef.child("gracehop").set({
        full_name: "Test User",
        uid: '1921929192192'
    });

    debug(req.params,req.body);
    res.send('User Created');
};
