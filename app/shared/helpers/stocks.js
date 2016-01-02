import defaults from '../../client/config/Defaults';
import HistoricalActions from '../../client/actions/HistoricalActionCreators';


export function mapBysymbol(array) {

  let sortedStocks = {};

  try {
    array.map(tx => {
      if (!sortedStocks[tx.symbol]) sortedStocks[tx.symbol] = [];
      sortedStocks[tx.symbol].push(tx);
    });

  } catch (err) {

    console.error("Something went wrong mapping the stocks: ", array)
    return {};
  }

  return sortedStocks;

}
