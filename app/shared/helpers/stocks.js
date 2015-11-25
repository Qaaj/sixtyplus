import defaults from '../../client/config/Defaults';

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
      formattedTX.sector = tx.sector;
      sortedStocks[tx.ticker].push(formattedTX);
    });

  } catch (err) {

    console.error("Something went wrong mapping the stocks: ", array)
    return {};
  }

  return sortedStocks;

}

export function getStockEntriesData(entries,rt){

  let data = {};
  let ticker = entries[0].name;

  if(rt && rt[ticker]){
    data.sector = rt[ticker].sector;
    data.price = rt[ticker].lastTradePriceOnly;
  }

  data.totalAmount = 0;
  data.totalPrice = 0;

  entries.map((entry, i) => {
    data.totalPrice += (entry.price * entry.amount);
    data.totalAmount += entry.amount;
  });

  data.averagePrice = Math.round((data.totalPrice / data.totalAmount) * 100) / 100;
  data.profitLoss = (data.price * data.totalAmount) - data.totalPrice;
  data.profitLoss = Math.round((data.profitLoss) * 100) / 100;
  if (data.price == 0)  data.profitLoss = "N/A";
  data.name = entries[0].name;

  return data;
}

