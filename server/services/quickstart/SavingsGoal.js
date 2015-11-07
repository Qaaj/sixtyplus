const debug = require('debug')('debug:calculators/SavingsGoal');
var Firebase = require("firebase");

var ref = new Firebase("https://crackling-torch-5091.firebaseio.com/");
var usersRef = ref.child("users");

export default (req, res) => {

    debug('calculating savings goal');


    usersRef.child("gracehop").set({
        date_of_birth: "December 9, 1906",
        full_name: "Grace Hopper"
    });

    res.send('weeeeee');
};
