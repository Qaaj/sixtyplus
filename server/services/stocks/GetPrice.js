const debug = require('debug')('debug:stock/getPrice');
var yahooFinance = require('yahoo-finance');
import { enhanceStock } from '../../helpers/EnhanceStockResult';


export default (req, res, next) => {

    debug("getting stock price for ",req.body.symbol);

    yahooFinance.snapshot({
        symbol: req.body.symbol,
        fields: ['s', 'n', 'l1'],
    }, function (err, snapshot) {
        snapshot = enhanceStock(snapshot);
        req.app.set('response', result);
        next();
    });
};
