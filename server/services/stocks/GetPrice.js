const debug = require('debug')('debug:stock/getPrice');

var yahooFinance = require('yahoo-finance');

export default (req, res) => {

    debug("getting stock price for ",req.body.ticker);

    yahooFinance.snapshot({
        symbol: req.body.ticker,
        fields: ['s', 'n', 'l1'],
    }, function (err, snapshot) {
        res.send(snapshot)
    });
};
