const debug = require('debug')('debug:stock/getPrice');
var yahooFinance = require('yahoo-finance');
import { enhanceStock } from '../../helpers/EnhanceStockResult';


export default (req, res) => {

    debug("getting stock price for ",req.body.ticker);

    yahooFinance.snapshot({
        symbol: req.body.ticker,
        fields: ['s', 'n', 'l1'],
    }, function (err, snapshot) {
        snapshot = enhanceStock(snapshot);
        res.send(snapshot)
    });
};
