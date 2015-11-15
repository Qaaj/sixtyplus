const debug = require('debug')('debug:user/getPrice');

var yahooFinance = require('yahoo-finance');

export default (req, res) => {

    debug("getting stock price for ",req.body.ticker);

    yahooFinance.snapshot({
        symbol: req.body.ticker,
        fields: ['s', 'n', 'd1', 'l1', 'y', 'r'],
    }, function (err, snapshot) {
        res.send(snapshot)
    });
};
