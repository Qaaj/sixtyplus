import defaults from '../../client/config/Defaults';
import StockEntryCollection from '../../client/classes/StockEntryCollection';
import HistoricalActions from '../../client/actions/HistoricalActionCreators';

export function collectionsToPortfolioMap(stockEntryCollections) {

  let portfolio = {};

  stockEntryCollections.map((entryCollection) => {

    portfolio[entryCollection.ticker] = entryCollection.entries.map(entry => {
      let final = {};
      final.ticker = entry.ticker;
      final.price = entry.price;
      final.amount = entry.amount;
      final.date = entry.date.format();
      return final;
    })
  });

  return portfolio;
}

export function mapByTicker(array) {

  let sortedStocks = {};

  try {
    array.map(tx => {
      if (!sortedStocks[tx.ticker]) sortedStocks[tx.ticker] = [];
      sortedStocks[tx.ticker].push(tx);
    });

  } catch (err) {

    console.error("Something went wrong mapping the stocks: ", array)
    return {};
  }

  return sortedStocks;

}

// Update the collection of stock transactions with latest realtime data

export function updateArrayOfEntryCollectionsWithRT(entries, rt) {

  return entries.map((entry) => {
    let ticker = entry.ticker;

    if (rt && rt[ticker]) {
      entry.sector = rt[ticker].sector;
      entry.industry = rt[ticker].industry;
      entry.name = rt[ticker].name;
      entry.calculateProfitLoss(rt[ticker]);
    }

    entry.entries.map(single => {
      single.updateWithRealtimeData(rt);
    })

    return entry;
  });

}

export function updateSingeEntryCollectionWithRT(entry, rt) {


  let ticker = entry.ticker;

  if (rt && rt[ticker]) {
    entry.sector = rt[ticker].sector;
    entry.industry = rt[ticker].industry;
    entry.name = rt[ticker].name;
    entry.calculateProfitLoss(rt[ticker]);
  }

  entry.entries.map(single => {
    single.updateWithRealtimeData(rt);
  })

  return entry;


}

export function createEntriesFromUserObjectPortfolio(portfolio) {

  let collection = [];
  for (let key in portfolio) {
    collection.push(new StockEntryCollection(portfolio[key]));
  }

  return collection;
}

export function updatePortfolioDividends(entryList, historical) {

  if(!historical) return entryList;

  entryList.map(entry =>{

    if(!historical[entry.ticker]){  // if divvies not available, try at least ONCE to get the dividends
      HistoricalActions.getHistoricalDividends({
        ticker: entry.ticker
      });
    }else{ // if divvies available, add them to the entry
      entry.calculateDividends(historical[entry.ticker]);
    }

  })

  return entryList;
}

