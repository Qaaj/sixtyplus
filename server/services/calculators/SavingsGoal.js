const debug = require('debug')('debug:calculators/SavingsGoal');
var Firebase = require("firebase");

var ref = new Firebase("https://crackling-torch-5091.firebaseio.com/");
var usersRef = ref.child("users");

export default (req, res) => {

    const params = req.body;


    usersRef.child("gracehop").set({
        date_of_birth: "December 9, 1906",
        full_name: "Grace Hopper"
    });

    debug(req.params,req.body);
    res.send('weeeeee');
};
