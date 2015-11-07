const debug = require('debug')('debug:calculators/SavingsGoal');

export default (req, res) => {

    const params = req.body;

    debug(req.params,req.body);
    res.send('weeeeee');
};
