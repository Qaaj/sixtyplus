import defaults from '../../client/config/Defaults';
import StockEntryCollection from '../../client/classes/StockEntryCollection';
import HistoricalActions from '../../client/actions/HistoricalActionCreators';

export function collectionsToPortfolioMap(stockEntryCollections) {

  let portfolio = {};

  stockEntryCollections.map((entryCollection) => {

    portfolio[entryCollection.symbol] = entryCollection.entries.map(entry => {
      let final = {};
      final.symbol = entry.symbol;
      final.price = entry.price;
      final.amount = entry.amount;
      final.date = entry.date.format();
      return final;
    })
  });

  return portfolio;
}

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

// Update the collection of stock transactions with latest realtime data

export function updateArrayOfEntryCollectionsWithRT(portfolio, rt) {

  let entries = portfolio.collectionList;

  return entries.map((entry) => {
    let symbol = entry.symbol;

    if (rt && rt[symbol]) {
      entry.sector = rt[symbol].sector;
      entry.industry = rt[symbol].industry;
      entry.name = rt[symbol].name;
      entry.calculateProfitLoss(rt[symbol]);
    }

    entry.entries.map(single => {
      single.updateWithRealtimeData(rt);
    })

    return entry;
  });

}

export function updateSingeEntryCollectionWithRT(entry, rt) {


  let symbol = entry.symbol;

  if (rt && rt[symbol]) {
    entry.sector = rt[symbol].sector;
    entry.industry = rt[symbol].industry;
    entry.name = rt[symbol].name;
    entry.calculateProfitLoss(rt[symbol]);
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

export function updatePortfolioDividends(portfolio, historical) {

  if(!historical) return portfolio;

  let entryList = portfolio.collectionList;

  entryList.map(entry =>{

    if(!historical[entry.symbol]){  // if divvies not available, try at least ONCE to get the dividends
      HistoricalActions.getHistoricalDividends({
        symbol: entry.symbol
      });
    }else{ // if divvies available, add them to the entry
      entry.calculateDividends(historical[entry.symbol]);
    }

  })

  return portfolio;
}



