import defaults from '../../../client/config/Defaults';

export function mapByTicker(array) {
  let sortedStocks = {};
  try {
    array.map(tx => {
      if (!sortedStocks[tx.ticker]) sortedStocks[tx.ticker] = [];
      let formattedTX = {};
      formattedTX.date = moment(tx.date, "YYYYMMDD");
      formattedTX.ticker = tx.ticker;
      formattedTX.name = tx.ticker
      formattedTX.amount = parseFloat(tx.amount);
      formattedTX.price = parseFloat(tx.price);
      formattedTX.total = parseFloat(tx.amount * tx.price);
      sortedStocks[tx.ticker].push(formattedTX);
    });

  } catch (err) {

    console.error("Something went wrong mapping the stocks: ", array)
    return {};
  }

  return sortedStocks;

}
