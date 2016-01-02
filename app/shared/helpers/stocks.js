import defaults from '../../client/config/Defaults';
import {round} from '../helpers/formatting';


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

export function createPerformanceObjectFromEntries({entries,rt,dividends, symbol, doDiv}) {
  
  let performance = {};
  performance.costBase = 0;
  performance.amount = 0;

  entries.forEach(entry => {
    performance.amount += entry.amount;
    performance.costBase += entry.price * entry.amount;
  });

  performance.costBase = round(performance.costBase);
  performance.averagePrice = round(performance.costBase / performance.amount);

  if(dividends){
    performance.total_dividends = dividends;
  }else{
    performance.total_dividends = 0;
  }

  if (rt) {
    performance.sector = rt.sector;
    performance.marketValue = round(rt.lastTradePriceOnly * performance.amount);
    performance.profitLoss = round(performance.marketValue - performance.costBase);

    if(doDiv){
      performance.profitLoss += dividends;
    }


    performance.style = 'success';
    if (performance.profitLoss < 0) performance.style = 'danger';
    if (performance.profitLoss < 0 && Math.abs(performance.profitLoss) < 100) performance.style = 'warning';
    performance.totalChangePercentage = round(100 * performance.profitLoss / performance.costBase);
    performance.percent_change = round(100 * (rt.change / rt.previousClose), 2);
    performance.percentChangeString = performance.percent_change + '%';
    performance.totalChangePercentageString = performance.totalChangePercentage + '%';
    if (performance.totalChangePercentage >= 0) performance.totalChangePercentageString = '+' + performance.totalChangePercentage + '%';

    performance.changeString = performance.percent_change;
    if (performance.percent_change >= 0) performance.changeString = '+' + performance.percent_change;

    performance.isUpToday = false;
    if (rt.change >= 0) performance.isUpToday = true;

    performance.lastPrice = rt.lastTradePriceOnly;
  }else{
    performance.marketValue = performance.costBase;
    performance.profitLoss = 0;
    performance.sector = "N/A";
  }

  // for sorting
  performance.symbol = symbol.symbol;

  return performance;
}
